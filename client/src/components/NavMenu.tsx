import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";

export const NavMenu = () => {
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
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
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
        <NavigationMenuItem>
          <NavigationMenuTrigger>Logg inn</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="flex w-[400px] gap-3 p-6">
              <div className="flex w-1/2 justify-center rounded bg-blue-100 p-3">
                <p>
                  Med en bruker kan du opprette nye leker, kommentere og mye mer
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
      </NavigationMenuList>
    </NavigationMenu>
  );
};
