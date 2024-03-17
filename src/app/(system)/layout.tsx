"use client";
import Sidebar from "@/components/navigation/sidebar";
import { useIssuesStore } from "@/zustand/store";

interface LandingPageProps {
  children: React.ReactNode;
}

export default function LandingPage({ children }: LandingPageProps) {
  const isSidebarExpanded = useIssuesStore((state) => state.isSidebarExpanded);
  return (
    <div className="w-screen h-screen">
      <div className="flex w-full h-full">
        <div
          className={
            isSidebarExpanded
              ? "hidden md:block md:w-1/5 ease duration-200"
              : "hidden md:block md:w-[7%] ease duration-200"
          }
        >
          <Sidebar />
        </div>
        <div
          className={
            isSidebarExpanded
              ? "w-full md:w-4/5 h-full overflow-y-scroll ease duration-200"
              : "w-full md:w-[93%] h-full overflow-y-scroll ease duration-200"
          }
        >
          {children}
        </div>
      </div>
    </div>
  );
}
