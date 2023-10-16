import React from "react";
import {
  authRoutes,
  publicRoutes,
} from "shared/consfig/routerConfig/routes.js";
import { Routes, Route } from "react-router-dom";

export const AppRouter = ({ user }) => {
  return (
    <main>
      <div className="container">
        <Routes>
          {user.isAuth &&
            authRoutes.map(({ path, Element }) => (
              <Route path={path} element={<Element />} key={path} />
            ))}
          {publicRoutes.map(({ path, Element }) => (
            <Route path={path} element={<Element />} key={path} />
          ))}
        </Routes>
      </div>
    </main>
  );
};
