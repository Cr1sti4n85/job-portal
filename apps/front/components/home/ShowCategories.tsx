"use client";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { categories } from "@/lib/carouselData";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";

const ShowCategories = () => {
  return (
    <Carousel
      opts={{ align: "start" }}
      className="w-full max-w-xl mx-auto my-20"
      plugins={[
        Autoplay({
          delay: 3000,
        }),
      ]}
    >
      <CarouselContent>
        {categories.map((category, index) => (
          <CarouselItem key={index} className="md:basis-1/3">
            <Link href={`/job?${category}`} className="p-1">
              <Button className="rounded-full bg-black/50 text-yellow-400 duration-400">
                {category}
              </Button>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default ShowCategories;
