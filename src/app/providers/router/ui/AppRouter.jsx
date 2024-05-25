import React, { Suspense } from "react";
import { ScrollToTop } from "shared/ui/scrollToTop/ScrollToTop";
import { Preloader } from "shared/ui/preloader/Preloader";
import {
  authRoutes,
  publicRoutes,
} from "shared/consfig/routerConfig/routes.js";
import { Routes, Route } from "react-router-dom";

export const AppRouter = ({ user }) => {
  return (
    <main>
      <div className="container">
        <ScrollToTop />
        <Suspense fallback={<Preloader />}>
          <Routes>
            {user.isAuth &&
              authRoutes.map(({ path, Element }) => (
                <Route
                  path={path}
                  element={
                    <section>
                      <Element />
                    </section>
                  }
                  key={path}
                />
              ))}
            {publicRoutes.map(({ path, Element }) => (
              <Route path={path} element={<Element />} key={path} />
            ))}
          </Routes>
        </Suspense>
      </div>
    </main>
  );
};
