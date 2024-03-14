import React, { useEffect, useState } from "react";
import { useGetIcebreakers } from "@/hooks/useGetIcebreakers";
import "./SpinTheWheel.css"; // Husk å oppdatere din CSS-fil basert på veiledningen gitt
import { Icebreaker } from "@/types";
import { Link } from "react-router-dom";

const SpinTheWheel: React.FC = () => {
  const { icebreakers, getIcebreakers } = useGetIcebreakers();
  const [selectedIcebreaker, setSelectedIcebreaker] =
    useState<Icebreaker | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 100);
  const [options, setOptions] = useState<string[]>([]);
  const [displayOption, setDisplayOption] = useState("Spinn");
  const [filteredIcebreakers, setFilteredIcebreakers] = useState<Icebreaker[]>(
    [],
  );
  const [showWarning, setShowWarning] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getIcebreakers();
  }, [getIcebreakers]);

  useEffect(() => {
    const newFilteredIcebreakers = icebreakers
      .filter((icebreaker) =>
        icebreaker.name
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase()),
      )
      .sort((a, b) => a.name.localeCompare(b.name));

    setFilteredIcebreakers(newFilteredIcebreakers);
  }, [debouncedSearchTerm, icebreakers]);

  const addOption = (optionName: string) => {
    if (result !== "") {
      console.log(
        "Kan ikke legge til flere icebreakers etter at et resultat er generert.",
      );
      return;
    }
    if (options.includes(optionName)) {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 3000);
    } else {
      setOptions([...options, optionName]);
      setSearchTerm("");
      setShowWarning(false);
    }
  };

  const spinWheel = () => {
    if (result !== "" || spinning || options.length === 0) return;

    setSpinning(true);
    let currentOptionIndex = 0;
    const totalSpins =
      options.length * 2 + Math.floor(Math.random() * options.length);

    const interval = setInterval(() => {
      setDisplayOption(options[currentOptionIndex % options.length]);
      currentOptionIndex++;

      if (currentOptionIndex >= totalSpins) {
        clearInterval(interval);
        const finalOption = options[(currentOptionIndex - 1) % options.length];
        setResult(finalOption);
        setDisplayOption(finalOption);
        // Finn og sett den valgte icebreakeren
        const icebreakerFound = icebreakers.find(
          (icebreaker) => icebreaker.name === finalOption,
        );
        setSelectedIcebreaker(icebreakerFound || null);
        setSpinning(false);
        setShowModal(true);
      }
    }, 100);
  };

  const resetOptions = () => {
    setOptions([]);
    setResult("");
    setDisplayOption("Spinn");
    setSelectedIcebreaker(null); // Tilbakestill valgt icebreaker
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div
      className="page-container"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div
        className="banner-title"
        style={{
          width: "100%",
          backgroundColor: "#c9e1fa",
          padding: "20px 0",
          boxSizing: "border-box",
          fontSize: "70px",
          fontFamily: '"ZCOOL XiaoWei"',
          color: "rgb(0, 0, 0)",
          textAlign: "center",
        }}
      >
        Spinn hjulet!
      </div>
      <div className="content-container">
        <div
          style={{ display: "flex", flex: 1, height: "calc(100vh - 140px)" }}
        >
          {" "}
          {/* Juster høyden basert på bannerets faktiske høyde */}
          <div
            className="wheel-container"
            style={{
              flexBasis: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "#edf2fb",
              height: "100%",
              flex: 1,
            }}
          >
            {/* Hjulet her */}
            <div
              style={{
                textAlign: "center",
                width: "500px",
                height: "500px",
                border: "10px solid #000",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "90px",
                fontWeight: "bold",
                fontFamily: "ZCOOL XiaoWei",
                cursor: "pointer",
                background: result ? "#99e2b4" : spinning ? "#c9e1fa" : "#fff",
                transition: "background-color 0.5s ease",
              }}
              onClick={spinWheel}
            >
              {result || displayOption}
            </div>
          </div>
          <div
            className="options-container"
            style={{
              flexBasis: "50%",
              background: "#fadde1",
              padding: "20px",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Søkefunksjon og alternativer her */}
            {showWarning && (
              <p style={{ color: "red" }}>
                Dette alternativet er allerede lagt til.
              </p>
            )}
            <div style={{ position: "relative", width: "100%" }}>
              <input
                className="inp"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Søk etter icebreakers"
                style={{ width: "50%", marginBottom: "10px", display: "flex" }}
              />
              {searchTerm && (
                <ul
                  className="search-results"
                  style={{
                    position: "absolute",
                    width: "100%",
                    top: "100%",
                    zIndex: 1,
                    background: "white",
                    borderTop: "none",  
                  }}
                >
                  {filteredIcebreakers.map((icebreaker: Icebreaker) => (
                    <li
                      key={icebreaker._id}
                      onClick={() => addOption(icebreaker.name)}
                    >
                      {icebreaker.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div>
              <h2 className="alt" style={{ width: "100 %" }}>
                Valgte alternativer:
              </h2>
              <ul className="alternativene" style={{ width: "100%" }}>
                {options.map((option, index) => (
                  <li key={index}>{option}</li>
                ))}
              </ul>
            </div>
            <button
              className="reset-button"
              onClick={resetOptions}
              style={{ marginTop: "20px" }}
            >
              Tilbakestill liste
            </button>
          </div>
        </div>
      </div>
      <Link
        to="/"
        className="Hjem"
        style={{
          backgroundColor: "#a2d2ff",
          color: "black",
          fontSize: "30px",
        }}
      >
        &#8249;
      </Link>
      {showModal && selectedIcebreaker && (
        <div
          className="modal"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            fontFamily: "ZCOOL XiaoWei",
          }}
        >
          <div
            className="modal-content"
            style={{
              padding: "5%",
              backgroundColor: "#fff",
              borderRadius: "5px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              fontFamily: "ZCOOL XiaoWei",
            }}
          >
            <p style={{ fontSize: "50px", textAlign: "center" }}>
              Vil du prøve ut "{selectedIcebreaker.name}"?
            </p>
            <div>
              <Link
                to="/aboutGame"
                state={{ icebreaker: selectedIcebreaker }}
                style={{
                  marginRight: "10px",
                  padding: "19px",
                  backgroundColor: "#a2d2ff",
                  color: "black",
                  textDecoration: "none",
                  fontSize: "25px",
                  fontFamily: "ZCOOL XiaoWei",
                  borderRadius: "5px",
                }}
              >
                Gå til
              </Link>
              <button
                onClick={handleCloseModal}
                style={{
                  marginRight: "10px",
                  padding: "15px",
                  backgroundColor: "#ff6868",
                  color: "white",
                  border: "none",
                  fontSize: "25px",
                  fontFamily: "ZCOOL XiaoWei",
                  borderRadius: "5px",
                }}
              >
                Avbryt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function useDebounce(value: string, delay: number): string {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default SpinTheWheel;
