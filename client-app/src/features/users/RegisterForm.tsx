import * as yup from "yup";

import { Button, Header } from "semantic-ui-react";
import { ErrorMessage, Form, Formik } from "formik";

import { MyTextInput } from "../../app/common/form/MyTextInput";
import { ValidationError } from "../Errors/ValidationError";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";

export const RegisterForm = observer(() => {
  const { userStore } = useStore();
  return (
    <Formik
      initialValues={{
        displayName: "",
        username: "",
        email: "",
        password: "",
        error: null,
      }}
      onSubmit={(values, { setErrors }) =>
        userStore.register(values).catch(error => setErrors({ error }))
      }
      validationSchema={yup.object({
        displayName: yup.string().required(),
        username: yup.string().required(),
        email: yup.string().required().email(),
        password: yup.string().required(),
      })}
    >
      {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
        <Form
          className="ui form error"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <Header
            as="h2"
            content="Register to Event Manager"
            color="teal"
            textAlign="center"
          />
          <MyTextInput placeholder="Display Name" name="displayName" />
          <MyTextInput placeholder="Username" name="username" />
          <MyTextInput placeholder="Email" name="email" />
          <MyTextInput placeholder="password" name="password" type="password" />
          <ErrorMessage
            name="error"
            render={() => <ValidationError errors={errors.error} />}
          />
          <Button
            disabled={!isValid || !dirty || isSubmitting}
            loading={isSubmitting}
            positive
            content="Register"
            type="submit"
            fluid
          />
        </Form>
      )}
    </Formik>
  );
});
