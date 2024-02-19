import { H1 } from "@/components/typography/H1";
import { H2 } from "@/components/typography/H2";
import { Icebreaker } from "@/types";

// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
//   CardDescription
// } from "@/components/ui/card";

// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";

// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Input } from "@/components/ui/input";
import { Link, useLocation, type Location } from "react-router-dom";

export const AboutGame = () => {
  const location: Location<{
    icebreaker: Icebreaker;
  }> = useLocation();

  const { icebreaker } = location.state;

  return (
    <div className="flex min-h-screen w-full items-center gap-4 bg-[#E3F2FD]">
      <div className="flex w-full flex-col gap-4 p-4">
        <div>
          <div className="flex flex-row justify-between">
            <Link to="/">
              <b>&#8249; Tilbake til hjemmeside</b>
            </Link>
            <div>
              <b>Laget av:</b>
            </div>
          </div>
        </div>
        <div className="flex flex-row place-self-center">
          <div className="flex flex-col">
            <H1>{icebreaker.name}</H1>
            <p className="place-self-center">Kategori: </p>
          </div>
        </div>
        <div className="flex h-dvh flex-col gap-6 rounded bg-[#A3CEF1] p-4">
          <H2>Beskrivelse:</H2>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt
            beatae, consequuntur nostrum quas quod aperiam minima laudantium
            necessitatibus ab dolores assumenda mollitia laboriosam, officiis
            sed ipsam! Beatae inventore nobis ab?
          </p>
        </div>
      </div>
      {/* <div className="w-1/3 p-4">
        <Card className="flex flex-col h-dvh bg-[#bad4ea] gap-6">
          <CardHeader className="flex flex-col gap-4">
            <CardTitle>Rating</CardTitle>
            <CardDescription>
              <Input placeholder="Give the game a rating from 1 to 100" type="number" max={100} min={1}></Input>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <CardTitle>Comments</CardTitle>
            <div>
              <ScrollArea>
                List of comments
              </ScrollArea>
            </div>
          </CardContent>
          <CardFooter className="gap-1">
            <Textarea placeholder="Write comment here"></Textarea>
            <Button>Publiser</Button>
          </CardFooter>
        </Card>
      </div> */}
    </div>
  );
};
