import { useUser } from "@/hooks/useUser";
import { IcebreakerCard } from "@/components/IcebreakerCard";
import { type Icebreaker } from "@/types";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  fetchCreatedIcebreakers,
  fetchFavorites,
} from "@/services/userService";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const { user, login } = useUser();
  const [favorites, setFavorites] = useState<Icebreaker[]>([]);
  const [createdIcebreakers, setCreatedIcebreakers] = useState<Icebreaker[]>(
    [],
  );

  const navigate = useNavigate();

  // const [queue] = useState<Icebreaker[]>(user?.queue || []);

  const handleNext = () => {
    navigate("/"); // Navigerer til hjemmesiden etter vellykket innlogging
  };

  const navigateToAdminpage = () => {
    navigate("/adminpage");
  };
  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          await login(user.username, user.password);

          const fetchedFavorites = await fetchFavorites(user._id);
          setFavorites(fetchedFavorites);

          const fetchedCreatedIcebreakers = await fetchCreatedIcebreakers(
            user._id,
          );
          setCreatedIcebreakers(fetchedCreatedIcebreakers);
        } catch (error) {
          console.error("Failed to fetch data:", error);
        }
      }
    };

    fetchData();
  }, [user, login]);

  if (!user) return <div>Not signed in....</div>;

  const { username, role } = user;

  return (
    <div className="flex min-h-screen w-full justify-center p-6">
      <div className="flex w-2/3 flex-col items-center p-6">
        <h1 className="mb-10 w-full text-center text-3xl font-semibold">
          {username}
        </h1>
        <div className="mb-10">
          <Button onClick={handleNext}>Tilbake</Button>
          {role === "admin" && (
            <Button onClick={navigateToAdminpage} className="ml-4">
              Admin Side
            </Button>
          )}
        </div>

        <div className="flex w-5/6 justify-center gap-4">
          <div className="flex w-full flex-col gap-4 ">
            <h1 className="text-center font-semibold">
              {createdIcebreakers.length
                ? "Mine Icebreakers"
                : "Ingen Icebreakers opprettet"}
            </h1>
            {createdIcebreakers.map((icebreaker, idx) => (
              <IcebreakerCard key={idx} icebreaker={icebreaker} />
            ))}
          </div>
          <div className=" flex w-full flex-col gap-4 ">
            <h1 className="text-center font-semibold">
              {favorites.length ? "Favoritter" : "Du har ingen favoritter"}
            </h1>
            {favorites.map((icebreaker, idx) => (
              <IcebreakerCard key={idx} icebreaker={icebreaker} />
            ))}
          </div>

          {/* <div className=" flex w-full flex-col gap-4 ">
            <h1 className="text-center font-semibold">
              {queue.length ? "Min kø" : "Du har ingen i køen din"}
            </h1>
            {queue.map((icebreaker, idx) => {
              if (!idx) {
                return (
                  <IcebreakerCard
                    color="bg-green-300"
                    key={idx}
                    icebreaker={icebreaker}
                  />
                );
              }
              return <IcebreakerCard key={idx} icebreaker={icebreaker} />;
            })}
          </div> */}
        </div>
      </div>
    </div>
  );
};
