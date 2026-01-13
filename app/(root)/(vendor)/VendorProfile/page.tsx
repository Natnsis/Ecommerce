"use client";

import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import Vheader from "@/components/Vheader";
import { fetchProfile } from "@/app/controllers/profile";
import { toast } from "sonner";

const VendorProfile = () => {
  const { data: profileData, error: profileError } = useQuery({
    queryKey: ['vendorProfile'],
    queryFn: fetchProfile
  });

  if (profileError) {
    toast("unable to fetch your profile");
  }
  console.log(profileData);
  return (
    <section>
      <Vheader />
      <div className="p-5 flex justify-center">
        <div className="w-3/4 border rounded-lg p-5">
          <div className="flex gap-10 items-center">
            <img
              src={profileData?.avatar_url || "/automotive.jpg"}
              className="w-15 h-15 rounded-full"
            />
            <div>
              <p className="capitalize">{profileData.full_name}</p>
              <p className="text-xs">{profileData.role}</p>
              <p className="text-xs">{profileData.address}</p>
            </div>

          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="border w-3/4 rounded-lg p-5">
          <label>Bio</label>
          <p className="text-sm">{profileData.bio ? profileData.bio : "no bio added"}</p>
        </div>
      </div>


      <p>{profileData.address}</p>

      <p>{profileData.phone}</p>


      <label>{profileData.bio}</label>

      <Button>Update</Button>


    </section>
  );
};

export default VendorProfile;
