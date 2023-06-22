import "cropperjs/dist/cropper.css";

import { Cropper } from "react-cropper";

interface Props {
  setCropper: (cropper: Cropper) => void;
  imagePreview: string;
}

export const PhotoWidgetCropper: React.FC<Props> = ({
  setCropper,
  imagePreview,
}) => {
  return (
    <Cropper
      src={imagePreview}
      style={{ height: 200, width: "100%" }}
      initialAspectRatio={1}
      aspectRatio={1}
      preview=".img-preview"
      guides={false}
      viewMode={1}
      autoCropArea={1}
      background={false}
      onInitialized={cropper => setCropper(cropper)}
    />
  );
};
