import { H1 } from "@/components/typography/H1";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useGetIcebreakers } from "@/hooks/useGetIcebreakers";
import { type Icebreaker } from "@/types";
import { useEffect } from "react";

const CAROUSEL_COLORS = ["#A3CEF1", "#ADE8F4", "#6096BA"];

export const Home = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isLoading, icebreakers, getIcebreakers } = useGetIcebreakers();

  const icebreakersTest: Icebreaker[] = [
    {
      name: "Icebreaker",
    },
    {
      name: "Icebreaker 2",
    },
    {
      name: "Icebreaker 3",
    },
    {
      name: "Icebreaker 4",
    },
    {
      name: "Icebreaker 5",
    },
    {
      name: "Icebreaker 6",
    },
    {
      name: "Icebreaker 7",
    },
    {
      name: "Icebreaker 8",
    },
    {
      name: "Icebreaker 9",
    },
  ];

  useEffect(() => {
    getIcebreakers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col items-center gap-14 p-4">
      <div className="flex w-1/2 justify-center rounded bg-[#507DBC] p-6 text-white">
        <H1>Ice Breakers</H1>
      </div>
      <div className="sm:w-1/3 lg:w-2/3">
        {isLoading ? (
          "Loading..."
        ) : (
          <Carousel
            opts={{
              loop: true,
              startIndex: 1,
            }}
          >
            <CarouselContent>
              {Array.from({ length: icebreakersTest.length }).map((_, idx) => (
                <CarouselItem key={idx} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card
                      style={{
                        backgroundColor:
                          CAROUSEL_COLORS[idx % CAROUSEL_COLORS.length],
                      }}
                    >
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <span className="text-3xl font-semibold text-white">
                          {icebreakersTest[idx].name}
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
        )}
      </div>
    </div>
  );
};
