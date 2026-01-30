"use client"
import Sidebar from "@/components/Sidebar";
import AdminHeader from "@/components/AdminHeader";
import Counts from "@/components/Counts";
import AdminHero from "@/components/AdminHero";
import { RecentProducts } from "@/components/RecentProducts";

const Admin = () => {
  return (
    <main className="grid grid-cols-8 h-screen">
      <Sidebar pageName="home" />
      <section className="px-5 col-span-7 p-5">
        <AdminHeader />
        <Counts />
        <div className="h-[65vh] overflow-y-auto">
          <AdminHero />
          <div className="hidden md:block">
            <RecentProducts />
          </div>
        </div>
      </section>
    </main>
  )
}

export default Admin 
