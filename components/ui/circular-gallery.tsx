"use client";
import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from "ogl";
import { useEffect, useRef } from "react";

type GL = Renderer["gl"];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/* =========================
   MEDIA
========================= */

class Media {
  gl: GL;
  plane: Mesh;
  program: Program;
  scene: Transform;
  image: string;
  index: number;
  length: number;
  viewport: { width: number; height: number };
  screen: { width: number; height: number };

  width = 0;
  widthTotal = 0;
  x = 0;
  extra = 0;

  constructor({
    gl,
    geometry,
    scene,
    image,
    index,
    length,
    screen,
    viewport,
  }: {
    gl: GL;
    geometry: Plane;
    scene: Transform;
    image: string;
    index: number;
    length: number;
    screen: { width: number; height: number };
    viewport: { width: number; height: number };
  }) {
    this.gl = gl;
    this.scene = scene;
    this.image = image;
    this.index = index;
    this.length = length;
    this.screen = screen;
    this.viewport = viewport;

    const texture = new Texture(gl, { generateMipmaps: true });

    this.program = new Program(gl, {
      transparent: true,
      depthTest: false,
      depthWrite: false,
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;

        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        varying vec2 vUv;

        void main() {
          float planeRatio = uPlaneSizes.x / uPlaneSizes.y;
          float imageRatio = uImageSizes.x / uImageSizes.y;

          vec2 ratio = vec2(1.0);
          if (planeRatio > imageRatio) {
            ratio.y = imageRatio / planeRatio;
          } else {
            ratio.x = planeRatio / imageRatio;
          }

          vec2 uv = vUv * ratio + (1.0 - ratio) * 0.5;
          vec4 color = texture2D(tMap, uv);

          if (color.a < 0.01) discard;
          gl_FragColor = color;
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uImageSizes: { value: [1, 1] },
        uPlaneSizes: { value: [1, 1] },
      },
    });

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = image;
    img.onload = () => {
      texture.image = img;
      this.program.uniforms.uImageSizes.value = [
        img.naturalWidth,
        img.naturalHeight,
      ];
    };

    this.plane = new Mesh(gl, { geometry, program: this.program });
    this.plane.setParent(scene);

    this.onResize();
  }

  onResize() {
    const scale = this.screen.height / 1800;

    this.plane.scale.y =
      (this.viewport.height * (500 * scale)) / this.screen.height;
    this.plane.scale.x =
      (this.viewport.width * (500 * scale)) / this.screen.width;

    this.program.uniforms.uPlaneSizes.value = [
      this.plane.scale.x,
      this.plane.scale.y,
    ];

    this.width = this.plane.scale.x + 1.5;
    this.widthTotal = this.width * this.length;
    this.x = this.width * this.index;
  }

  update(scroll: { current: number }) {
    this.plane.position.x = this.x - scroll.current - this.extra;

    const offset = this.plane.scale.x / 2;
    const limit = this.viewport.width / 2;

    if (this.plane.position.x + offset < -limit) {
      this.extra -= this.widthTotal;
    }
    if (this.plane.position.x - offset > limit) {
      this.extra += this.widthTotal;
    }
  }
}

/* =========================
   APP
========================= */

class App {
  container: HTMLElement;
  renderer: Renderer;
  gl: GL;
  camera: Camera;
  scene: Transform;
  geometry: Plane;
  medias: Media[] = [];

  scroll = { current: 0, target: 0 };
  screen!: { width: number; height: number };
  viewport!: { width: number; height: number };
  raf = 0;

  constructor(container: HTMLElement, images: string[]) {
    this.container = container;

    this.renderer = new Renderer({
      alpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio, 2),
    });

    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);
    container.appendChild(this.gl.canvas as HTMLCanvasElement);

    this.camera = new Camera(this.gl);
    this.camera.position.z = 15;

    this.scene = new Transform();
    this.geometry = new Plane(this.gl);

    this.onResize();

    images.concat(images).forEach((img, i, arr) => {
      this.medias.push(
        new Media({
          gl: this.gl,
          geometry: this.geometry,
          scene: this.scene,
          image: img,
          index: i,
          length: arr.length,
          screen: this.screen,
          viewport: this.viewport,
        })
      );
    });

    this.update();
    window.addEventListener("resize", this.onResize);
    window.addEventListener("wheel", this.onWheel, { passive: true });
  }

  // ✅ FIXED SCROLL SPEED
  onWheel = (e: WheelEvent) => {
    const delta = Math.max(-40, Math.min(40, e.deltaY));
    this.scroll.target += delta * 0.06;
  };

  onResize = () => {
    this.screen = {
      width: this.container.clientWidth,
      height: this.container.clientHeight,
    };

    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({
      aspect: this.screen.width / this.screen.height,
    });

    const fov = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;

    this.viewport = { width, height };
    this.medias.forEach((m) => m.onResize());
  };

  update = () => {
    // ✅ FIXED SMOOTHNESS
    this.scroll.current = lerp(
      this.scroll.current,
      this.scroll.target,
      0.035
    );

    this.medias.forEach((m) =>
      m.update({ current: this.scroll.current })
    );

    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.raf = requestAnimationFrame(this.update);
  };

  destroy() {
    cancelAnimationFrame(this.raf);
    window.removeEventListener("resize", this.onResize);
    window.removeEventListener("wheel", this.onWheel);
    this.container.removeChild(this.gl.canvas as HTMLCanvasElement);
  }
}

/* =========================
   REACT
========================= */

export default function CircularGallery({
  items = [],
}: {
  items: { image: string }[];
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const app = new App(ref.current, items.map((i) => i.image));
    return () => app.destroy();
  }, [items]);

  return (
    <div
      ref={ref}
      className="w-full h-full overflow-hidden cursor-grab active:cursor-grabbing"
    />
  );
}
