import { H1 } from "@/components/typography/H1";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useFetchCategories } from "@/hooks/useFetchCategory";
import { type Icebreaker } from "@/types";
import { useEffect } from "react";

const CAROUSEL_COLORS = ["#A3CEF1", "#ADE8F4", "#6096BA"];

const CATEGORY_NAMES = ["All", "Funny", "Serious", "Random"];

export const Home = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isLoading, categories, getCategories } = useFetchCategories();

  useEffect(() => {
    getCategories(CATEGORY_NAMES);
  });

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

  return (
    <div className="flex min-h-screen w-full flex-col items-center gap-14 p-4">
      <div className="flex w-1/2 justify-center rounded bg-[#507DBC] p-6 text-white">
        <H1>Ice Breakers</H1>
      </div>
      <div className="flex w-5/6 flex-col gap-6">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          CATEGORY_NAMES.map((category, idx) => (
            <div key={idx}>
              <h2>{category}</h2>
              <Carousel>
                <CarouselContent>
                  {icebreakersTest.map((icebreaker, jdx) => (
                    <CarouselItem key={jdx} className="w-14 basis-1/5">
                      <div className="">
                        <Card
                          style={{
                            backgroundColor:
                              CAROUSEL_COLORS[jdx % CAROUSEL_COLORS.length],
                          }}
                        >
                          <CardContent className="flex aspect-video items-center justify-center p-2">
                            <span className="text-lg font-semibold text-white">
                              {icebreaker.name}
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
          ))
        )}
      </div>
    </div>
  );
};
