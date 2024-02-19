import { Input } from "@/components/ui/input";
import { useGetIcebreakers } from "@/hooks/useGetIcebreakers";
import { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IcebreakerCard } from "@/components/IcebreakerCard";
import { NavMenu } from "@/components/NavMenu";

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

    return filtered.map((icebreaker) => (
      <IcebreakerCard icebreaker={icebreaker} />
    ));
  };

  return (
    <div className="flex min-h-screen w-full justify-center bg-background p-4 text-foreground">
      <div className="flex w-2/3 flex-col gap-10">
        <div className="flex items-center justify-between gap-4 p-4">
          <div className="flex w-1/2 items-center gap-4">
            <Link to="/" className="text-lg font-semibold">
              Ice Breakers
            </Link>
            <NavMenu />
          </div>
          <Input
            placeholder="finn en ice breaker..."
            className="text-input-foreground w-3/12 rounded-md bg-input p-3"
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
          <div className="grid grid-cols-3 gap-6">
            {renderFilteredIcebreakers(searchQuery)}
          </div>
        )}
      </div>
    </div>
  );
};
