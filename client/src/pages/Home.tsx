import { H1 } from "@/components/typography/H1";
import { Input } from "@/components/ui/input";
import { useGetIcebreakers } from "@/hooks/useGetIcebreakers";
import { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IcebreakerCard } from "@/components/IcebreakerCard";

const MAX_ITEMS = 9;

export const Home = () => {
  const { isLoading, icebreakers, getIcebreakers } = useGetIcebreakers();
  const [searchQuery, setSearchQuery] = useState("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getIcebreakers(), []);

  const renderFilteredIcebreakers = (query: string) => {
    const filtered =
      query === ""
        ? icebreakers
        : icebreakers
            .filter((icebreaker) =>
              icebreaker.name.toLowerCase().includes(query.toLowerCase()),
            )
            .slice(0, MAX_ITEMS);

    return filtered.length === 0 ? (
      <div />
    ) : (
      <div className="g grid w-2/3 grid-cols-3 gap-6">
        {filtered.map((icebreaker, idx) => (
          <IcebreakerCard key={idx} icebreaker={icebreaker} />
        ))}
      </div>
    );
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center gap-14 bg-slate-100 p-4">
      <div className="flex w-1/2 justify-center rounded bg-[#507DBC] p-6 text-white">
        <Link to="/">
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
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        renderFilteredIcebreakers(searchQuery)
      )}
    </div>
  );
};
