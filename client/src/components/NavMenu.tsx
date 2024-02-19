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
import { useUser } from "@/hooks/useUser";

export const NavMenu = () => {
  const { isLoggedIn, logOut } = useUser();

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
      <NavigationMenuLink>
        <Link
          to={to}
          className="block h-full select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
        >
          {title}
          <p className="text-sm leading-snug text-muted-foreground">
            {description}
          </p>
        </Link>
      </NavigationMenuLink>
    );
  };

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {isLoggedIn ? (
          <NavigationMenuItem>
            <NavigationMenuTrigger
              onClick={logOut}
              className="bg-popover text-popover-foreground"
            >
              Logg ut
            </NavigationMenuTrigger>
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
          <NavigationMenuTrigger className="bg-popover text-popover-foreground">
            Om oss
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[400px] grid-cols-2 p-6">
              <MenuLinkItem
                to="/"
                title="Hvem er vi?"
                description="Her kan du lese mer om hvem vi er og hva vi driver med"
              />
              <MenuLinkItem
                to="/"
                title="Hva er dette?"
                description="Her kan du lese mer om produktet vårt"
              />
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Kategorier
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
