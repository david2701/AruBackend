import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { AppointmentList } from "./AppointmentList";
import { CreateAppointment } from "./CreateAppointment";
import { ViewAppointment } from "./ViewAppointment";

export const AppointmentIndex = (): React.ReactElement => {
  useBreadcrumbs("/appointments/", "Appointments");

  return (
    <Switch>
      <PrivateRoute exact path={"/appointments/"} component={AppointmentList} />
      <PrivateRoute path={"/appointments/new"} component={CreateAppointment} />
      <PrivateRoute path={"/appointments/:id"} component={ViewAppointment} />
    </Switch>
  );
};
