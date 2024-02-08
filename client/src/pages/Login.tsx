//* const Login = () => {
//   return <div>Login page</div>;
// };

//* export default Login;

// import React from "react";
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

const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Log in</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
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
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          <p className="text-sm text-gray-600 mt-2">
            Not a user?{" "}
            <Link to="/register" className="text-blue-500">
              Register here
            </Link>
          </p>
          <div className="flex justify-between w-full mt-4">
            <Button variant="outline">Cancel</Button>
            <Button>Log in</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
