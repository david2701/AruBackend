import React, { useCallback, useContext } from "react";
import { Route, Switch, useHistory, Link, NavLink } from "react-router-dom";
import Navigation from "./Navigation";
import Login from "./Login";
import { Credentials, setCredentials, removeCredentials } from "./auth";
import {
  Menu,
  MainLayout,
  Page,
  CircleBadge,
  Breadcrumbs,
} from "@amplication/design-system";
import BreadcrumbsContext from "./components/breadcrumbs/BreadcrumbsContext";
import BreadcrumbsProvider from "./components/breadcrumbs/BreadcrumbsProvider";
import useBreadcrumbs from "./components/breadcrumbs/use-breadcrumbs";
import PrivateRoute from "./components/PrivateRoute";
import { UserIndex } from "./user/UserIndex";
import { DoctorIndex } from "./doctor/DoctorIndex";
import { SecretaryIndex } from "./secretary/SecretaryIndex";
import { AppointmentIndex } from "./appointment/AppointmentIndex";
import { ServiceIndex } from "./service/ServiceIndex";
import { ConfigIndex } from "./config/ConfigIndex";
import { ChatIndex } from "./chat/ChatIndex";
import { SessionIndex } from "./session/SessionIndex";

const App = (): React.ReactElement => {
  const history = useHistory();
  const handleLogin = useCallback(
    (credentials: Credentials) => {
      setCredentials(credentials);
      history.push("/");
    },
    [history]
  );

  return (
    <BreadcrumbsProvider>
      <MainLayout>
        <Switch>
          <Route path="/login" render={() => <Login onLogin={handleLogin} />} />
          <PrivateRoute path="/" component={AppLayout} />
        </Switch>
      </MainLayout>
    </BreadcrumbsProvider>
  );
};

export default App;

/**@todo: move to a separate template file */
const AppLayout = (): React.ReactElement => {
  const history = useHistory();
  useBreadcrumbs("/", "AruCare");
  const breadcrumbsContext = useContext(BreadcrumbsContext);

  const signOut = useCallback(() => {
    removeCredentials();
    history.push("/login");
  }, [history]);

  // Use navLink for breadcrumbs to prevent page reload
  const ItemLink = ({ href, ...rest }: { href: string }) => (
    <NavLink {...rest} to={href} />
  );

  return (
    <>
      <Menu
        onSignOutClick={signOut}
        logoContent={
          <Link to="/">
            <CircleBadge name={"AruCare"} />
          </Link>
        }
      ></Menu>
      <MainLayout.Content>
        <Breadcrumbs>
          {}
          {breadcrumbsContext.breadcrumbsItems.map((item, index, items) => (
            <Breadcrumbs.Item
              as={ItemLink}
              key={index}
              selected={index + 1 === items.length}
              href={item.url}
            >
              {item.name}
            </Breadcrumbs.Item>
          ))}
        </Breadcrumbs>
        <Page>
          <Switch>
            <PrivateRoute exact path="/" component={Navigation} />
            <PrivateRoute path="/users" component={UserIndex} />
            <PrivateRoute path="/doctors" component={DoctorIndex} />
            <PrivateRoute path="/secretaries" component={SecretaryIndex} />
            <PrivateRoute path="/appointments" component={AppointmentIndex} />
            <PrivateRoute path="/services" component={ServiceIndex} />
            <PrivateRoute path="/configs" component={ConfigIndex} />
            <PrivateRoute path="/chats" component={ChatIndex} />
            <PrivateRoute path="/sessions" component={SessionIndex} />
          </Switch>
        </Page>
      </MainLayout.Content>
    </>
  );
};
