"use client";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Separator } from "@/components/ui/separator";
import { NAVBAR_LINKS } from "@/constants/nav-links";
import { useIssuesStore } from "@/zustand/store";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Navbar() {
  const toggleSidebar = useIssuesStore((state) => state.toggleSidebar);
  const isSidebarExpanded = useIssuesStore((state) => state.isSidebarExpanded);

  const pathName = usePathname();

  return (
    <>
      <nav className="hidden md:block w-full h-full sticky top-0 left-0 border-r bg-[#f5f5f5] dark:bg-[#161616] overflow-y-scroll scrollbar-hide">
        <div className="flex flex-col justify-between w-full h-full p-3">
          {/* Top */}
          <div>
            <div>
              <div className="flex justify-between items-center gap-5">
                <div
                  onClick={() => toggleSidebar()}
                  className="border p-1 rounded-full cursor-pointer"
                >
                  {isSidebarExpanded === true ? (
                    <ChevronLeftIcon />
                  ) : (
                    <ChevronRightIcon />
                  )}
                </div>
              </div>
              <br />
              <div
                className={
                  isSidebarExpanded
                    ? ""
                    : "flex justify-center items-center w-full"
                }
              ></div>
            </div>
            <Separator className="my-5" />
            <div
              className={
                isSidebarExpanded
                  ? "flex flex-col w-full gap-2"
                  : "flex flex-col items-center w-full gap-2"
              }
            >
              {NAVBAR_LINKS.map((link) => {
                return (
                  <Link
                    href={`${link.href}`}
                    key={link.id}
                    className={
                      pathName === `${link.href}`
                        ? "dark:bg-[#2b2b2b] dark:border rounded-lg p-2 shadow dark:shadow-md font-semibold w-auto"
                        : "hover:bg-[#f5f5f5] dark:hover:bg-[#191919] rounded-lg text-neutral-500 p-2 w-auto"
                    }
                  >
                    <div
                      className={
                        isSidebarExpanded
                          ? "flex items-center space-x-2 ease duration-200"
                          : "flex justify-center items-center space-x-0 ease duration-200"
                      }
                    >
                      {link.icon}
                      {isSidebarExpanded === true && (
                        <span className="text-sm">{link.title}</span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
          {/* Bottom */}
          <div>
            <ModeToggle />
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
