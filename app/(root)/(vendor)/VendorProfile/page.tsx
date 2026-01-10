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

const VendorProfile = () => {
  const { data: profile, isLoading, isError } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
  });

  if (isLoading) return <p className="p-5">Loading profile...</p>;
  if (isError) return <p className="p-5 text-red-500">Failed to load profile</p>;
  console.log(profile);
  return (
    <section>
      <Vheader />
      <div className="p-5 flex justify-center items-center">
        <div className="border h-full rounded-lg p-5 flex flex-col gap-2 font-primary">

          {/* Profile Picture */}
          <p className="font-primary">Profile Picture</p>
          <div className="flex items-center gap-10">
            <img
              src={profile?.avatar_url || "/automotive.jpg"}
              className="w-15 h-15 rounded-full"
            />
            <div className="flex gap-2">
              <Button>Change Picture</Button>
              <Button variant="destructive" size="icon">
                <Trash />
              </Button>
            </div>
          </div>

          {/* Name fields */}
          <div className="flex gap-5">
            <div>
              <label htmlFor="fName">First Name</label>
              <Input name="fName" defaultValue={profile?.first_name || ""} />
            </div>

            <div>
              <label htmlFor="lName">Last Name</label>
              <Input name="lName" defaultValue={profile?.last_name || ""} />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password">Password</label>
            <Input name="password" type="password" />
          </div>

          {/* Phone */}
          <div>
            <label>Phone No.</label>
            <Input defaultValue={profile?.phone || ""} />
          </div>

          {/* Address + Category */}
          <div className="flex gap-5">
            <div>
              <label>Address</label>
              <Input defaultValue={profile?.address || ""} />
            </div>

            <div>
              <label>Category</label>
              <Select defaultValue={profile?.category || ""}>
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

          {/* Bio */}
          <div>
            <label>Bio</label>
            <Textarea defaultValue={profile?.bio || ""} />
          </div>

          {/* Buttons */}
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
