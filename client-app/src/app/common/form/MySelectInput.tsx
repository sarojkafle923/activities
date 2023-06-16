import { DropdownItemProps, Form, Label, Select } from "semantic-ui-react";

import React from "react";
import { useField } from "formik";

interface Props {
  placeholder: string;
  name: string;
  options: DropdownItemProps[];
  label?: string;
}

export const MySelectInput: React.FC<Props> = props => {
  const [field, meta, helpers] = useField(props.name);
  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
      <Select
        clearable
        options={props.options}
        value={field.value || null}
        onChange={(e, d) => helpers.setValue(d.value)}
        onBlur={() => helpers.setTouched(true)}
        placeholder={props.placeholder}
      />
      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  );
};
