// import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, useState } from "react";
import { useUser } from "@/hooks/useUser";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  
  const { login } = useUser(); 

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(username, password); // Anta at denne funksjonen er asynkron
      localStorage.setItem('justLoggedIn', 'true'); // Setter markør i localStorage for å indikere nylig innlogging
      navigate("/"); // Navigerer til hjemmesiden etter vellykket innlogging
    } catch (error) {
      console.error("Login feilet", error);
      // Håndter feil ved innlogging her (f.eks., vis en feilmelding til brukeren)
    }
  };
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#E3F2FD]">
      <Card className="w-11/12 bg-[#A3CEF1] p-2 md:w-3/5 md:p-4 lg:w-2/5 lg:p-6">
        <CardHeader>
          <CardTitle className="mt-3 place-self-center text-3xl md:text-4xl lg:text-5xl">
            Logg inn
          </CardTitle>
        </CardHeader>
        <CardContent className="m-5">
          <form className="m-6" onSubmit={handleLogin}>
            <div className="grid w-full items-center gap-4 md:gap-6">
              <div className="flex flex-col gap-1 md:gap-2">
                <Label htmlFor="username" className="text-lg md:text-xl">
                  Brukernavn
                </Label>
                <Input
                  id="username"
                  value={username}
                  placeholder="Brukernavn"
                  className="bg-[#d9d9d9]"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1 md:gap-2">
                <Label htmlFor="password" className="text-lg md:text-xl">
                  Passord
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  placeholder="Passord"
                  className="bg-[#d9d9d9]"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <CardFooter className="m-5 flex flex-col items-center gap-2 md:gap-3">
              <p className="text-sm text-gray-600">
                Ikke bruker?{" "}
                <Link to="/register" className="text-blue-500">
                  Registrer deg her
                </Link>
              </p>
              <div className="flex w-full justify-between">
                <Link to="/">
                  <Button variant="outline">
                    Avbryt
                  </Button>
                </Link>
                <Button type="submit">
                  Logg inn
                </Button>
              </div>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};