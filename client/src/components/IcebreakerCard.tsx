import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

import react from "../assets/react.svg";

import type { Icebreaker } from "@/types";

type IcebreakerCardProps = {
  icebreaker: Icebreaker;
  color?: string;
};

export const IcebreakerCard = ({
  icebreaker,
  color = "bg-card",
}: IcebreakerCardProps) => {
  const { name, category, shortDescription, imageName } = icebreaker;

  return (
    <Link to="/aboutGame" state={{ icebreaker: icebreaker }}>
      <Card
        className={`flex aspect-square flex-col items-center ${color} justify-between text-card-foreground`}
      >
        <CardHeader className="text-center">
          <CardTitle>{name}</CardTitle>
          <CardDescription>{category}</CardDescription>
        </CardHeader>
        <CardContent>
          <img
            src={imageName ? `../src/${imageName}` : react}
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
