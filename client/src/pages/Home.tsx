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
import { useGetIcebreakers } from "@/hooks/useGetIcebreakers";
import { type Icebreaker } from "@/types";
import { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";

const CAROUSEL_COLORS = ["#A3CEF1", "#ADE8F4", "#6096BA"];

const CATEGORY_NAMES = ["All", "Funny", "Serious"];

const MAX_ITEMS = 9;

export const Home = () => {
  const { isLoading, icebreakers, getIcebreakers } = useGetIcebreakers();

  const [searchQuery, setSearchQuery] = useState("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getIcebreakers(), []);

  const icebreakersTest: Icebreaker[] = [
    {
      name: "Icebreaker",
      category: "Some Category",
    },
    {
      name: "Icebreaker 2",
      category: "Some Category",
    },
    {
      name: "Icebreaker 3",
      category: "Some Category",
    },
    {
      name: "Icebreaker 4",
      category: "Some Category",
    },
    {
      name: "Icebreaker 5",
      category: "Some Category",
    },
    {
      name: "Icebreaker 6",
      category: "Some Category",
    },
    {
      name: "Icebreaker 7",
      category: "Some Category",
    },
    {
      name: "Icebreaker 8",
      category: "Some Category",
    },
    {
      name: "Icebreaker 9",
      category: "Some Category",
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const categoryList = (categories: string[]) => {
    return categories
      .map((category) =>
        icebreakers.filter((icebreaker) => icebreaker.category === category),
      )
      .slice(0, MAX_ITEMS);
  };

  const filteredIcebreakers = (query: string) => {
    const filtered = icebreakersTest.filter((icebreaker) =>
      icebreaker.name.toLowerCase().includes(query.toLowerCase()),
    );

    return filtered.length === 0 || query === "" ? (
      <div />
    ) : (
      <ScrollArea>
        <div className="grid grid-cols-3 items-center gap-6 p-4">
          {filtered.map((icebreaker) => (
            <div className="flex aspect-video items-center justify-center rounded bg-blue-300 p-2">
              {icebreaker.name}
            </div>
          ))}
        </div>
      </ScrollArea>
    );
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center gap-14 bg-slate-100 p-4">
      <div className="flex w-1/2 justify-center rounded bg-[#507DBC] p-6 text-white">
        <Link to=".">
          <H1>Ice Breakers</H1>
        </Link>
      </div>

      <div className="flex w-1/2 flex-col items-center gap-10">
        <Input
          className="w-1/3"
          type="text"
          value={searchQuery}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchQuery(e.target.value)
          }
        />
        <div className="w-full">{filteredIcebreakers(searchQuery)}</div>
      </div>

      <div className="flex w-5/6 flex-col gap-6">
        {isLoading ? (
          <div>Loading...</div>
        ) : searchQuery !== "" ? (
          ""
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
