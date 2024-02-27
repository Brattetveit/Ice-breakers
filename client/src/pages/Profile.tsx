import { IcebreakerCard } from "@/components/IcebreakerCard";
import { useGetIcebreakers } from "@/hooks/useGetIcebreakers";
import { useUser } from "@/hooks/useUser";
import { useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

export const Profile = () => {
  const { isSignedIn, user } = useUser();
  const { icebreakers, getIcebreakers } = useGetIcebreakers();

  useEffect(() => {
    if (isSignedIn) {
      getIcebreakers(user!._id);
    }
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
              {icebreakers.map((icebreaker, idx) => (
                <IcebreakerCard key={idx} icebreaker={icebreaker} />
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};
