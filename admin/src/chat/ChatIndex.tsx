import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { ChatList } from "./ChatList";
import { CreateChat } from "./CreateChat";
import { ViewChat } from "./ViewChat";

export const ChatIndex = (): React.ReactElement => {
  useBreadcrumbs("/chats/", "Chats");

  return (
    <Switch>
      <PrivateRoute exact path={"/chats/"} component={ChatList} />
      <PrivateRoute path={"/chats/new"} component={CreateChat} />
      <PrivateRoute path={"/chats/:id"} component={ViewChat} />
    </Switch>
  );
};
