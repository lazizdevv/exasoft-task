import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./auth/protected";
import MainLayout from "./layouts/main-layout";
import { routes } from "./routes/routes";
import NotFound from "./pages/404/not-found";
import Login from "./pages/login/login";
import { Register } from "./pages/register/register";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<MainLayout />}>
          {routes.map((route) => {
            const Component = route.element;
            return (
              <Route
                key={route.path}
                path={route.path}
                element={<Component />}
              />
            );
          })}
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default AppRoutes;
