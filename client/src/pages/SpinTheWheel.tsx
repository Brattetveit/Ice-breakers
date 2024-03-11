import React, { useEffect, useState } from "react";
import { useGetIcebreakers } from "@/hooks/useGetIcebreakers";
import "./SpinTheWheel.css";
import { Icebreaker } from "@/types";

const SpinTheWheel: React.FC = () => {
  const { icebreakers, getIcebreakers } = useGetIcebreakers();
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [options, setOptions] = useState<string[]>([]);
  const [displayOption, setDisplayOption] = useState("Spinn");
  const [filteredIcebreakers, setFilteredIcebreakers] = useState<Icebreaker[]>([]);
  const [showWarning, setShowWarning] = useState(false);

  

  useEffect(() => {
    getIcebreakers(); // Rettet fra useGetIcebreakers();
  }, [getIcebreakers]);

  useEffect(() => {
    const newFilteredIcebreakers = icebreakers.filter((icebreaker) =>
      icebreaker.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
    ).sort((a, b) => a.name.localeCompare(b.name)); // Sorterer alfabetisk
  
    setFilteredIcebreakers(newFilteredIcebreakers);
  }, [debouncedSearchTerm, icebreakers]);
  

  const addOption = (optionName: string) => {
    if (result !== "") {
      console.log("Kan ikke legge til flere icebreakers etter at et resultat er generert.");
      return;
    }
    if (options.includes(optionName)) {
      setShowWarning(true); // Vis advarsel
      setTimeout(() => setShowWarning(false), 3000); // Skjul advarselen automatisk etter 3 sekunder
    } else {
      setOptions([...options, optionName]);
      setSearchTerm(""); // Tømmer søkefeltet og lukker rullegardinen
      setShowWarning(false); // Sørg for at advarselen ikke vises hvis alt er ok
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
        setResult(options[(currentOptionIndex - 1) % options.length]);
        setDisplayOption(options[(currentOptionIndex - 1) % options.length]);
        setSpinning(false);
      }
    }, 100);
  };

  const resetOptions = () => {
    setOptions([]);
    setResult("");
    setDisplayOption("Spinn");
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1 className="tittel">Spinn hjulet!</h1>
      <div style={{ width: "550px", margin: "auto" }}>
        <div
          style={{
            width: "550px",
            height: "550px",
            border: "10px solid #000",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "90px",
            fontWeight: "bold",
            cursor: "pointer",
            background: result ? "#4CAF50" : spinning ? "#ccc" : "#fff",
            transition: "background-color 0.5s ease",
          }}
          onClick={spinWheel}
        >
          {result || displayOption}
        </div>
      </div>
      {result && <p>Resultat: {result}</p>}

      <div>
  {showWarning && <p style={{ color: 'red' }}>Dette alternativet er allerede lagt til.</p>}
  <input
    className="inp"
    type="text"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    placeholder="Søk etter icebreakers"
  />
  {searchTerm && (
    <ul className="search-results">
      {filteredIcebreakers.map((icebreaker: Icebreaker) => (
        <li key={icebreaker._id} onClick={() => addOption(icebreaker.name)}>
          {icebreaker.name}
        </li>
      ))}
    </ul>
  )}
</div>

      <div>
        <h2 className="alt">Valgte alternativer:</h2>
        <ul className="alternativene">
          {options.map((option, index) => (
            <li key={index}>{option}</li>
          ))}
        </ul>
      </div>

      <button className="reset-button" onClick={resetOptions}>
        Tilbakestill liste
      </button>
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
