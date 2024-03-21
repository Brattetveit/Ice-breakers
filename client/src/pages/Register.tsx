import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { handleSubmitt } from "@/services/registerService";

export const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // Call handleSubmitt with both the event and navigate
    handleSubmitt(event, navigate);
    navigate("/login");
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#E3F2FD]">
      <Card className="w-11/12 bg-[#A3CEF1] p-2 md:w-3/5 md:p-4 lg:w-2/5 lg:p-6">
        <CardHeader>
          <CardTitle className="mt-3 place-self-center text-3xl md:text-4xl lg:text-5xl">
            Registrer bruker
          </CardTitle>
        </CardHeader>
        <CardContent className="m-5">
          <form className="m-6" onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4 md:gap-6">
              <div className="flex flex-col gap-1 md:gap-2">
                <Label htmlFor="username" className="text-lg md:text-xl">
                  Brukernavn
                </Label>
                <Input
                  id="username"
                  placeholder="Brukernavn"
                  className="bg-[#d9d9d9]"
                />
              </div>
              <div className="flex flex-col gap-1 md:gap-2">
                <Label htmlFor="password" className="text-lg md:text-xl">
                  Passord
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Passord"
                  className="bg-[#d9d9d9]"
                />
              </div>
            </div>
            <CardFooter className="m-5 flex flex-col items-center gap-2 md:gap-3">
              <p className="text-sm text-gray-600">
                Allerede bruker?{" "}
                <Link to="/login" className="text-blue-500">
                  Logg inn
                </Link>
              </p>
              <div className="flex w-full justify-between">
                <Link to="/">
                  <Button variant="outline" className="">
                    Avbryt
                  </Button>
                </Link>
                <Button type="submit" className="">
                  Registrer
                </Button>
              </div>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
