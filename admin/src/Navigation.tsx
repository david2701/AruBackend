import React from "react";
import { Link } from "react-router-dom";
import { Panel, PanelHeader, EnumPanelStyle } from "@amplication/design-system";

const Navigation = (): React.ReactElement => {
  return (
    <>
      <NavigationItem name="Users" to="/users" />
      <NavigationItem name="Doctors" to="/doctors" />
      <NavigationItem name="Secretaries" to="/secretaries" />
      <NavigationItem name="Appointments" to="/appointments" />
      <NavigationItem name="Services" to="/services" />
      <NavigationItem name="Configs" to="/configs" />
      <NavigationItem name="Chats" to="/chats" />
      <NavigationItem name="Sessions" to="/sessions" />
    </>
  );
};

export default Navigation;

const NavigationItem = ({
  to,
  name,
}: {
  to: string;
  name: string;
}): React.ReactElement => (
  <Link to={to}>
    <Panel panelStyle={EnumPanelStyle.Bordered}>
      <PanelHeader>{name}</PanelHeader>
      Create, update, search and delete {name}
    </Panel>
  </Link>
);
