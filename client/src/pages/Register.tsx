import { Link } from "react-router-dom";
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
  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="w-1/2 h-3/5 bg-[#6096BA]">
        <CardHeader>
          <CardTitle className="place-self-center text-4xl mt-3">Register user</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitt}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <Input id="username" placeholder="Username" className="bg-[#d9d9d9]" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password" className="mt-5">Password</Label>
                <Input id="password" type="password" placeholder="Password" className="bg-[#d9d9d9]" />
              </div>
            </div>
            <CardFooter className="flex flex-col items-center">
              <p className="mt-2 text-sm text-gray-600">
                Already registered?{" "}
                <Link to="/login" className="text-blue-500">
                  Log in
                </Link>
              </p>
              <div className="mt-4 flex w-full justify-between">
                <Button variant="outline">Cancel</Button>
                <Button type="submit">Register</Button>
              </div>
            </CardFooter>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center m-5">
          <p className="text-sm text-gray-600">
            Already registered?{" "}
            <Link to="/login" className="text-white">
              Log in
            </Link>
          </p>
          <div className="mt-4 flex w-4/5 justify-between">
            <Button variant="outline">Cancel</Button>
            <Button>Register</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
