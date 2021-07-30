import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AdminPanel from "./containers/AdminPanel/AdminPanel";
import AdminContextProvider from "./contexts/AdminContext";

const Routes = () => {
  return (
    <AdminContextProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/admin" component={AdminPanel} />
        </Switch>
      </BrowserRouter>
    </AdminContextProvider>
  );
};

export default Routes;
