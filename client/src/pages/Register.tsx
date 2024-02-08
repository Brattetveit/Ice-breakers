import { Link } from "react-router-dom";
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
import { handleSubmitt } from "@/services/registerService";

export const Register = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Register user</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitt}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <Input id="username" placeholder="Username" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Password" />
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
      </Card>
    </div>
  );
};
