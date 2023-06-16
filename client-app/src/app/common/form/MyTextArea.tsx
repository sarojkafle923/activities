import { Form, Label } from "semantic-ui-react";

import { useField } from "formik";

interface Props {
  placeholder: string;
  name: string;
  rows?: number;
  label?: string;
}

export const MyTextArea: React.FC<Props> = props => {
  const [field, meta] = useField(props.name);
  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
      <textarea {...field} rows={props.rows ? props.rows : 3} {...props} />
      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  );
};
