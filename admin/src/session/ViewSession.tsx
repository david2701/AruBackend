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
import { Session as TSession } from "../api/session/Session";
import { SessionUpdateInput } from "../api/session/SessionUpdateInput";

export const ViewSession = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/sessions/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TSession,
    AxiosError,
    [string, string]
  >(["get-/api/sessions", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/sessions"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TSession, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/sessions"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//sessions");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TSession, AxiosError, SessionUpdateInput>(async (data) => {
    const response = await api.patch(`${"/api/sessions"}/${id}`, data);
    return response.data;
  });

  const handleSubmit = React.useCallback(
    (values: SessionUpdateInput) => {
      void update(values);
    },
    [update]
  );

  useBreadcrumbs(match?.url, data?.tokenId);

  const handleDelete = React.useCallback(() => {
    void deleteEntity();
  }, [deleteEntity]);

  const errorMessage =
    updateError?.response?.data?.message || error?.response?.data?.message;

  const initialValues = React.useMemo(() => pick(data, ["tokenId", "userId"]), [
    data,
  ]);

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
                title={`${"Session"} ${
                  data?.tokenId && data?.tokenId.length
                    ? data.tokenId
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
              <TextField label="Token ID" name="tokenId" />
            </div>
            <div>
              <TextField label="User ID" name="userId" />
            </div>
          </Form>
        </Formik>
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
