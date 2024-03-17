import { ModeToggle } from "@/components/ui/mode-toggle";
import React from "react";

function Navbar() {
  return (
    <nav className="w-full h-[7vh] fixed z-50">
      <div className="max-w-screen-lg mx-auto h-full px-5">
        <div className="w-full h-full flex justify-between items-center gap-5">
          <div>issues.io</div>
          <div>
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
