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
import { cn } from "@/lib/utils";

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
  }, [products, searchTerm, category, minPrice, maxPrice]);

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "electronics", label: "Electronics" },
    { value: "fashion", label: "Fashion" },
    { value: "furniture", label: "Home & Living" },
    { value: "sport", label: "Sports & Outdoors" },
    { value: "stationary", label: "Books & Stationery" },
    { value: "toys", label: "Toys & Kids" },
    { value: "health", label: "Health & Wellness" },
    { value: "automotive", label: "Automotive" },
  ];

  return (
    <section className="p-4 sm:p-5 w-full min-h-screen">
      {/* Top bar – header + search + icons */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5">
        <InnerHeader />

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <Input
            className="flex-1 min-w-[180px]"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="outline" size="icon" className="shrink-0">
            <HeartIcon size={20} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.push("/dashboard/cart")}
            className="shrink-0"
          >
            <ShoppingBagIcon size={20} />
          </Button>
          <ModeToggle />
          <Profile />
        </div>
      </div>

      {/* Mobile-only: horizontal category filter bar */}
      <div className="md:hidden mb-5 overflow-x-auto pb-1 -mx-2 px-2">
        <div className="flex gap-2.5 min-w-max">
          {categories.map((item) => (
            <button
              key={item.value}
              onClick={() => setCategory(item.value)}
              className={cn(
                "px-4 py-1.5 text-sm font-medium rounded-full whitespace-nowrap transition-colors",
                category === item.value
                  ? "bg-rose-600 text-white shadow-sm"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <main className="flex gap-6">
        {/* Desktop sidebar – hidden on mobile */}
        <aside className="w-64 shrink-0 hidden md:block">
          <div className="sticky top-6 space-y-6">
            <div>
              <h2 className="font-semibold mb-3">Category</h2>
              {categories.map((item) => (
                <label
                  key={item.value}
                  className="flex items-center gap-2 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:text-rose-600 cursor-pointer select-none"
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
                Leave empty to show all
              </p>
            </div>
          </div>
        </aside>

        {/* Main content area */}
        <section className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5">
            <h1 className="text-2xl font-bold capitalize">
              {category === "all" ? "All Products" : category}
            </h1>
          </div>

          {/* Mobile-only: price filter below title */}
          <div className="md:hidden mb-6">
            <h3 className="font-medium text-sm mb-2">Price Range</h3>
            <div className="grid grid-cols-2 gap-3">
              <Input
                type="number"
                min={0}
                placeholder="Min"
                value={minPriceInput}
                onChange={(e) => setMinPriceInput(e.target.value)}
              />
              <Input
                type="number"
                min={0}
                placeholder="Max"
                value={maxPriceInput}
                onChange={(e) => setMaxPriceInput(e.target.value)}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1.5">
              Leave empty for all prices
            </p>
          </div>

          {productsLoading ? (
            <div className="text-center py-16 text-gray-500">Loading products...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              No products match your filters
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => router.push(`/dashboard/${p.id}`)}
                  className="border rounded-lg overflow-hidden bg-white dark:bg-gray-900 hover:shadow-md transition-all cursor-pointer group flex flex-col h-full"
                >
                  <div className="relative pt-[100%] bg-gray-50 dark:bg-gray-800">
                    <button className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-white/80 dark:bg-black/60 hover:bg-white dark:hover:bg-black transition">
                      <HeartIcon size={18} className="text-gray-500 hover:text-rose-600" />
                    </button>
                    <Image
                      src={p.url || "/placeholder.svg"}
                      alt={p.name || "Product"}
                      fill
                      className="object-contain p-3 sm:p-4 group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-3 sm:p-4 flex flex-col flex-1">
                    <h3 className="font-medium text-sm sm:text-base line-clamp-2 mb-1.5">
                      {p.name}
                    </h3>
                    <div className="flex items-center gap-1 text-xs sm:text-sm mb-2 text-gray-600 dark:text-gray-400">
                      <StarIcon size={14} weight="fill" className="text-amber-500" />
                      <span>4.5</span>
                      <span>(127)</span>
                    </div>

                    <div className="mt-auto flex justify-between items-center">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-lg sm:text-xl font-bold text-rose-600">
                          ${p.price}
                        </span>
                        {p.market && p.market > p.price && (
                          <span className="text-xs sm:text-sm text-gray-500 line-through">
                            ${p.market}
                          </span>
                        )}
                      </div>
                      <Button size="icon" className="h-8 w-8 sm:h-9 sm:w-9">
                        <ShoppingBagIcon size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </section>
  );
}
