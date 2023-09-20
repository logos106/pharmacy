import Layout from "./components/Layout";
import Home from "./pages/home";

export const routes = [
  {
    path: "/",
    layout: Layout,
    component: <Home />,
  },
];
