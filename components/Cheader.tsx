import { ShoppingBag } from "lucide-react";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import CheaderClient from "./CheaderClient";

const Cheader = async () => {

  return (
    <div className="px-5 py-3 flex justify-between">
      <h1 className="font-quater text-2xl">Gebeya</h1>
      <div className="flex items-center gap-5">
        <Button variant="ghost" className="font-secondary-extrabold text-md">
          HOME
        </Button>
        <Button variant="ghost" className="font-secondary-extrabold text-md">
          CONTACT US
        </Button>
        <Button size="icon" variant="outline">
          <ShoppingBag />
        </Button>
        <ModeToggle />
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">English</SelectItem>
            <SelectItem value="dark">Amharic</SelectItem>
          </SelectContent>
        </Select>

        {/* Client-only portion that shows avatar and logout */}
        <CheaderClient />
      </div>
    </div>
  );
};

export default Cheader;
