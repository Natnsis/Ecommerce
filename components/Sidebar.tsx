"use client";

import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();
  return (
    <div className="p-5 flex flex-col justify-between items-center h-screen border-r w-60">
      <div>
        <div className="flex flex-col items-center mb-5">
          <h1 className="font-secondary-extrabold text-2xl">Gebeya</h1>
          <img
            src="/admin.jpg"
            className="w-20 h-20 rounded-full border my-3"
          />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => router.push("/AdminDashboard")}
          >
            Dashboard
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => router.push("/ManageVendors")}
          >
            Vendors
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => router.push("/AdminFeedback")}
          >
            Feedbacks
          </Button>
        </div>
      </div>
      <form className="w-full">
        <Button
          className="flex gap-3 items-center cursor-pointer w-full"
          type="submit"
        >
          <LogOut size={20} />
          <p>log out</p>
        </Button>
      </form>
    </div>
  );
};

export default Sidebar;
