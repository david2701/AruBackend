import * as React from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { Formik } from "formik";
import {
  Form,
  EnumFormStyle,
  Button,
  FormHeader,
  Snackbar,
  TextField,
} from "@amplication/design-system";
import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { DoctorSelect } from "../doctor/DoctorSelect";
import { UserSelect } from "../user/UserSelect";
import { Chat as TChat } from "../api/chat/Chat";
import { ChatCreateInput } from "../api/chat/ChatCreateInput";

const INITIAL_VALUES = {} as ChatCreateInput;

export const CreateChat = (): React.ReactElement => {
  useBreadcrumbs("/chats/new", "Create Chat");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    TChat,
    AxiosError,
    ChatCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/chats", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/chats"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: ChatCreateInput) => {
      void create(values);
    },
    [create]
  );
  return (
    <>
      <Formik initialValues={INITIAL_VALUES} onSubmit={handleSubmit}>
        <Form
          formStyle={EnumFormStyle.Horizontal}
          formHeaderContent={
            <FormHeader title={"Create Chat"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        >
          <div>
            <DoctorSelect label="Id Doctor" name="idDoctor.id" />
          </div>
          <div>
            <UserSelect label="Id User" name="idUser.id" />
          </div>
          <div>
            <TextField label="Message" name="message" />
          </div>
        </Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
