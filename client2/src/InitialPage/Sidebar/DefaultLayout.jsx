/* eslint-disable react/prop-types */
import React from "react";
import { Route, withRouter } from "react-router-dom";
import routerService from "../../Router";
import Header from "./Header";
import Sidebar from "./Sidebar";
import AuthRequire from "../../components/AuthRequire";

const DefaultLayout = (props) => {
  const { match } = props;
  return (
    <>
      <div className="main-wrapper">
        <Header />
        <div>
          {routerService &&
            routerService.map((route, key) => (
              <AuthRequire key={key}>
                <Route
                  path={`${match.url}${route.path}`}
                  component={route.component}
                />
              </AuthRequire>
            ))}
        </div>
        <Sidebar />
      </div>
      <div className="sidebar-overlay"></div>
    </>
  );
};

export default withRouter(DefaultLayout);
