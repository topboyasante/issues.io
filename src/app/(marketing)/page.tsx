import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Home() {
  return (
    <div>
      <div className="fixed w-screen h-screen">
        <div className="relative h-full w-full bg-background">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#f3f3f4_1px,transparent_1px),linear-gradient(to_bottom,#f3f3f4_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#101111_1px,transparent_1px),linear-gradient(to_bottom,#101111_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        </div>
      </div>
      <div className="relative">
        <div className="pt-[10vh] max-w-screen-lg mx-auto h-full px-5">
          <div className="flex flex-col justify-center items-center">
            <h1>Dead-Simple Issues Tracking System</h1>
            <div className="my-8">
              <Link href={`/sign-up`}>
                <Button>Get Started</Button>
              </Link>
            </div>
            <Image src={`/issue_io.png`} alt="hero_img" width={2000} height={1000}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
