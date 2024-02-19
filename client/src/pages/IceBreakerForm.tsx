import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";  
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Message } from "@/components/Message";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";


export const IceBreakerForm = () => {
  const [nameText, setNameText] = useState("")
  const [ruleText, setRuleText] = useState("")
  const [summaryText, setSumaryText] = useState("")
  const [category, setCategory] = useState("")
  const [visibility, setVisibility] = useState("0")
  const [files, setFiles] = useState([]);

  const navigate = useNavigate(); 
  const handleExit = () =>{ 
    const path = `/`; 
    navigate(path);
  }


  const hasFiles = files.length > 0;

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      const maxSize = 1024*1024; // 5 MB (you can adjust the size limit as needed)
      const filesWithValidSize = acceptedFiles.filter((file) => file.size <= maxSize);
      if (filesWithValidSize.length === acceptedFiles.length) {
        setFiles(acceptedFiles);
      } else {
        alert("Bildet er støre en største tillate størrelse (1MB). Velg et bilde som er mindre en 1MB.");
      }
    }
  });


  //placeholder 
  const categories: string[] = ["drikkelek", "barnelek", "navnelek"]


  function handleNameText(event: React.ChangeEvent<HTMLInputElement>) {
    setNameText(event.currentTarget.value);
  }

  function handleRuleText(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setRuleText(event.currentTarget.value);                                                                                                                                                               
  }

  function handleCategory(event: React.ChangeEvent<HTMLSelectElement>) {
    setCategory(event.currentTarget.value)
  }

  function handleSumarytext(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setSumaryText(event.currentTarget.value)
  }

  function handleRadio(event: React.MouseEvent<HTMLButtonElement>) {
    const target = event.target as HTMLInputElement;
    setVisibility(target.value);
  }

  function handleCreate() {
    let make: boolean = true
    const mName = document.getElementById("mName");
    
    if (mName !== null) {
      if (nameText === "") {
        mName.style.display = "block"
        make = false
      } else {
        mName.style.display = "none";
      }

    }

    const mRules = document.getElementById("mRules");
    if (mRules !== null) {
      if (ruleText === "") {
        mRules.style.display = "block"
        make = false
      } else {
        mRules.style.display = "none";

      } 
    }

    const mSummary = document.getElementById("mSummary");
    if (mSummary !== null) {
      if (summaryText === "" || summaryText.length >= 255) {
        mSummary.style.display = "block"
        make = false
      } else {
        mSummary.style.display = "none";

      }
      
    }

    const mCategory = document.getElementById("mCategory");
    if (mCategory !== null) {
      if (category === "") {
        mCategory.style.display = "block"
        make = false
      } else {
        mCategory.style.display = "none";
      }
    }
    if (make) {
      //placeholder
      console.log(nameText)
      console.log(ruleText)
      console.log(category)
      console.log(visibility)
      console.log(files)
      handleExit()
    }
  }

  return ( 
    <div className="bg-[#E3F2FD] lex h-full flex flex-col">
      <h1 className="text-center text-4xl">Opprett ny lek</h1>
      <div className="bg-[#C9DEEE] lex h-full   ">
        <div className="flex justify-end md:grid md:grid-cols-5 md:gap-12 m-4">
          <div/>
          <div/>
          <div/>
          <div className="flex justify-end mt-4">
            <Button className="text-xl mr-4" onClick={handleCreate}>Create</Button>
            <Button className="text-xl" onClick={handleExit}>Cancel</Button>
          </div>
          <div/>
        </div> 
        <div className="md:grid md:grid-cols-5 md:gap-12 m-4">
          <h2 className="md:text-right text-xl">Navn på leke:</h2>
          <Input className="col-span-3 text-xl"  onChange={handleNameText} placeholder="Hva heter din Ice-breaker"></Input>
          <Message className="text-right md:text-left" message={"Må ha et navn"} id={"mName"}/>
        </div>
        <div className="md:grid md:grid-cols-5 md:gap-12 m-4" >
          <h2 className="md:text-right text-xl">Hvordan skal leken spilles:</h2>
          <Textarea className="col-span-3 text-xl h-96" onChange={handleRuleText} placeholder="Hva er reglene for din Ice-Breaker"></Textarea>
          <Message className="text-right md:text-left" message={"Må ha regler"} id={"mRules"}/>
        </div>
        <div className="md:grid md:grid-cols-5 md:gap-12 m-4" >
          <h2 className="md:text-right text-xl">Kort oppsumering:</h2>
          <Textarea className="col-span-3 text-xl" onChange={handleSumarytext} placeholder="Hva er reglene for din Ice-Breaker"></Textarea>
          <Message className="text-right md:text-left" message={"Må ha regler"} id={"mSummary"}/>
        </div>
        <div className="md:grid md:grid-cols-5 md:gap-12 m-4">
          <h2 className="md:text-right text-xl">Kategori:</h2>
          <select className="rounded-lg p-4 text-xl" id="categories" name="categories" onChange={handleCategory} defaultValue="default">
            <option value="default" key={0} disabled >Velg her</option>
            {categories.map((category, index) => <option value={category} key={index + 1}>{category}</option>)}
          </select>
          <Message className="col-span-3" message={"Må velge kategori"} id={"mCategory"}/>
        </div>
        <div className="md:grid md:grid-cols-5 md:gap-12 m-4">
          <h2 className="md:text-right text-xl" >Synlighet:</h2>
          <RadioGroup className="md:rid md:grid-cols-3 md:gap-4 md:col-span-3" defaultValue="0" id="radio">
            <div>
              <RadioGroupItem value="0" id="forAlle" onClick={handleRadio}/>
              <Label className="text-xl" htmlFor="forAlle" >For alle</Label>
            </div>
            <div>
              <RadioGroupItem value="1" id="kunMeg" onClick={handleRadio}/>
              <Label className="text-xl" htmlFor="kunMeg" >Kun meg</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="md:grid md:grid-cols-5 md:gap-12 m-4  min-h-40">
          <h2 className="md:text-right text-xl">Last opp bilder:</h2>
          <div {...getRootProps()} className="col-span-3 p-4 border-dashed border-4 border-gray-400">
            <input {...getInputProps()} />
            <p>Drag & drop bilder her, eller klikk for å velge filer</p>
            {hasFiles && (        
              <div className=" h-full">
                {files.map((file, index) => (
                  <img key={index} src={URL.createObjectURL(file)} alt={`Uploaded ${index}`} />
                ))}
              </div> 
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
