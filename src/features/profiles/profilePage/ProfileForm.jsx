// Semantic UI components
import { Button } from "semantic-ui-react";

// Components
import MyTextArea from "../../../app/common/form/MyTextArea";
import MyTextInput from "../../../app/common/form/MyTextInput";

// library
import { Form, Formik } from "formik";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

// helpers
import { updateUserProfile } from "../../../app/firestore/firestoreService";

function ProfileForm({ profile }) {
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={{
        displayName: profile.displayName || "",
        description: profile.description || "",
      }}
      validationSchema={Yup.object({
        displayName: Yup.string().required(),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await updateUserProfile(values);
        } catch (error) {
          toast.error(error.message);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, dirty, isValid }) => (
        <Form className="ui form">
          <MyTextInput
            name="displayName"
            placeholder={t("profile.field.displayName")}
          />
          <MyTextArea
            name="description"
            placeholder={t("profile.field.description")}
          />
          <Button
            loading={isSubmitting}
            disabled={isSubmitting || !dirty || !isValid}
            floated="right"
            positive
            size="large"
            content={t("profile.button.updateProfile")}
          />
        </Form>
      )}
    </Formik>
  );
}

export default ProfileForm;
