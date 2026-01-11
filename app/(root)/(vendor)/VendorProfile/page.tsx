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
import { fetchProfile, updateVendorProfile } from "@/app/controllers/profile";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "@/app/schema/profileSchema";

const VendorProfile = () => {

  const { data: profileData, error: profileError } = useQuery({
    queryKey: ['vendorProfile'],
    queryFn: fetchProfile
  });

  if (profileError) {
    toast("unable to fetch your profile");
  }

  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: profileData?.full_name,
      category: profileData?.category,
      phone: profileData?.phone,
      address: profileData?.address,
      bio: profileData?.bio
    }

  })


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
          </div>

          <div className="flex gap-5">
            <div>
              <label htmlFor="fullName">Full Name</label>
              <Input {...form.register("full_name")} />
            </div>

            <div>
              <label>Category</label>
              <Select {...form.register("category")}>
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
            <Input {...form.register("phone")} />
          </div>

          <div className="flex gap-5">
            <div>
              <label>Address</label>
              <Input {...form.register("address")} />
            </div>
          </div>

          <div>
            <label>Bio</label>
            <Textarea {...form.register("bio")} />
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
