import { Input } from "@/components/ui/input";
import { useGetIcebreakers } from "@/hooks/useIcebreakers";
import { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IcebreakerCard } from "@/components/IcebreakerCard";
import { NavMenu } from "@/components/NavMenu";
import { useUser } from "@/hooks/useUser";
import { Button } from "@/components/ui/button";

export const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { isLoading, icebreakers, getIcebreakers } = useGetIcebreakers();
  const { isSignedIn, logout } = useUser();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getIcebreakers(), []);

  const renderFilteredIcebreakers = (query: string) => {
    const filtered = !query
      ? icebreakers
      : icebreakers.filter((icebreaker) =>
          icebreaker.name.toLowerCase().includes(query.toLowerCase()),
        );

    return filtered.map((icebreaker, idx) => (
      <IcebreakerCard key={idx} icebreaker={icebreaker} />
    ));
  };

  return (
    <div className="flex min-h-screen w-full justify-center bg-background p-4 text-foreground">
      <div className="flex w-2/3 flex-col gap-6">
        <div className="flex items-center justify-between gap-4 p-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-lg font-semibold">
              Ice Breakers
            </Link>
            <NavMenu isSignedIn={isSignedIn} onLogout={() => logout()} />
          </div>
          <div className="flex justify-around gap-4">
            {isSignedIn && (
              <Link to="/profile">
                <Button>Min side</Button>
              </Link>
            )}
            <Input
              placeholder="finn en ice breaker..."
              className="text-input-foreground w-3/12 grow rounded-md bg-input p-3"
              type="text"
              value={searchQuery}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSearchQuery(e.target.value)
              }
            />
          </div>
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
