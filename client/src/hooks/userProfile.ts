import { useState } from "react";
import { useUser } from "@/hooks/useUser";
import { addToFavorites as addToFavoritesService } from "@/services/userService";

const useAddToFavorites = () => {
  const { user, isSignedIn } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addFavorite = async (icebreakerId: string) => {
    if (!isSignedIn || !user) {
      setError("You must be logged in to add an icebreaker to favorites.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await addToFavoritesService(user._id, icebreakerId);
    } catch (error) {
      if (error instanceof Error) setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { addFavorite, isLoading, error };
};

export default useAddToFavorites;
