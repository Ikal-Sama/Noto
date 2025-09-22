import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { ArrowRight, Notebook } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const HomePage = () => {
  return (
    <div className="">
      <section className="flex flex-col justify-center items-center gap-3 w-full h-screen">
        <Logo />
        <h1 className="text-3xl font-bold text-slate-800">
          Your thoughts, <span className="text-primary">organized</span>
        </h1>
        <p className="w-xl text-center text-lg text0slate-700 tracking-wide">
          Organize your mind, one note at a time. It's the simple, beautiful way
          to capture every thought, big or small, and keep your ideas in perfect
          sync across all your devices.
        </p>

        <div className="flex gap-2 mt-5">
          <Link href="/login">
            <Button>
              Sign in <ArrowRight className="size-4" />
            </Button>
          </Link>

          <Link href="/signup">
            <Button variant="outline">
              Sign up <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
