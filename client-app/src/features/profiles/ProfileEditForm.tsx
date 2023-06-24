import * as Yup from "yup";

import { Form, Formik } from "formik";

import { Button } from "semantic-ui-react";
import { MyTextArea } from "../../app/common/form/MyTextArea";
import { MyTextInput } from "../../app/common/form/MyTextInput";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";

interface Props {
  setEditMode: (editMode: boolean) => void;
}

export const ProfileEditForm: React.FC<Props> = observer(({ setEditMode }) => {
  const {
    profileStore: { profile, updateProfile },
  } = useStore();

  return (
    <Formik
      initialValues={{ displayName: profile?.displayName, bio: profile?.bio }}
      onSubmit={values => {
        updateProfile(values).then(() => {
          setEditMode(false);
        });
      }}
      validationSchema={Yup.object({
        displayName: Yup.string().required(),
      })}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form className="ui form">
          <MyTextInput name="displayName" placeholder="Display Name" />
          <MyTextArea rows={5} placeholder="Add your bio" name="bio" />
          <Button
            positive
            type="submit"
            content="Update profile"
            loading={isSubmitting}
            disabled={isSubmitting || !isValid || !dirty}
            floated="right"
          />
        </Form>
      )}
    </Formik>
  );
});
