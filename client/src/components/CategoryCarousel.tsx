import { Icebreaker } from "@/types";
import { H2 } from "./typography/H2";
import { Card, CardContent } from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

type CategoryCarouselProps = {
  category: string;
  icebreakers: Icebreaker[];
};

const CAROUSEL_COLORS = ["#A3CEF1", "#ADE8F4", "#6096BA"];

export const CategoryCarousel = ({
  category,
  icebreakers,
}: CategoryCarouselProps) => {
  return (
    <>
      <H2>{category}</H2>
      <Carousel>
        <CarouselContent>
          {icebreakers.map((icebreaker, jdx) => (
            <CarouselItem key={jdx} className="basis-1/5">
              <div className="p-1">
                <Card
                  style={{
                    backgroundColor:
                      CAROUSEL_COLORS[jdx % CAROUSEL_COLORS.length],
                  }}
                >
                  <CardContent className="flex aspect-video items-center justify-center p-2">
                    <button className="text-lg text-white" id="button">
                      {icebreaker.name}
                    </button>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
};
