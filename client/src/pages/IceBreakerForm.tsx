import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Message } from "@/components/Message";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { handleCreateIcebreaker } from "@/services/icebreakerMakeService";
import { useUser } from "@/hooks/useUser"
// import { useDropzone } from "react-dropzone";
// import type { File } from "buffer";

export const IcebreakerForm = () => {
  const user = useUser().user
  const [nameText, setNameText] = useState("");
  const [ruleText, setRuleText] = useState("");
  const [summaryText, setSumaryText] = useState("");
  const [category, setCategory] = useState("");
  const [visibility, setVisibility] = useState(true);
  const [time, setTime] = useState(0);
  // const [files, setFiles] = useState<(File & { preview: string })[]>([]);

  const navigate = useNavigate();
  const handleExit = () => {
    const path = `/`;
    navigate(path);
  };

  // const hasFiles = files.length > 0;

  // const { getRootProps, getInputProps } = useDropzone({
  //   accept: { "image/*": [] },
  //   onDrop: (acceptedFiles) => {
  //     setFiles(
  //       acceptedFiles.map((file) =>
  //         Object.assign(file, { preview: URL.createObjectURL(file) }),
  //       ),
  //     );
  //   },
  // });

  //placeholder
  const categories: string[] = ["drikkelek", "barnelek", "navnelek"];

  function handleNameText(event: React.ChangeEvent<HTMLInputElement>) {
    setNameText(event.currentTarget.value);
  }

  function handleRuleText(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setRuleText(event.currentTarget.value);
  }

  function handleCategory(event: React.ChangeEvent<HTMLSelectElement>) {
    setCategory(event.currentTarget.value);
  }

  function handleSumarytext(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setSumaryText(event.currentTarget.value);
  }

  function handleRadio(event: React.MouseEvent<HTMLButtonElement>) {
    const target = event.target as HTMLInputElement;
    if (target.value === "0") {
      setVisibility(true)
    } else {
      setVisibility(false);

    }
  }

  function handleCreate() {
    let make: boolean = true;
    const mName = document.getElementById("mName");

    if (mName !== null) {
      if (nameText === "") {
        mName.style.display = "block";
        make = false;
      } else {
        mName.style.display = "none";
      }
    }

    const mRules = document.getElementById("mRules");
    if (mRules !== null) {
      if (ruleText === "") {
        mRules.style.display = "block";
        make = false;
      } else {
        mRules.style.display = "none";
      }
    }

    const mSummary = document.getElementById("mSummary");
    if (mSummary !== null) {
      if (summaryText === "" || summaryText.length >= 255) {
        mSummary.style.display = "block";
        make = false;
      } else {
        mSummary.style.display = "none";
      }
    }

    const mCategory = document.getElementById("mCategory");
    if (mCategory !== null) {
      if (category === "") {
        mCategory.style.display = "block";
        make = false;
      } else {
        mCategory.style.display = "none";
      }
    }
    if (make && user !== null) {
      //add send timer to backend 
      handleCreateIcebreaker(user.username, nameText, ruleText, summaryText, category, visibility)
   
      handleExit();
    }
  }

  function displayTime() {
    let display: string = "";
    const hours: number = Math.floor(time / 3600);
    const minutes: number = Math.floor((time % 3600) / 60)
    const seconds: number = time % 60;
    const formattedMinutes: string = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds: string = seconds < 10 ? `0${seconds}` : `${seconds}`;
    display = `${hours}:${formattedMinutes}:${formattedSeconds}`;
    const clock: HTMLHeadingElement | null = document.getElementById("clock") as HTMLHeadingElement;
    if (clock !== null) {
      clock.textContent = display
      hiddeError();
    }
  }



  function timeChange(newTime: number) {
    setTime(newTime);
    console.log(time)
    displayTime();
  }

  function showError() {
    const errorMesage = document.getElementById("timerError");
    if (errorMesage !== null) {
      errorMesage.style.display = "block"
    }
  }

  function hiddeError() {
    const errorMesage = document.getElementById("timerError");
    if (errorMesage !== null) {
      errorMesage.style.display = "none"
    }
  }

  function setTimer() {
    const hoursInput = document.getElementById("hours") as HTMLInputElement;
    const minutesInput = document.getElementById("minutes") as HTMLInputElement;
    const secondsInput = document.getElementById("seconds") as HTMLInputElement;
  
    const hours = parseInt(hoursInput?.value || '0', 10);
    const minutes = parseInt(minutesInput?.value || '0', 10);
    const seconds = parseInt(secondsInput?.value || '0', 10);

    if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
      showError();  
      return;
    }
  
    const newTime = seconds + minutes * 60 + hours * 3600;
    timeChange(newTime);
    hoursInput.value = ""
    minutesInput.value = ""
    secondsInput.value = ""
  }

  useEffect(() => {
    displayTime()
 }, [time, displayTime])



  return (
    <div className="lex flex h-screen flex-col bg-[#E3F2FD]">
      <h1 className="text-center text-4xl">Opprett ny lek</h1>
      <div className="lex h-full bg-[#C9DEEE]   ">
        <div className="m-4 flex justify-end md:grid md:grid-cols-5 md:gap-12">
          <div />
          <div />
          <div />
          <div className="mt-4 flex justify-end">
            <Button className="mr-4 text-xl" onClick={handleCreate}>
              Create
            </Button>
            <Button className="text-xl" onClick={handleExit}>
              Cancel
            </Button>
          </div>
          <div />
        </div>
        <div className="m-4 md:grid md:grid-cols-5 md:gap-12">
          <h2 className="text-xl md:text-right">Navn på leke:</h2>
          <Input
            className="col-span-3 text-xl"
            onChange={handleNameText}
            placeholder="Hva heter din Ice-breaker"
          ></Input>
          <Message
            className="text-right md:text-left"
            message={"Må ha et navn"}
            id={"mName"}
          />
        </div>
        <div className="m-4 md:grid md:grid-cols-5 md:gap-12">
          <h2 className="text-xl md:text-right">Hvordan skal leken spilles:</h2>
          <Textarea
            className="col-span-3 h-96 text-xl"
            onChange={handleRuleText}
            placeholder="Hva er reglene for din Ice-Breaker"
          ></Textarea>
          <Message
            className="text-right md:text-left"
            message={"Må ha regler"}
            id={"mRules"}
          />
        </div>
        <div className="m-4 md:grid md:grid-cols-5 md:gap-12">
          <h2 className="text-xl md:text-right">Kort oppsumering:</h2>
          <Textarea
            className="col-span-3 text-xl"
            onChange={handleSumarytext}
            placeholder="Hva er reglene for din Ice-Breaker"
          ></Textarea>
          <Message
            className="text-right md:text-left"
            message={"Må ha regler"}
            id={"mSummary"}
          />
        </div>
        <div className="m-4 md:grid md:grid-cols-5 md:gap-12">
          <h2 className="text-xl md:text-right">Kategori:</h2>
          <select
            className="rounded-lg p-4 text-xl"
            id="categories"
            name="categories"
            onChange={handleCategory}
            defaultValue="default"
          >
            <option value="default" key={0} disabled>
              Velg her
            </option>
            {categories.map((category, index) => (
              <option value={category} key={index + 1}>
                {category}
              </option>
            ))}
          </select>
          <Message
            className="col-span-3"
            message={"Må velge kategori"}
            id={"mCategory"}
          />
        </div>
        <div className="m-4 md:grid md:grid-cols-5 md:gap-12">
          <h2 className="text-xl md:text-right">Synlighet:</h2>
          <RadioGroup
            className="md:rid md:col-span-3 md:grid-cols-3 md:gap-4"
            defaultValue="0"
            id="radio"
          >
            <div>
              <RadioGroupItem value="0" id="forAlle" onClick={handleRadio} />
              <Label className="text-xl" htmlFor="forAlle">
                For alle
              </Label>
            </div>
            <div>
              <RadioGroupItem value="1" id="kunMeg" onClick={handleRadio} />
              <Label className="text-xl" htmlFor="kunMeg">
                Kun meg
              </Label>
            </div>
          </RadioGroup>
        </div>
        <div className="m-4 md:grid md:grid-cols-5 md:gap-12">
          <h2 className="text-xl md:text-right">Anbefalt klokke:</h2>
          <div>
            <h2 className="text-4xl" id="clock">00:00:00</h2>
            <span className="flex inline p-1">
              <input className="w-8" id="hours" type="text" />
              <p>timer</p>
            </span>
            <span className="flex inline p-1">
              <input className="w-8" id="minutes" type="text" />
              <p>minutter</p>
            </span>
            <span className="flex inline p-1">
              <input className="w-8" id="seconds" type="text" />
              <p>sekunder</p>
            </span>
              <Message className="" id="timerError" message={"Må bruke tall"}></Message>
              <Button onClick={setTimer}>Set Klokke</Button>

          </div>
        </div>
        {/* <div className="m-4 min-h-40 md:grid md:grid-cols-5  md:gap-12">
          <h2 className="text-xl md:text-right">Last opp bilder:</h2>
          <div
            {...getRootProps()}
            className="col-span-3 border-4 border-dashed border-gray-400 p-4"
          >
            <input {...getInputProps()} />
            <p>Drag & drop bilder her, eller klikk for å velge filer</p>
            {hasFiles && (
              <div className=" h-full">
                {files.map((file, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt={`Uploaded ${index}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div> */}
      </div>
    </div>
  );
};
