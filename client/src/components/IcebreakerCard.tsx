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
    <Card className="flex aspect-square flex-col items-center justify-between">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription className="text-center">{category}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Icebreaker bilde</p>
      </CardContent>
      <CardFooter>
        <p>Icebreaker kort beskrivelse</p>
      </CardFooter>
    </Card>
  );
};
