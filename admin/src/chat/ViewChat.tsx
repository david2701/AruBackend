import * as React from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery, useMutation } from "react-query";
import { Formik } from "formik";
import pick from "lodash.pick";

import {
  Form,
  EnumFormStyle,
  Button,
  FormHeader,
  Snackbar,
  EnumButtonStyle,
  TextField,
} from "@amplication/design-system";

import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { DoctorSelect } from "../doctor/DoctorSelect";
import { UserSelect } from "../user/UserSelect";
import { Chat as TChat } from "../api/chat/Chat";
import { ChatUpdateInput } from "../api/chat/ChatUpdateInput";

export const ViewChat = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/chats/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TChat,
    AxiosError,
    [string, string]
  >(["get-/api/chats", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/chats"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TChat, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/chats"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//chats");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TChat, AxiosError, ChatUpdateInput>(async (data) => {
    const response = await api.patch(`${"/api/chats"}/${id}`, data);
    return response.data;
  });

  const handleSubmit = React.useCallback(
    (values: ChatUpdateInput) => {
      void update(values);
    },
    [update]
  );

  useBreadcrumbs(match?.url, data?.message);

  const handleDelete = React.useCallback(() => {
    void deleteEntity();
  }, [deleteEntity]);

  const errorMessage =
    updateError?.response?.data?.message || error?.response?.data?.message;

  const initialValues = React.useMemo(
    () => pick(data, ["idDoctor", "idUser", "message"]),
    [data]
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <>
      {data && (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form
            formStyle={EnumFormStyle.Horizontal}
            formHeaderContent={
              <FormHeader
                title={`${"Chat"} ${
                  data?.message && data?.message.length
                    ? data.message
                    : data?.id
                }`}
              >
                <Button
                  type="button"
                  disabled={updateIsLoading}
                  buttonStyle={EnumButtonStyle.Secondary}
                  icon="trash_2"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
                <Button type="submit" disabled={updateIsLoading}>
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
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
