import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { ConfigList } from "./ConfigList";
import { CreateConfig } from "./CreateConfig";
import { ViewConfig } from "./ViewConfig";

export const ConfigIndex = (): React.ReactElement => {
  useBreadcrumbs("/configs/", "Configs");

  return (
    <Switch>
      <PrivateRoute exact path={"/configs/"} component={ConfigList} />
      <PrivateRoute path={"/configs/new"} component={CreateConfig} />
      <PrivateRoute path={"/configs/:id"} component={ViewConfig} />
    </Switch>
  );
};
