import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import useLogin from "@/hooks/useLogin";
export const Login = () => {
  const { username, setUsername, password, setPassword, handleLogin } =
    useLogin();

  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="h-3/5 w-1/2 bg-[#6096BA]">
        <CardHeader>
          <CardTitle className="mt-3 place-self-center text-4xl">
            Log in
          </CardTitle>
        </CardHeader>
        <CardContent className="m-5">
          <form className="mt-5" onSubmit={handleLogin}>
            <div className="grid w-full gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={username}
                  placeholder="Username"
                  className="bg-[#d9d9d9]"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password" className="mt-5">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="bg-[#d9d9d9]"
                />
              </div>
            </div>
            <CardFooter className="m-5 flex flex-col items-center">
              <p className="text-sm text-gray-600">
                Not a user?{" "}
                <Link to="/register" className="text-white">
                  Register here
                </Link>
              </p>
              <div className="mt-4 flex w-4/5 justify-between">
                <Button variant="outline">Cancel</Button>
                <Button type="submit">Log in</Button>
              </div>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
