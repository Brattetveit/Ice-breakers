import { H1 } from "@/components/typography/H1";
import { Input } from "@/components/ui/input";
import { useGetIcebreakers } from "@/hooks/useGetIcebreakers";
import { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CategoryCarousel } from "@/components/CategoryCarousel";

const CATEGORY_NAMES = ["All", "Funny", "Serious"];

const MAX_ITEMS = 9;

export const Home = () => {
  const { isLoading, icebreakers, getIcebreakers } = useGetIcebreakers();
  const [searchQuery, setSearchQuery] = useState("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getIcebreakers(searchQuery), [searchQuery, getIcebreakers]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const categoryList = (categories: string[]) => {
    return categories.map((category) =>
      icebreakers.filter((icebreaker) => icebreaker.category === category),
    );
  };

  const filteredIcebreakers = (query: string) => {
    const filtered = icebreakers
      .filter((icebreaker) =>
        icebreaker.name.toLowerCase().includes(query.toLowerCase()),
      )
      .slice(0, MAX_ITEMS);

    return filtered.length === 0 || query === "" ? (
      <div />
    ) : (
      <ScrollArea>
        <div className="grid grid-cols-3 items-center gap-6 p-4">
          {filtered.map((icebreaker, index) => (
            <div
              key={index}
              className="flex aspect-video items-center justify-center rounded bg-blue-300 p-2"
            >
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
          placeholder="finn en icebreaker..."
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
        ) : searchQuery === "" ? (
          CATEGORY_NAMES.map((category, idx) => (
            <div key={idx}>
              <CategoryCarousel category={category} icebreakers={icebreakers} />
            </div>
          ))
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};
