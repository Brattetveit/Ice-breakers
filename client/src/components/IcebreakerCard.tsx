import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

import vite from "../../public/vite.svg";

import type { Icebreaker } from "@/types";

type IcebreakerCardProps = {
  icebreaker: Icebreaker;
};

export const IcebreakerCard = ({ icebreaker }: IcebreakerCardProps) => {
  const { name, category, shortDescription, imageName } = icebreaker;

  return (
    <Link to="/aboutGame" state={{ icebreaker: icebreaker }}>
      <Card className="flex aspect-square flex-col items-center justify-between bg-card text-card-foreground">
        <CardHeader className="text-center">
          <CardTitle>{name}</CardTitle>
          <CardDescription>{category}</CardDescription>
        </CardHeader>
        <CardContent>
          <img
            src={imageName ? `../../public/${imageName}` : vite}
            alt="Ice breaker bilde"
          />
        </CardContent>
        <CardFooter>
          {shortDescription ?? "Ice breaker kort beskrivelse"}
        </CardFooter>
      </Card>
    </Link>
  );
};
