"use client";

import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Vheader from "@/components/Vheader";
import { Trash } from "lucide-react";
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


  return (
    <section>
      <Vheader />
      <div className="p-5 flex justify-center items-center">
        <div className="border h-full rounded-lg p-5 flex flex-col gap-2 font-primary">
          <p className="font-primary">Profile Picture</p>
          <div className="flex items-center gap-10">
            <img
              src={profileData?.avatar_url || "/automotive.jpg"}
              className="w-15 h-15 rounded-full"
            />
            <div className="flex gap-2">
              <Button>Change Picture</Button>
              <Button variant="destructive" size="icon">
                <Trash />
              </Button>
            </div>
          </div>

          <div className="flex gap-5">
            <div>
              <label htmlFor="fullName">Full Name</label>
              <Input name="fullName" defaultValue={profileData?.full_name} />
            </div>

            <div>
              <label>Category</label>
              <Select value={profileData?.category}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label>Phone No.</label>
            <Input defaultValue={profileData?.phone} />
          </div>

          <div className="flex gap-5">
            <div>
              <label>Address</label>
              <Input defaultValue={profileData?.address} />
            </div>

          </div>

          <div>
            <label>Bio</label>
            <Textarea defaultValue={profileData?.bio} />
          </div>

          <div className="flex justify-end gap-5">
            <Button>Submit</Button>
            <Button variant="outline">Cancel</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VendorProfile;
