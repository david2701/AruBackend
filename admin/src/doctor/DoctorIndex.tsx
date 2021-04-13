import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { DoctorList } from "./DoctorList";
import { CreateDoctor } from "./CreateDoctor";
import { ViewDoctor } from "./ViewDoctor";

export const DoctorIndex = (): React.ReactElement => {
  useBreadcrumbs("/doctors/", "Doctors");

  return (
    <Switch>
      <PrivateRoute exact path={"/doctors/"} component={DoctorList} />
      <PrivateRoute path={"/doctors/new"} component={CreateDoctor} />
      <PrivateRoute path={"/doctors/:id"} component={ViewDoctor} />
    </Switch>
  );
};
