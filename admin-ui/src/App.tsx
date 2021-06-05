import React, { useEffect, useState } from "react";
import { Admin, DataProvider, Resource } from "react-admin";
import buildGraphQLProvider from "./data-provider/graphqlDataProvider";
import basicHttpAuthProvider from "./auth-provider/ra-auth-basic-http";
import { theme } from "./theme/theme";
import Login from "./Login";
import "./App.scss";
import Dashboard from "./pages/Dashboard";
import { UserList } from "./user/UserList";
import { UserCreate } from "./user/UserCreate";
import { UserEdit } from "./user/UserEdit";
import { UserShow } from "./user/UserShow";
import { DoctorList } from "./doctor/DoctorList";
import { DoctorCreate } from "./doctor/DoctorCreate";
import { DoctorEdit } from "./doctor/DoctorEdit";
import { DoctorShow } from "./doctor/DoctorShow";
import { SecretaryList } from "./secretary/SecretaryList";
import { SecretaryCreate } from "./secretary/SecretaryCreate";
import { SecretaryEdit } from "./secretary/SecretaryEdit";
import { SecretaryShow } from "./secretary/SecretaryShow";
import { AppointmentList } from "./appointment/AppointmentList";
import { AppointmentCreate } from "./appointment/AppointmentCreate";
import { AppointmentEdit } from "./appointment/AppointmentEdit";
import { AppointmentShow } from "./appointment/AppointmentShow";
import { ServiceList } from "./service/ServiceList";
import { ServiceCreate } from "./service/ServiceCreate";
import { ServiceEdit } from "./service/ServiceEdit";
import { ServiceShow } from "./service/ServiceShow";
import { ConfigList } from "./config/ConfigList";
import { ConfigCreate } from "./config/ConfigCreate";
import { ConfigEdit } from "./config/ConfigEdit";
import { ConfigShow } from "./config/ConfigShow";
import { ChatList } from "./chat/ChatList";
import { ChatCreate } from "./chat/ChatCreate";
import { ChatEdit } from "./chat/ChatEdit";
import { ChatShow } from "./chat/ChatShow";
import { SessionList } from "./session/SessionList";
import { SessionCreate } from "./session/SessionCreate";
import { SessionEdit } from "./session/SessionEdit";
import { SessionShow } from "./session/SessionShow";

const App = (): React.ReactElement => {
  const [dataProvider, setDataProvider] = useState<DataProvider | null>(null);
  useEffect(() => {
    buildGraphQLProvider
      .then((provider: any) => {
        setDataProvider(() => provider);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);
  if (!dataProvider) {
    return <div>Loading</div>;
  }
  return (
    <div className="App">
      <Admin
        title={"AruCare"}
        dataProvider={dataProvider}
        authProvider={basicHttpAuthProvider}
        theme={theme}
        dashboard={Dashboard}
        loginPage={Login}
      >
        <Resource
          name="User"
          list={UserList}
          edit={UserEdit}
          create={UserCreate}
          show={UserShow}
        />
        <Resource
          name="Doctor"
          list={DoctorList}
          edit={DoctorEdit}
          create={DoctorCreate}
          show={DoctorShow}
        />
        <Resource
          name="Secretary"
          list={SecretaryList}
          edit={SecretaryEdit}
          create={SecretaryCreate}
          show={SecretaryShow}
        />
        <Resource
          name="Appointment"
          list={AppointmentList}
          edit={AppointmentEdit}
          create={AppointmentCreate}
          show={AppointmentShow}
        />
        <Resource
          name="Service"
          list={ServiceList}
          edit={ServiceEdit}
          create={ServiceCreate}
          show={ServiceShow}
        />
        <Resource
          name="Config"
          list={ConfigList}
          edit={ConfigEdit}
          create={ConfigCreate}
          show={ConfigShow}
        />
        <Resource
          name="Chat"
          list={ChatList}
          edit={ChatEdit}
          create={ChatCreate}
          show={ChatShow}
        />
        <Resource
          name="Session"
          list={SessionList}
          edit={SessionEdit}
          create={SessionCreate}
          show={SessionShow}
        />
      </Admin>
    </div>
  );
};

export default App;
