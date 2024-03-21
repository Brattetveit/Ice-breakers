import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";

import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Button } from "./ui/button";

type NavMenuProps = {
  isSignedIn: boolean;
  onLogout: () => void;
};

export const NavMenu = ({ isSignedIn, onLogout }: NavMenuProps) => {
  const MenuLinkItem = ({
    to,
    title,
    description,
  }: {
    to: string;
    title: string;
    description: string;
  }) => {
    return (
      <Link
        to={to}
        className="block h-full select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
      >
        {title}
        <p className="text-sm leading-snug text-muted-foreground">
          {description}
        </p>
      </Link>
    );
  };

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {isSignedIn ? (
          <NavigationMenuItem>
            <button onClick={onLogout}>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Logg ut
              </NavigationMenuLink>
            </button>
          </NavigationMenuItem>
        ) : (
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-popover text-popover-foreground">
              Logg inn
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="flex w-[400px] gap-3 p-6">
                <div className="flex w-1/2 justify-center rounded bg-muted p-3 text-muted-foreground">
                  <p>
                    Med en bruker kan du opprette nye leker, kommentere og mye
                    mer
                  </p>
                </div>
                <div className="flex flex-col justify-between">
                  <MenuLinkItem
                    to="/login"
                    title="Logg inn"
                    description="Logg inn på eksisterende bruker"
                  />
                  <MenuLinkItem
                    to="/register"
                    title="Registrer"
                    description="Lag en helt ny bruker ved å registere deg her"
                  />
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        )}
        <NavigationMenuItem>
          <Link to="/spinTheWheel">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Spinn hjulet!   
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <Link to="/categoryPage">Kategorier</Link>
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        {isSignedIn && (
          <NavigationMenuItem className="pl-4">
            <Link to="/icebreakerForm">
              <Button style={{backgroundColor:"#bde0fe", color: "black"}}>Lag en ny ice breaker!</Button>
            </Link>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
