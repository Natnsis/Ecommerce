"use client";

import InnerHeader from "@/components/InnerHeader";
import Profile from "@/components/Profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HeartIcon, ShoppingBagIcon, StarIcon } from "@phosphor-icons/react";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ModeToggle } from "@/components/mode-toggle";
import { useUser } from "../context/user";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/app/conrollers/product.controller";

export default function Dashboard() {
  const router = useRouter();
  const { data: user, isLoading: isUserLoading } = useUser();

  const [category, setCategory] = useState<"all" | string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [minPriceInput, setMinPriceInput] = useState<string>("");
  const [maxPriceInput, setMaxPriceInput] = useState<string>("");

  const minPrice = minPriceInput.trim() !== "" ? Number(minPriceInput) : undefined;
  const maxPrice = maxPriceInput.trim() !== "" ? Number(maxPriceInput) : undefined;

  useEffect(() => {
    if (!isUserLoading && user) {
      console.log("User ID:", user.id);
      console.log("User Email:", user.email);
    } else if (!isUserLoading && !user) {
      console.log("No user found");
    }
  }, [user, isUserLoading]);

  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        !searchTerm.trim() ||
        p.name?.toLowerCase().includes(searchTerm.toLowerCase().trim());

      const matchesCategory = category === "all" || p.category === category;
      let matchesPrice = true;

      if (minPrice !== undefined && !isNaN(minPrice)) {
        if (p.price < minPrice) matchesPrice = false;
      }

      if (maxPrice !== undefined && !isNaN(maxPrice)) {
        if (p.price > maxPrice) matchesPrice = false;
      }

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [products, searchTerm, category, minPrice, maxPrice, minPriceInput, maxPriceInput]);

  return (
    <section className="p-5 w-full min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <InnerHeader />

        <div className="flex items-center gap-3">
          <Input
            className="w-[260px] md:w-[320px]"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="outline" size="icon">
            <HeartIcon size={20} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.push("/dashboard/cart")}
          >
            <ShoppingBagIcon size={20} />
          </Button>
          <ModeToggle />
          <Profile />
        </div>
      </div>

      <main className="flex gap-6">
        <aside className="w-64 shrink-0 hidden md:block">
          <div className="sticky top-5 space-y-6">
            <div>
              <h2 className="font-semibold mb-3">Category</h2>
              {[
                { value: "all", label: "All Categories" },
                { value: "electronics", label: "Electronics" },
                { value: "fashion", label: "Fashion" },
                { value: "furniture", label: "Home & Living" },
                { value: "sport", label: "Sports & Outdoors" },
                { value: "stationary", label: "Books & Stationery" },
                { value: "toys", label: "Toys & Kids" },
                { value: "health", label: "Health & Wellness" },
                { value: "automotive", label: "Automotive" },
              ].map((item) => (
                <label
                  key={item.value}
                  className="flex items-center gap-2 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:text-rose-600 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="category"
                    value={item.value}
                    checked={category === item.value}
                    onChange={(e) => setCategory(e.target.value)}
                    className="accent-rose-600 h-4 w-4"
                  />
                  {item.label}
                </label>
              ))}
            </div>

            <Separator />

            <div>
              <h2 className="font-semibold mb-3">Price Range</h2>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Min</label>
                  <Input
                    type="number"
                    min={0}
                    placeholder="0"
                    value={minPriceInput}
                    onChange={(e) => setMinPriceInput(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Max</label>
                  <Input
                    type="number"
                    min={0}
                    placeholder="any"
                    value={maxPriceInput}
                    onChange={(e) => setMaxPriceInput(e.target.value)}
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Leave empty to show all prices
              </p>
            </div>
          </div>
        </aside>

        <section className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h1 className="text-2xl font-bold capitalize">
              {category === "all" ? "All Products" : category}
            </h1>
          </div>

          {productsLoading ? (
            <div className="text-center py-20 text-gray-500">Loading products...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              No products match your filters
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => router.push(`/dashboard/${p.id}`)}
                  className="border rounded-lg overflow-hidden 
                  bg-white dark:bg-gray-900 
                  hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="relative h-48 bg-gray-50 dark:bg-gray-800">
                    <button className="absolute top-3 right-3 z-10 p-2 rounded-full 
                    bg-white/80 dark:bg-black/60 hover:bg-white dark:hover:bg-black transition">
                      <HeartIcon size={18} className="text-gray-500 hover:text-rose-600" />
                    </button>
                    <Image
                      src={p.url || "/placeholder.svg"}
                      alt={p.name || "Product"}
                      fill
                      className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-4 pt-2">
                    <h3 className="font-medium line-clamp-2">
                      {p.name}
                    </h3>
                    <div className="flex items-center gap-1 text-sm mb-2">
                      <StarIcon size={14} weight="fill" className="text-amber-500" />
                      <span>4.5</span>
                      <span className="text-gray-500">(127)</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold text-rose-600">${p.price}</span>
                        {p.market && p.market > p.price && (
                          <span className="text-sm text-gray-500 line-through">${p.market}</span>
                        )}
                      </div>

                      <Button size="icon">
                        <ShoppingBagIcon size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main >
    </section >
  );
}
