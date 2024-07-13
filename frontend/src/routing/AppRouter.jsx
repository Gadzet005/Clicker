import { Navigate, Route, Routes } from "react-router-dom";
import { authRoutes, publicRoutes } from "./routes.jsx";

export const AppRouter = () => {
  const isAuth = true; // TODO: Добавить авторизацию

  const authRoutesComp = authRoutes.map(({ path, component }) => {
    return <Route key={path} path={path} element={component} />;
  });
  const publicRoutesComp = publicRoutes.map(({ path, component }) => {
    return <Route key={path} path={path} element={component} />;
  });

  return (
    <Routes>
      {isAuth && authRoutesComp}
      {publicRoutesComp}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
