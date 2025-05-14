import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  
  return (
    <div className="h-screen w-full bg-shade-5
    py-8 px-12 flex items-center justify-center">
      <div className="h-full w-full max-w-[1200px]">
        <nav className="flex justify-between items-center">
          <Image src="/main-logo.png" 
            alt="logo" width={400} height={400}/>

          <div className="flex gap-4">
            <Link href="/login">
              <Button className="w-32 h-10 font-medium bg-shade-4">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="w-32 h-10 font-medium">
                Sign in
              </Button>
            </Link>
          </div>
        </nav>

        <div className="mt-20 px-5 pt-5 bg-shade-1 rounded-3xl">
          <Image src="/cover-image-2.jpg" 
            alt="main-image" width={1200} height={500}
            className="rounded-3xl w-full h-[500px] 
            object-cover" priority={true}/>

            <div className="text-center text-white mt-6 py-4
            font-medium text-lg">
              Warren delivers lightning-fast, 
              cited stock news alerts to keep your trading sharp 
              and informed.
            </div>
        </div>

        <Link className="flex justify-center mt-10" href="/signup">
          <Button className="w-48 h-14 text-lg bg-shade-4">
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  );
}
