// Semantic UI components
import { Header, Icon } from "semantic-ui-react";

// library
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";

function PhotoWidgetDropzone({ setFiles }) {
  const { t } = useTranslation();

  const dropzoneStyles = {
    border: "3px dashed #eee",
    borderRadius: "5%",
    paddingTop: "30px",
    textAlign: "center",
    transition: "0.15s",
  };

  const dropzoneActive = {
    border: "3px dashed green",
  };

  const onDrop = useCallback(
    (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    [setFiles]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      style={
        isDragActive
          ? { ...dropzoneStyles, ...dropzoneActive }
          : { ...dropzoneStyles }
      }
    >
      <input {...getInputProps()} />
      <Icon name="upload" size="huge" />
      <Header content={t("profile.imageUploader.hint")} />
    </div>
  );
}

export default PhotoWidgetDropzone;
