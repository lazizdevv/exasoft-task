import Home from "../pages/home/home";

export const routes: Array<{
  path: string;
  element: React.ComponentType;
}> = [
  {
    path: "home",
    element: Home,
  },
];
