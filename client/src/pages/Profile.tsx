import { useUser } from "@/hooks/useUser";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIcebreakers } from "@/hooks/useIcebreakers";
import { IcebreakerCard } from "@/components/IcebreakerCard";

export const Profile = () => {
  const { user } = useUser();
  const { icebreakers } = useIcebreakers();

  if (!user) return <div>not signed in</div>;

  const getAuthoredIcebreakers = () => {
    return icebreakers.filter((icebreaker) => {
      if (!icebreaker.author) return false;

      return icebreaker.author.username === user.username;
    });
  };

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
              {getAuthoredIcebreakers().map((icebreaker, idx) => (
                <IcebreakerCard key={idx} icebreaker={icebreaker} />
              ))}
            </div>
            <div className="grid w-full grid-cols-3 gap-4 bg-blue-500">
              {user.favorites
                ? user.favorites.map((icebreaker, idx) => (
                    <IcebreakerCard key={idx} icebreaker={icebreaker} />
                  ))
                : null}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};
