import { H1 } from "@/components/typography/H1";
import { H2 } from "@/components/typography/H2";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { useFetchCategories } from "@/hooks/useFetchCategory";
import { type Icebreaker } from "@/types";
import { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CAROUSEL_COLORS = ["#A3CEF1", "#ADE8F4", "#6096BA"];

const CATEGORY_NAMES = ["All", "Funny", "Serious"];

export const Home = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isLoading, categories, getCategories } = useFetchCategories();

  const [searchQuery, setSearchQuery] = useState("");

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
    <div className="flex min-h-screen w-full flex-col items-center gap-14 bg-slate-100 p-4">
      <div className="flex w-1/2 justify-center rounded bg-[#507DBC] p-6 text-white">
        <Link to=".">
          <H1>Ice Breakers</H1>
        </Link>
      </div>

      <div>
        <Input
          type="text"
          value={searchQuery}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchQuery(e.target.value)
          }
        />
      </div>

      <div className="flex w-5/6 flex-col gap-6">
        {isLoading || searchQuery !== "" ? (
          <div />
        ) : (
          CATEGORY_NAMES.map((category, idx) => (
            <div key={idx}>
              <H2>{category}</H2>
              <Carousel>
                <CarouselContent>
                  {icebreakersTest.map((icebreaker, jdx) => (
                    <CarouselItem key={jdx} className="basis-1/5">
                      <div className="p-1">
                        <Card
                          style={{
                            backgroundColor:
                              CAROUSEL_COLORS[jdx % CAROUSEL_COLORS.length],
                          }}
                        >
                          <CardContent className="flex aspect-video items-center justify-center p-2">
                            <button className="text-lg text-white" id="button">
                              {icebreaker.name}
                            </button>
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
