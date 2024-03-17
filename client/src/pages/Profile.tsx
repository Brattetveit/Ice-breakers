import { useUser } from "@/hooks/useUser";
import { IcebreakerCard } from "@/components/IcebreakerCard";
import { type Icebreaker } from "@/types";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export const Profile = () => {
  const { user } = useUser();

  const queueTest: Icebreaker[] = [
    {
      _id: "5",
      name: "Queue 1",
      fullDescription: "This is a queued icebreaker",
      shortDescription: "Queue 1",
      ratings: [1, 2, 3],
    },
    {
      _id: "6",
      name: "Queue 2",
      fullDescription: "This is a queued icebreaker",
      shortDescription: "Queue 2",
      ratings: [1, 2, 3],
    },
    {
      _id: "7",
      name: "Queue 3",
      fullDescription: "This is a queued icebreaker",
      shortDescription: "Queue 3",
      ratings: [1, 2, 3],
    },
    {
      _id: "8",
      name: "Queue 4",
      fullDescription: "This is a queued icebreaker",
      shortDescription: "Queue 4",
      ratings: [1, 2, 3],
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [queue, setQueue] = useState<Icebreaker[]>(queueTest);

  const handleNext = () => {
    setQueue((prev) => prev.slice(1));
  };

  if (!user) return <div>not signed in</div>;

  // give me icebreakers please
  const favoritesTest: Icebreaker[] = [
    {
      _id: "1",
      name: "Favorite 1",
      fullDescription: "This is a favorite icebreaker",
      shortDescription: "Favorite 1",
      ratings: [1, 2, 3],
    },
    {
      _id: "2",
      name: "Favorite 2",
      fullDescription: "This is a favorite icebreaker",
      shortDescription: "Favorite 2",
      ratings: [1, 2, 3],
    },
  ];

  // and then a list for created ones please

  const createdTest: Icebreaker[] = [
    {
      _id: "3",
      name: "Created 1",
      fullDescription: "This is a created icebreaker",
      shortDescription: "Created 1",
      ratings: [1, 2, 3],
    },
    {
      _id: "4",
      name: "Created 2",
      fullDescription: "This is a created icebreaker",
      shortDescription: "Created 2",
      ratings: [1, 2, 3],
    },
  ];

  // and finally a list of icebreakers in a queue

  return (
    <div className="flex min-h-screen w-full justify-center p-6">
      <div className="flex w-2/3 flex-col items-center p-6">
        <h1 className="mb-10 w-full text-center text-3xl font-semibold">
          {user.username}
        </h1>
        <div className="mb-10">
          <Button disabled={!queue.length} onClick={handleNext}>
            Neste
          </Button>
        </div>

        <div className="flex w-5/6 justify-center gap-10 ">
          <div className="flex w-full flex-col gap-4 ">
            <h1 className="text-center font-semibold">Created</h1>
            {createdTest.map((icebreaker, idx) => (
              <IcebreakerCard key={idx} icebreaker={icebreaker} />
            ))}
          </div>
          <div className=" flex w-full flex-col gap-4 ">
            <h1 className="text-center font-semibold">Favorites</h1>
            {favoritesTest.map((icebreaker, idx) => (
              <IcebreakerCard key={idx} icebreaker={icebreaker} />
            ))}
          </div>

          <div className=" flex w-full flex-col gap-4 ">
            <h1 className="text-center font-semibold">
              {queue.length ? "Din kø" : "Du har ingen i køen din"}
            </h1>
            {queue.map((icebreaker, idx) => (
              <IcebreakerCard key={idx} icebreaker={icebreaker} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
