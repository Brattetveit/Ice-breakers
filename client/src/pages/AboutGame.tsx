import { H1 } from "@/components/typography/H1";
import { H2 } from "@/components/typography/H2";
import { Icebreaker } from "@/types";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Link, useLocation, type Location } from "react-router-dom";

import { Checkbox  } from "@/components/ui/checkbox";
import { Label } from "@radix-ui/react-label";

export const AboutGame = () => {
  const location: Location<{
    icebreaker: Icebreaker;
  }> = useLocation();

  const { icebreaker } = location.state;
  const { name, author, category, fullDescription } = icebreaker;


  return (
    <div className="bg-[#E3F2FD]">
      <div className="flex w-full flex-col gap-4 p-4">
        <div className="flex flex-row justify-between">
          <Link to="/">
            <b>&#8249; Tilbake til hjemmeside</b>
          </Link>
          <div>
            <b>{`Laget av: ${author ?? "Anonymous"}`}</b>
          </div>
        </div>
        <div className="flex flex-row place-self-center gap-8">
          <div className="flex flex-col gap-2">
            <H1>{name}</H1>
            <div className="flex gap-1">
              <Checkbox 
                id="favourite"
              ></Checkbox>
              <Label htmlFor="favourite">Legg til i favoritter</Label>
            </div>
          </div>
          <div className="bg-[#ebd1d1] p-2 rounded">
            <p>{`Kategori: ${category}`}</p>
            <p>Rangering: ??</p>
            <p>Anbefalt tidsbruk: ??</p>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex h-dvh w-3/5 flex-col gap-6 rounded bg-[#A3CEF1] p-4 m-4">
            <H2>Beskrivelse:</H2>
            <p>{fullDescription}</p>
            <Button className="w-1/6 place-self-center">Rapporter lek</Button>
          </div>
          <div className="w-2/5 p-4">
            <Card className="flex flex-col h-dvh bg-[#bad4ea] gap-6">
              <CardHeader className="flex flex-col gap-4">
                <CardTitle>Rangering</CardTitle>
                <CardDescription className="flex flex-col gap-3">
                  <Input placeholder="Gi leken en rangering fra 0 til 100" type="number" max={100} min={0}></Input>
                  <Button className="w-1/3 place-self-center">Publiser</Button>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <CardTitle>Kommentarer</CardTitle>
                <div>
                  <ScrollArea>
                    Liste med kommentarer
                  </ScrollArea>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-3">
                <Textarea placeholder="Skriv kommentar her"></Textarea>
                <Button className="w-1/3">Publiser</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
