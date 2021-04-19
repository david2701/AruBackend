import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { SecretaryList } from "./SecretaryList";
import { CreateSecretary } from "./CreateSecretary";
import { ViewSecretary } from "./ViewSecretary";

export const SecretaryIndex = (): React.ReactElement => {
  useBreadcrumbs("/secretaries/", "Secretaries");

  return (
    <Switch>
      <PrivateRoute exact path={"/secretaries/"} component={SecretaryList} />
      <PrivateRoute path={"/secretaries/new"} component={CreateSecretary} />
      <PrivateRoute path={"/secretaries/:id"} component={ViewSecretary} />
    </Switch>
  );
};
