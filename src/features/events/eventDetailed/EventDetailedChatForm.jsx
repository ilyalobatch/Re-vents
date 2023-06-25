// Semantic UI components
import { Loader } from "semantic-ui-react";

// library
import { Formik, Form, Field } from "formik";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

// helpers
import { addEventChatComment } from "../../../app/firestore/firebaseService";

function EventDetailedChatForm({ eventId, parentId, closeForm }) {
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={{ comment: "" }}
      validationSchema={Yup.object({
        comment: Yup.string().required(),
      })}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          await addEventChatComment(eventId, { ...values, parentId });
          resetForm();
        } catch (error) {
          toast.error(error.message);
        } finally {
          setSubmitting(false);
          closeForm();
        }
      }}
    >
      {({ isSubmitting, handleSubmit, isValid }) => (
        <Form className="ui form">
          <Field name="comment">
            {({ field }) => (
              <div style={{ position: "relative" }}>
                <Loader active={isSubmitting} />
                <textarea
                  rows="2"
                  {...field}
                  placeholder={t("event.chat.textareaHint")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.shiftKey) return;
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      isValid && handleSubmit();
                    }
                  }}
                />
              </div>
            )}
          </Field>
        </Form>
      )}
    </Formik>
  );
}

export default EventDetailedChatForm;
