import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  
  return (
    <div className="min-h-screen w-full bg-shade-5 
    py-4 sm:py-6 md:py-8 px-4 sm:px-8 md:px-12">
      <div className="h-full w-full max-w-[1200px] mx-auto my-10">
        <nav className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
          <Image src="/main-logo.png" 
            alt="logo" 
            width={400} height={400}
            className="w-[200px] w-[400px] h-auto"
          />

          <div className="flex gap-2 sm:gap-4">
            <Link href="/login">
              <Button className="w-24 sm:w-32 h-8 sm:h-10 text-sm sm:text-base font-medium bg-shade-4">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="w-24 sm:w-32 h-8 sm:h-10 text-sm sm:text-base font-medium">
                Sign up
              </Button>
            </Link>
          </div>
        </nav>

        <div className="mt-8 sm:mt-12 md:mt-20 px-3 sm:px-4 md:px-5 pt-3 sm:pt-4 md:pt-5 bg-shade-1 rounded-xl sm:rounded-2xl md:rounded-3xl">
          <Image src="/cover-image-2.jpg" 
            alt="main-image" 
            width={1200} height={500}
            className="rounded-xl sm:rounded-2xl md:rounded-3xl w-full 
            h-[600px] sm:h-[450px] md:h-[500px] object-cover" 
            priority={true}
          />

          <div className="text-center text-white mt-4 sm:mt-5 md:mt-6 py-2 sm:py-3 md:py-4
          font-medium text-sm sm:text-base md:text-lg px-2 sm:px-4">
            Warren delivers lightning-fast, 
            cited stock news alerts to keep your trading sharp 
            and informed.
          </div>
        </div>

        <Link className="flex justify-center mt-6 sm:mt-8 md:mt-10" href="/signup">
          <Button className="w-36 sm:w-42 md:w-48 h-10 sm:h-12 md:h-14 text-base sm:text-lg bg-shade-4">
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  );
}
