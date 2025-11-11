import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import { Plus } from "lucide-react";
import { ArrowRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,

} from "@/components/ui/carousel"

const ProjectsCard = () => {
    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )
    const images = [
        "/0.png",
        "/1.jpg",
        "/2.webp",
        "/3.jpg",
        "/4.jpg",
    ];
    return (
        <div>
            <div

                className="h-[150px] w-[430px] cursor-pointer relative px-6 flex justify-between items-center
                text-white font-semibold text-lg rounded-xl
                bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900
                border border-gray-700 
                shadow-[0_0_15px_rgba(255,255,255,0.05)]
                overflow-hidden transition-all duration-500 ease-out 
                before:absolute before:inset-0 before:bg-gradient-to-r 
                before:from-transparent before:via-white/20 before:to-transparent 
                before:translate-x-[-100%] before:skew-x-12 hover:before:translate-x-[100%] 
                before:transition-transform before:duration-700"
            >
                <div className="z-10">
                    <h3 className="text-3xl font-bold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-gray-100 via-gray-300 to-gray-100">
                        Your Projects
                    </h3>
                    <p className="text-lg text-gray-400 mt-1 mr-2">
                        See all your projects and their status
                    </p>
                </div>

                <div className="z-10 flex items-center justify-center bg-gradient-to-r from-gray-700 to-gray-600 rounded-full p-3 shadow-inner border border-gray-600">
                    <ArrowRight size={22} className="text-gray-200" />
                </div>
            </div>

            <div

                className="h-[110px] w-[430px] mt-5 cursor-pointer relative px-6 flex justify-between items-center
                text-white font-semibold text-lg rounded-xl
                bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900
                border border-gray-700 
                shadow-[0_0_15px_rgba(255,255,255,0.05)]
                overflow-hidden transition-all duration-500 ease-out 
                before:absolute before:inset-0 before:bg-gradient-to-r 
                before:from-transparent before:via-white/20 before:to-transparent 
                before:translate-x-[-100%] before:skew-x-12 hover:before:translate-x-[100%] 
                before:transition-transform before:duration-700"
            >
                <div className="z-10">
                    <h3 className="text-3xl font-bold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-gray-100 via-gray-300 to-gray-100">
                        New Project
                    </h3>
                    <p className="text-lg text-gray-400 mt-1 mr-2">
                        Post new work of yours...
                    </p>
                </div>

                <div className="z-10  flex items-center justify-center bg-gradient-to-r from-gray-700 to-gray-600 rounded-full p-3 shadow-inner border border-gray-600">
                    <Plus size={22} className="text-gray-200" />
                </div>
            </div>

            <div>
                <Carousel
                    plugins={[plugin.current]}
                    className="w-[430px] max-w-lg mt-[20px]"
                >
                    <CarouselContent>
                        {images.map((src, index) => (
                            <CarouselItem key={index}>
                                <div className="w-[430px]">
                                    <Card className="overflow-hidden h-[160px] w-full p-0 border-none shadow-lg">
                                        <CardContent className="flex justify-center items-center p-0 h-full w-full">
                                            <img
                                                src={src}
                                                alt={`Project ${index + 1}`}
                                                className="w-full h-full object-cover rounded-lg"
                                            />
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>


            </div>
        </div>
    )
}

export default ProjectsCard