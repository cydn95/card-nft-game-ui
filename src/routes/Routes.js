import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";

import Loader from "../component/Loader";
import Layout from "../layout/Layout";
import LandingPage from "../pages/LandingPage";

import { menuRoutes } from "./index";

const Routes = () => {
  return (
    <Suspense fallback={Loader}>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        {menuRoutes.map(({ path, component: Component, layout }, index) => (
          <Route
            key={index}
            path={path}
            exact
            render={(props) => (
              <Layout bg={layout}>
                <Component {...props} />
              </Layout>
            )}
          />
        ))}
      </Switch>
    </Suspense>
  );
};

export default Routes;
