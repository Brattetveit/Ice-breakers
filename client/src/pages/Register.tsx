// import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { handleSubmitt } from "@/services/registerService";

// export const Register = () => {
//   return (
//     <div className="flex h-screen items-center justify-center bg-[#E3F2FD]">
//       <Card className="w-1/2 h-3/5 bg-[#A3CEF1]">
//         <CardHeader>
//           <CardTitle className="place-self-center text-4xl mt-3">Register user</CardTitle>
//         </CardHeader>
//         <CardContent className="m-5">
//           <form className="m-6" onSubmit={handleSubmitt}>
//             <div className="grid w-full items-center gap-7">
//               <div className="flex flex-col gap-2">
//                 <Label htmlFor="username">Username</Label>
//                 <Input id="username" placeholder="Username" className="bg-[#d9d9d9]" />
//               </div>
//               <div className="flex flex-col gap-2">
//                 <Label htmlFor="password" className="">Password</Label>
//                 <Input id="password" type="password" placeholder="Password" className="bg-[#d9d9d9]" />
//               </div>
//             </div>
//             <CardFooter className="m-5 flex flex-col items-center">
//               <p className="text-sm text-gray-600">
//                 Already registered?{" "}
//                 <Link to="/login" className="text-blue-500">
//                   Log in
//                 </Link>
//               </p>
//               <div className="flex w-4/5 justify-between">
//                 <Button variant="outline">Cancel</Button>
//                 <Button type="submit">Register</Button>
//               </div>
//             </CardFooter>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };
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
    <div className="flex min-h-screen items-center justify-center bg-[#E3F2FD]">
      <Card className="w-11/12 md:w-3/5 lg:w-2/5 bg-[#A3CEF1] p-6 md:p-8 lg:p-10">
        <CardHeader>
          <CardTitle className="place-self-center text-3xl md:text-4xl lg:text-5xl mt-3">
            Register user
          </CardTitle>
        </CardHeader>
        <CardContent className="m-5">
          <form className="m-6" onSubmit={handleSubmitt}>
            <div className="grid w-full items-center gap-4 md:gap-6">
              <div className="flex flex-col gap-1 md:gap-2">
                <Label htmlFor="username" className="text-lg md:text-xl">
                  Username
                </Label>
                <Input
                  id="username"
                  placeholder="Username"
                  className="bg-[#d9d9d9]"
                />
              </div>
              <div className="flex flex-col gap-1 md:gap-2">
                <Label htmlFor="password" className="text-lg md:text-xl">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  className="bg-[#d9d9d9]"
                />
              </div>
            </div>
            <CardFooter className="m-5 flex flex-col items-center gap-2 md:gap-3">
              <p className="text-sm text-gray-600">
                Already registered?{" "}
                <Link to="/login" className="text-blue-500">
                  Log in
                </Link>
              </p>
              <div className="flex w-full justify-between">
                <Button variant="outline" className="">
                  Cancel
                </Button>
                <Button type="submit" className="">
                  Register
                </Button>
              </div>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
