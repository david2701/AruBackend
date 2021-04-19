import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { ServiceList } from "./ServiceList";
import { CreateService } from "./CreateService";
import { ViewService } from "./ViewService";

export const ServiceIndex = (): React.ReactElement => {
  useBreadcrumbs("/services/", "Services");

  return (
    <Switch>
      <PrivateRoute exact path={"/services/"} component={ServiceList} />
      <PrivateRoute path={"/services/new"} component={CreateService} />
      <PrivateRoute path={"/services/:id"} component={ViewService} />
    </Switch>
  );
};
