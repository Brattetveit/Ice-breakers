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

import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";

import { useRating } from "@/hooks/useRating";
import useAddToFavorites from "@/hooks/userProfile";
import { useUser } from "@/hooks/useUser";
import { useGetRatings } from "@/hooks/useGetRatings";
import { deleteRating } from "@/services/icebreakers";
import {
  handleCreateFeedback,
  reportFeedback,
  reportIcebreaker,
} from "@/services/feedbackService";
import { useGetFeedback } from "@/hooks/useGetFeedback";

export const AboutGame = () => {
  const location: Location<{ icebreaker: Icebreaker }> = useLocation();

  const { icebreaker } = location.state;
  const { name, author, category, fullDescription, defaultTime } = icebreaker;

  const { addFavorite, isLoading: isAddingToFavorites } = useAddToFavorites();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isFavorited, setIsFavorited] = useState(false);

  const { comments, getComments } = useGetFeedback(name);
  const { ratings, getRatings } = useGetRatings(name);
  const ratingAuthors = ratings.map(
    (rating) => rating.author?.toString() || "",
  );

  const userInfo = useUser();

  const storedUser = localStorage.getItem("user");
  const user: User | null = storedUser ? JSON.parse(storedUser) : null;

  const { meanRating, submitRating } = useRating(icebreaker);

  useEffect(() => {
    getComments();
    getRatings();
  }, [getComments, getRatings]);

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

        const favorites: Icebreaker[] = await response.json();
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
      <div className="max-w-8xl mx-auto px-4">
        <div className="flex w-full flex-col gap-4 p-4">
          <div className="flex flex-row justify-between">
            <Link to="/">
              <b>&#8249; Tilbake</b>
            </Link>
            <div>
              <b>{`Laget av: ${author ?? "Anonymous"}`}</b>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-4 p-4">
            <div className="col-span-3 col-start-2 flex flex-row gap-4 place-self-center">
              <div className="flex h-full flex-col items-center justify-center gap-2">
                <h1 className="text-5xl font-bold">{name}</h1>
                <p>{`Kategori: ${category}`}</p>
                <p>{`Rangering: ${meanRating.toFixed(1)}%`}</p>
                <Button
                  onClick={handleAddToFavorites}
                  disabled={isAddingToFavorites || isFavorited}
                  className={`rounded px-4 py-2 text-lg transition-colors duration-300 ${
                    isAddingToFavorites || isFavorited
                      ? "cursor-not-allowed bg-gray-400 text-gray-700"
                      : "bg-[#89ccf6] text-white hover:bg-[#172554]"
                  }`}
                >
                  {isAddingToFavorites
                    ? "Legger til..."
                    : isFavorited
                      ? `Lagt til i favoritter ${String.fromCharCode(9733)}`
                      : `Legg til i favoritter ${String.fromCharCode(9733)}`}
                </Button>
              </div>
            </div>
            <div className="col-start-5 mt-8">
              <Timer timeProp={defaultTime} endOfTimerAction={() => {}}></Timer>
            </div>
          </div>

          <div className="flex gap-2">
            <div className="m-4 flex h-dvh w-3/5 flex-col gap-6 rounded bg-[#d9f0ff] p-4">
              <H2>Beskrivelse:</H2>
              <p className="text-lg">{fullDescription}</p>
              <Button
                className="rounded bg-[#89ccf6] px-4 py-4 font-bold text-white"
                onClick={() => reportIcebreaker(icebreaker._id)}
              >
                Rapporter lek
              </Button>
            </div>

            <div className="w-2/5 p-4">
              <Card className="flex h-dvh flex-col gap-2 rounded bg-[#d9f0ff]">
                <CardHeader className="flex flex-col gap-4">
                  <CardTitle>Rangering</CardTitle>
                  <CardDescription className="flex flex-col gap-3">
                    <Input
                      placeholder="Gi leken en rangering fra 0 til 100"
                      type="number"
                      max={100}
                      min={0}
                      value={rating}
                      onChange={(e) => setRating(e.target.valueAsNumber)}
                    />
                    <Button
                      className="w-1/3 place-self-center bg-[#014f86] font-bold text-white"
                      type="submit"
                      onClick={async (e) => {
                        e.preventDefault();
                        if (!userInfo.isSignedIn) {
                          console.log("Bruker er ikke logget inn");
                        } else {
                          const username = userInfo.user?.username ?? "";
                          const userID = userInfo.user?._id ?? "";
                          if (ratingAuthors.includes(userID)) {
                            await deleteRating(name, username);
                          }
                          await submitRating(username, rating);
                          getRatings();
                        }
                      }}
                    >
                      Publiser
                    </Button>
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-col gap-4">
                  <CardTitle>Kommentarer</CardTitle>
                  <ScrollArea className="max-h-40 overflow-auto rounded border border-white p-3">
                    {comments.map((comment, index) => (
                      <div key={index}>
                        <div className="flex gap-2">
                          <p>{comment.comment}</p>
                          <Button
                            className="bg-[#ce3c3c]"
                            style={{
                              fontSize: "12px",
                              width: "70px",
                              height: "20px",
                            }}
                            onClick={() => reportFeedback(comment._id)}
                          >
                            Rapporter
                          </Button>
                        </div>
                        <Separator className="my-2"></Separator>
                      </div>
                    ))}
                  </ScrollArea>
                </CardContent>

                <CardFooter className="flex flex-col gap-3">
                  <Textarea
                    placeholder="Skriv kommentar her"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></Textarea>
                  <Button
                    className="w-1/3 bg-[#014f86] font-bold text-white"
                    onClick={async (e) => {
                      e.preventDefault();
                      if (!userInfo.isSignedIn) {
                        console.log("Bruker er ikke logget inn");
                      } else {
                        const username = userInfo.user?.username ?? "";
                        await handleCreateFeedback(name, comment, username);
                        getComments();
                        setComment("");
                      }
                    }}
                  >
                    Publiser
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
