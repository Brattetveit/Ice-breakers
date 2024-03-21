import { Link } from "react-router-dom";
import "./CategoryPage.css";
import { CATEGORIES } from "@/constants";
import { Category } from "@/types";

export function Categories() {
  const renderCategoryButtons = (categories: Category[]) => {
    return categories.map((category, index) => (
      <Link
        key={index}
        to="/category"
        state={{ category }}
        className="category-button"
        style={{ backgroundColor: "#fadde1", color: "black", fontSize: "40px" }}
      >
        {category}
      </Link>
    ));
  };

  return (
    <div className="KategoriContainer">
      <h1 className="Overskrift">Kategorier</h1>
      <div className="ButtonRow">{renderCategoryButtons(CATEGORIES)}</div>
      <Link
        to="/"
        className="Tilbake"
        style={{
          backgroundColor: "#ffc8dd",
          color: "black",
          fontSize: "30px",
        }}
      >
        &#8249;
      </Link>
    </div>
  );
}
