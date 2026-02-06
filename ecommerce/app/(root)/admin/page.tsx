"use client"
import Sidebar from "@/components/Sidebar";
import AdminHeader from "@/components/AdminHeader";
import Counts from "@/components/Counts";
import { LineGraph } from "@/components/graphs/LineGraph";

const Admin = () => {
  return (
    <main className="grid grid-cols-8 h-screen">
      <Sidebar pageName="home" />
      <section className="px-5 col-span-7 p-5">
        <AdminHeader />
        <Counts />
        <div className="mt-10 h-[60vh]">
          <LineGraph />
        </div>
      </section>
    </main>
  )
}

export default Admin 
