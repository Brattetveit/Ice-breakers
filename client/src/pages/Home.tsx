import { Input } from "@/components/ui/input";
import { useIcebreakers } from "@/hooks/useIcebreakers";
import { ChangeEvent, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IcebreakerCard } from "@/components/IcebreakerCard";
import { NavMenu } from "@/components/NavMenu";
import { useUser } from "@/hooks/useUser";
import { Button } from "@/components/ui/button";

export const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { isLoading, icebreakers } = useIcebreakers();
  const { isSignedIn, logout } = useUser();

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

  const renderAds = (numAds = 10) => (
    <>
      {Array.from({ length: numAds }).map((_, idx) => (
        <div
          key={idx}
          className="mb-4 mt-6 h-40 w-full rounded-lg bg-gray-200 last:mb-0"
        >
          <div className="p-4">
            <div className="mb-2 text-xs font-bold">Din reklame her</div>
            <div className="text-xs">Oppdag fantastiske tilbud!</div>
          </div>
        </div>
      ))}
    </>
  );

  useEffect(() => {
    const justLoggedIn = localStorage.getItem("justLoggedIn");
    if (justLoggedIn === "true") {
      // Utfør handlinger her om nødvendig, f.eks. oppdatere lokal tilstand
      // for å tvinge en rerender eller hente brukerdata på nytt.

      localStorage.removeItem("justLoggedIn"); // Viktig for å unngå loop
    }
  }, []);

  return (
    <div className="flex min-h-screen w-full items-start bg-background p-4 text-foreground">
      {/* Venstre reklameboks med scroll */}
      <div className="mt-20 hidden w-1/6 flex-col items-center overflow-auto px-4 lg:flex">
        {renderAds()}
      </div>
      {/* Hovedinnhold */}
      <div className="flex flex-1 flex-col gap-6">
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
                <Button style={{ backgroundColor: "#bde0fe", color: "black" }}>
                  Min side
                </Button>
              </Link>
            )}
            <Input
              placeholder="finn en ice breaker..."
              className="text-input-foreground w-full grow rounded-md bg-input p-3 md:w-3/12"
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
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {renderFilteredIcebreakers(searchQuery)}
          </div>
        )}
      </div>

      {/* Høyre reklameboks med scroll */}
      <div className="mt-20 hidden w-1/6 flex-col items-center overflow-auto px-4 lg:flex">
        {renderAds()}
      </div>
    </div>
  );
};
