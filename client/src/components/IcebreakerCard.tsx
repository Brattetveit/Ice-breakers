import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

import type { Icebreaker } from "@/types";

type IcebreakerCardProps = {
  icebreaker: Icebreaker;
};

export const IcebreakerCard = ({ icebreaker }: IcebreakerCardProps) => {
  const { name, category } = icebreaker;

  return (
    <Link to="/aboutGame">
      <Card className="flex aspect-square flex-col items-center justify-between bg-card text-card-foreground">
        <CardHeader className="text-center">
          <CardTitle>{name}</CardTitle>
          <CardDescription>{category}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Icebreaker bilde</p>
        </CardContent>
        <CardFooter>
          <p>Icebreaker kort beskrivelse</p>
        </CardFooter>
      </Card>
    </Link>
  );
};
