import { H1 } from "@/components/typography/H1";
import { H2 } from "@/components/typography/H2";
import {useNavigate } from 'react-router-dom';
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
import { Label } from "@/components/ui/label";
import { Separator  } from "@/components/ui/separator";

export const AboutGame = () => {
  const navigate = useNavigate();
  const location: Location<{
    icebreaker: Icebreaker;
  }> = useLocation();

  const { icebreaker } = location.state;
  const { name, author, category, fullDescription, feedback } = icebreaker;

  const comments = feedback || [];

  return (
    <div className="bg-[#E3F2FD]">
      <div className="flex w-full flex-col gap-4 p-4">
        <div className="flex flex-row justify-between">
        <button onClick={() => navigate(-1)} style={{ background: 'none', color: 'inherit', border: 'none', padding: 0, font: 'inherit', cursor: 'pointer', outline: 'inherit' }}>
            <b>&#8249; Tilbake</b>
          </button>
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
            <Button className="w-1/6 place-self-center bg-[#ce3c3c]">Rapporter lek</Button>
          </div>
          <div className="w-2/5 p-4">
            <Card className="flex flex-col h-dvh bg-[#bad4ea] gap-2">
              <CardHeader className="flex flex-col gap-4">
                <CardTitle>Rangering</CardTitle>
                <CardDescription className="flex flex-col gap-3">
                  <Input placeholder="Gi leken en rangering fra 0 til 100" type="number" max={100} min={0}></Input>
                  <Button className="w-1/3 place-self-center">Publiser</Button>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <CardTitle>Kommentarer</CardTitle>
                <div className="max-h-48">
                  <div className="max-h-full overflow-auto">
                    <ScrollArea className=" p-3 border border-white rounded">
                        {comments.map((comment) => (
                          <div>
                            <div className="flex gap-2">
                              <p>{comment}</p>
                              <Button className="w-1/6 bg-[#ce3c3c]">Rapporter</Button>
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
                <Button className="w-1/3">Publiser</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
