import { ModeToggle } from "@/components/ui/mode-toggle";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";

function Navbar() {
  return (
    <nav className="w-full h-[7vh] fixed z-50">
      <div className="max-w-screen-lg mx-auto h-full px-5">
        <div className="w-full h-full flex justify-between items-center gap-5">
          <div>issues.io</div>
          <div className="flex gap-5 items-center">
            <ModeToggle />
            <Link href={`/sign-in`}>
              <Button variant={`link`}>Sign In</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
