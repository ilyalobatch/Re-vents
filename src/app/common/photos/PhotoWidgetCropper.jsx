import React, { useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const PhotoWidgetCropper = ({ setImage, imagePreview }) => {
  const cropperRef = useRef(null);
  const onCrop = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;

    if (typeof cropper.getCroppedCanvas() === "undefined") {
      return;
    }

    cropper.getCroppedCanvas().toBlob((blob) => {
      setImage(blob);
    }, "image/jpeg");
  };

  return (
    <Cropper
      ref={cropperRef}
      src={imagePreview}
      style={{ height: 200, width: "100%" }}
      initialAspectRatio={1}
      preview=".img-preview"
      viewMode={1}
      dragMode="move"
      guides={false}
      scalable={true}
      cropBoxMovable={true}
      cropBoxResizable={true}
      crop={onCrop}
    />
  );
};

export default PhotoWidgetCropper;
