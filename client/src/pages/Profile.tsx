import { useUser } from "@/hooks/useUser";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetIcebreakers } from "@/hooks/useGetIcebreakers";
import { useEffect, useState } from "react";
import { IcebreakerCard } from "@/components/IcebreakerCard";
import { Icebreaker } from "@/types";

export const Profile = () => {
  const [authored, setAuthored] = useState<Icebreaker[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [favorites, setFavorites] = useState<Icebreaker[]>([]);

  const { user } = useUser();
  const { icebreakers, getIcebreakers } = useGetIcebreakers();

  useEffect(() => {
    getIcebreakers((icebreaker) => {
      if (!user || !icebreaker.author) return false;

      return icebreaker.author.username === user.username;
    });
    setAuthored(icebreakers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user) return <h1>not signed in</h1>;

  return (
    <div className="flex min-h-screen w-full justify-center">
      <div className="flex w-2/3 flex-col items-center justify-between gap-6 bg-red-500 p-6">
        <h1 className="w-full bg-green-500 text-xl font-semibold">
          {user.username}
        </h1>
        <div className="flex h-1/2 w-full items-center bg-green-500">
          <ScrollArea>
            <h1>Mine Ice Breakers</h1>
            <div className="grid w-full grid-cols-3 gap-4 bg-blue-500">
              {authored.map((icebreaker, idx) => (
                <IcebreakerCard key={idx} icebreaker={icebreaker} />
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};
