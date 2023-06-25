// Semantic UI components
import { FormField, Label } from "semantic-ui-react";

// library
import { useField, useFormikContext } from "formik";
import DatePicker from "react-datepicker";

// assets
import "react-datepicker/dist/react-datepicker.css";

function MyDateInput({ label, ...props }) {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(props);

  return (
    <FormField error={meta.touched && !!meta.error}>
      <label>{label}</label>
      <DatePicker
        {...field}
        {...props}
        selected={(field.value && new Date(field.value)) || null}
        onChange={(value) => setFieldValue(field.name, value)}
      />
      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error}
        </Label>
      ) : null}
    </FormField>
  );
}

export default MyDateInput;
