import "./Category.css";
import { Link } from "react-router-dom";
import { useGetIcebreakers } from "@/hooks/useGetIcebreakers";
import { useEffect } from "react";
import { useLocation, type Location } from "react-router-dom";
import { Category } from "@/types";
import { IcebreakerCard } from "@/components/IcebreakerCard";
export function InCategory() {

  const { icebreakers, getIcebreakersByCategory } = useGetIcebreakers();

  const location: Location<{ category: Category }> = useLocation();
  const { category } = location.state;

  useEffect(() => {
    getIcebreakersByCategory(category);
  }, []);

  return (
    <div className="category-page">
    <h1 className="category-title">{category}</h1>
    <div className="icebreaker-list">
      {icebreakers.map((icebreaker, index) => (
        <IcebreakerCard key={index} icebreaker={icebreaker} />
      ))}
    </div>
    <Link to="/categoryPage"
          className="Tilbake"
          style={{
            backgroundColor: "#EEC5F8",
            color: "black",
            fontSize: "30px",
          }}
        >
          &#8249;</Link>
  </div>
  );
}
