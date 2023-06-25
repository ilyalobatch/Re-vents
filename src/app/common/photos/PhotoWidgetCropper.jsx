// library
import { useRef } from "react";
import Cropper from "react-cropper";

// assets
import "cropperjs/dist/cropper.css";

function PhotoWidgetCropper({ setCropper, imagePreview }) {
  const cropperRef = useRef(null);

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
      crop={() => setCropper(cropperRef.current.cropper)}
    />
  );
}

export default PhotoWidgetCropper;
