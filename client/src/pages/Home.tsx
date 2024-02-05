import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const IB_COUNT = 9;

const CAROUSEL_COLORS = ["#A3CEF1", "#ADE8F4", "#6096BA"];

export const Home = () => {
  return (
    <div className="flex flex-col gap-10 items-center w-full">
      <div className="bg-[#507DBC] w-[200px] p-3 rounded text-white">
        <h1 className="text-2xl">Ice Breakers</h1>
      </div>

      <Carousel
        className="w-full"
        opts={{
          loop: true,
          startIndex: 1,
        }}
      >
        <CarouselContent>
          {Array.from({ length: IB_COUNT }).map((_, idx) => (
            <CarouselItem key={idx} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card
                  style={{
                    backgroundColor:
                      CAROUSEL_COLORS[idx % CAROUSEL_COLORS.length],
                  }}
                >
                  <CardContent className="flex items-center justify-center p-6 aspect-square">
                    <span className="text-3xl text-white font-semibold">
                      Drikkelek {idx + 1}
                    </span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
