// Semantic UI components
import { Modal } from "semantic-ui-react";

// library
import { useDispatch } from "react-redux";

// helpers
import { closeModal } from "./modalReducer";

function ModalWrapper({ children, size, header }) {
  const dispatch = useDispatch();

  return (
    <Modal open={true} onClose={() => dispatch(closeModal())} size={size}>
      {header && <Modal.Header>{header}</Modal.Header>}
      <Modal.Content>{children}</Modal.Content>
    </Modal>
  );
}

export default ModalWrapper;
