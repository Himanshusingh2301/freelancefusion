import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const FreelancerSearchCard = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  const images = ["/5.jpg", "/6.jpg", "/7.jpeg", "/8.avif", "/9.jpg"];

  return (
    <div>
      <Card
        className="w-[430px] rounded-2xl overflow-hidden relative border border-gray-700 
        bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 shadow-2xl
        transition-all duration-500 ease-out
        before:absolute before:inset-0 before:bg-gradient-to-r 
        before:from-transparent before:via-white/10 before:to-transparent 
        before:translate-x-[-100%] before:skew-x-12 hover:before:translate-x-[100%] 
        before:transition-transform before:duration-700"
      >
        <CardContent className="relative z-10 pt-0 px-6 flex flex-col gap-5">
          {/* Title + Arrow in same row */}
          <div className="flex items-center justify-between">
            <h3 className="text-3xl font-bold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-gray-100 via-gray-300 to-gray-100">
              Search for Freelancer
            </h3>

            <div className="flex items-center justify-center bg-gradient-to-r from-gray-700 to-gray-600 rounded-full p-3 shadow-inner border border-gray-600 hover:scale-105 transition-transform">
              <ArrowRight size={22} className="text-gray-200" />
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-gray-400 text-base leading-snug">
            The right freelancer can turn your vision into reality. <br />
            Start searching and make your next project shine.
          </p>

          {/* Carousel */}
          <div className="mt-2">
            <Carousel plugins={[plugin.current]} className="w-full">
              <CarouselContent>
                {images.map((src, index) => (
                  <CarouselItem key={index}>
                    <Card className="overflow-hidden h-[250px] w-full border-none shadow-lg bg-transparent">
                      <CardContent className="flex justify-center items-center p-0 h-full">
                        <img
                          src={src}
                          alt={`Freelancer ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg border border-gray-700"
                        />
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FreelancerSearchCard;
