import { H1 } from "@/components/typography/H1";
import { H2 } from "@/components/typography/H2";
import { Icebreaker, User } from "@/types";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { Timer } from "@/components/Timer";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Link, useLocation, type Location } from "react-router-dom";

// import { Checkbox } from "@/components/ui/checkbox";
// import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { FormEvent, useEffect, useState } from "react";

import { useRating } from "@/hooks/useRating";
import useAddToFavorites from "@/hooks/userProfile";
import { reportIcebreaker } from "@/services/feedbackService";

export const AboutGame = () => {
  const location: Location<{
    icebreaker: Icebreaker;
  }> = useLocation();

  const { icebreaker } = location.state;
  const { name, author, category, fullDescription, feedback } = icebreaker;
  const {
    addFavorite,
    isLoading: isAddingToFavorites,
    error: favoritesError,
  } = useAddToFavorites();

  const [rating, setRating] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  const comments = feedback || [];

  const storedUser = localStorage.getItem("user");
  const user: User | null = storedUser ? JSON.parse(storedUser) : null;
  // const dummyComments = ["Gøy lek", "Denne leken suger", "10/10", "Gøy lek", "Denne leken suger", "10/10"];

  const { meanRating, submitRating } = useRating(icebreaker);

  useEffect(() => {
    const checkFavorites = async () => {
      if (!user?._id || !icebreaker?._id) {
        console.log("Missing user ID or icebreaker ID");
        return;
      }

      try {
        const response = await fetch(`/api/users/${user._id}/favorites`);
        if (!response.ok) {
          throw new Error("Failed to fetch favorites");
        }

        const favorites: Icebreaker[] = await response.json(); // Assuming the response is an array of icebreaker objects
        const isFavorited = favorites.some((fav) => fav._id === icebreaker._id);
        setIsFavorited(isFavorited);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    checkFavorites();
  }, [user?._id, icebreaker?._id]);

  const handleAddToFavorites = async () => {
    if (!icebreaker?._id) {
      console.error("No icebreaker ID available for adding to favorites");
      return;
    }

    try {
      await addFavorite(icebreaker._id);
      setIsFavorited(true);
    } catch (error) {
      console.error("Failed to add to favorites:", error);
    }
  };

  return (
    <div className="bg-[#ffffff]">
      <div className="flex w-full flex-col gap-4 p-4">
        <div
          className="flex flex-row justify-between"
          style={{ fontFamily: "ZCOOL XiaoWei" }}
        >
          <Link to="/">
            <b>&#8249; Tilbake til hjemmeside</b>
          </Link>
          <div>
            <b>{`Laget av: ${author ?? "Anonymous"}`}</b>
          </div>
        </div>
        
        <div className="grid grid-cols-5">
          <div className="col-span-3 col-start-2 flex flex-row gap-4 place-self-center">
            <div
              className="flex h-full flex-col items-center justify-center gap-2"
              style={{ fontFamily: "ZCOOL XiaoWei" }}
            >
              <H1>{name}</H1>
              <div className="flex gap-1">
                <Button
                  onClick={handleAddToFavorites}
                  disabled={isAddingToFavorites || isFavorited}
                  className={`rounded px-4 py-2 text-sm font-bold transition-colors duration-300 ${
                    isAddingToFavorites || isFavorited
                      ? "cursor-not-allowed bg-gray-400 text-gray-700"
                      : "bg-[#A3CEF1] text-white hover:bg-[#172554]"
                  }`}
                >
                  {isAddingToFavorites
                    ? "Legger til..."
                    : isFavorited
                      ? "Lagt til i favoritter"
                      : "Legg til i favoritter"}
                </Button>
                {isAddingToFavorites && <span>Adding to favorites...</span>}
                {favoritesError && (
                  <span className="text-red-500">Error: {favoritesError}</span>
                )}
              </div>
            </div>
            <div
              className="rounded bg-[#fde2e4] p-2"
              style={{ fontFamily: "ZCOOL XiaoWei" }}
            >
              <p>{`Kategori: ${category}`}</p>
              <p>{`Rangering: ${meanRating.toFixed(1)}%`}</p>
            </div>
          </div>
          <div className=" col-start-5 ">
            <Timer timeProp={10} endOfTimerAction={() => {}}></Timer>
          </div>
        </div>
        <div className="flex gap-2">
          <div
            className="m-4 flex h-dvh w-3/5 flex-col gap-6 rounded bg-[#A3CEF1] p-4"
            style={{ fontFamily: "ZCOOL XiaoWei" }}
          >
            <H2>Beskrivelse:</H2>
            <p>{fullDescription}</p>
            <Button
              className="w-1/6 place-self-center bg-[#ce3c3c]"
              onClick={() => reportIcebreaker(icebreaker._id)}
            >
              Rapporter lek
            </Button>
          </div>
          <div className="w-2/5 p-4">
            <Card className="flex h-dvh flex-col gap-2 bg-[#bad4ea]">
              <form
                onSubmit={(e: FormEvent<HTMLFormElement>) => {
                  e.preventDefault();
                  submitRating(rating);
                }}
              >
                <CardHeader
                  className="flex flex-col gap-4"
                  style={{ fontFamily: "ZCOOL XiaoWei" }}
                >
                  <CardTitle>Rangering</CardTitle>
                  <CardDescription className="flex flex-col gap-3">
                    <Input
                      placeholder="Gi leken en rangering fra 0 til 100"
                      type="number"
                      max={100}
                      min={0}
                      value={rating}
                      onChange={(e) => setRating(e.target.valueAsNumber)}
                    ></Input>
                    <Button
                      className="w-1/3 place-self-center"
                      type="submit"
                      style={{ fontFamily: "ZCOOL XiaoWei" }}
                    >
                      Publiser
                    </Button>
                  </CardDescription>
                </CardHeader>
              </form>
              <CardContent
                className="flex flex-col gap-4"
                style={{ fontFamily: "ZCOOL XiaoWei" }}
              >
                <CardTitle>Kommentarer</CardTitle>
                <div className="max-h-40">
                  <div className="max-h-full overflow-auto">
                    <ScrollArea className=" rounded border border-white p-3">
                      {comments.map((comment) => (
                        <div>
                          <div className="flex gap-2">
                            <p>{comment}</p>
                            <Button className="w-1/6 bg-[#ce3c3c]">
                              Rapporter
                            </Button>
                          </div>
                          <Separator className="my-2"></Separator>
                        </div>
                      ))}
                    </ScrollArea>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-3">
                <Textarea placeholder="Skriv kommentar her"></Textarea>
                <Button
                  className="w-1/3"
                  style={{ fontFamily: "ZCOOL XiaoWei" }}
                >
                  Publiser
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
