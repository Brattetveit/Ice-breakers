// import "./Category.css";
// import { Link } from "react-router-dom";
// import { useIcebreakers } from "@/hooks/useIcebreakers";
// import { useLocation, type Location } from "react-router-dom";
// import { Category } from "@/types";
// import { IcebreakerCard } from "@/components/IcebreakerCard";
// export function InCategory() {
//   const { icebreakers, isLoading } = useIcebreakers();

//   const location: Location<{ category: Category }> = useLocation();
//   const { category } = location.state;

//   const getIcebreakersByCategory = (category: Category) => {
//     return icebreakers.filter((icebreaker) => icebreaker.category === category);
//   };


//   return (
//     <div className="category-page">
//       <h1 className="category-title">{category}</h1>
//       {isLoading ? (
//         <div>Loading...</div>
//       ) : (
//         <div className="icebreaker-list">
//           {getIcebreakersByCategory(category).map((icebreaker, index) => (
//             <IcebreakerCard key={index} icebreaker={icebreaker} />
//           ))}
//         </div>
//       )}
//       <Link
//         to="/categoryPage"
//         className="Tilbake"
//         style={{
//           backgroundColor: "#EEC5F8",
//           color: "black",
//           fontSize: "30px",
//         }}
//       >
//         &#8249;
//       </Link>
//     </div>
//   );
// }

import "./Category.css";
import { Link } from "react-router-dom";
import { useIcebreakers } from "@/hooks/useIcebreakers";
import { useLocation, type Location } from "react-router-dom";
import { Category } from "@/types";
import { IcebreakerCard } from "@/components/IcebreakerCard";
import { useEffect } from "react";

export function InCategory() {
  const { icebreakers, isLoading, getIcebreakersByCategory } = useIcebreakers();

  const location: Location<{ category: Category }> = useLocation();
  const { category } = location.state;

  useEffect(() => {
    getIcebreakersByCategory(category);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  return (
    <div className="category-page">
      <h1 className="category-title">{category}</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="icebreaker-list">
          {icebreakers.map((icebreaker, index) => (
            <IcebreakerCard key={index} icebreaker={icebreaker} />
          ))}
        </div>
      )}
      <Link
        to="/categoryPage"
        className="Tilbake"
        style={{
          backgroundColor: "#EEC5F8",
          color: "black",
          fontSize: "30px",
        }}
      >
        &#8249;
      </Link>
    </div>
  );
}

