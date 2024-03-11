import React, { useState } from "react";
import "./SpinTheWheel.css";

const SpinTheWheel: React.FC = () => {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState("");
  const [newOptions, setNewOptions] = useState<string[]>([]);
  const [options, setOptions] = useState<string[]>([]);
  const [displayOption, setDisplayOption] = useState("Spinn");

  const spinWheel = () => {
    // Returnerer tidlig hvis vi allerede har et resultat eller hjulet spinner
    if (result !== "" || spinning) {
      return;
    }
  
    if (options.length > 0) {
      setSpinning(true);
      let currentOptionIndex = 0;
      const totalSpins = options.length * 2 + Math.floor(Math.random() * options.length);
  
      const interval = setInterval(() => {
        setDisplayOption(options[currentOptionIndex % options.length]);
        currentOptionIndex++;
  
        if (currentOptionIndex >= totalSpins) {
          clearInterval(interval);
          setResult(options[(currentOptionIndex - 1) % options.length]);
          setDisplayOption(options[(currentOptionIndex - 1) % options.length]); // Viser resultatet i hjulet
          setSpinning(false);
        }
      }, 100);
    }
  };

  const addOptions = (e: React.FormEvent) => {
    e.preventDefault(); // For å hindre sideoppdatering ved submit
    if (newOptions.length > 0) {
      const trimmedOptions = newOptions.map(option => option.trim()); // Trimmer hvert alternativ
      setOptions([...options, ...trimmedOptions]);
      setNewOptions([]); // Tømmer input etter at alternativene er lagt til
    }
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
            background: result ? "#4CAF50" : (spinning ? "#ccc" : "#fff"), // Endrer farge til grønn når det er et resultat
            transition: "background-color 0.5s ease",
          }}
          onClick={spinWheel}
        >
          {result || displayOption}
        </div>
      </div>
      {result && <p>Resultat: {result}</p>}
      
      <div>
        <input
          className="inp"
          type="text"
          value={newOptions.join(",")}
          onChange={(e) => setNewOptions(e.target.value.split(',').map(option => option))}
          placeholder="Skriv inn alternativer, separert med komma" 
        />
        <button className="legg" onClick={addOptions}>Legg til</button>
      </div>
      
      <div>
        <h2 className="alt">Eksisterende alternativer:</h2>
        <ul className="alternativene">
          {options.map((option, index) => (
            <li key={index}>{option}</li>
          ))}
        </ul>
      </div>

      <button className="reset-button" onClick={resetOptions}>Tilbakestill liste</button>
    </div>
  );
};

export default SpinTheWheel;
