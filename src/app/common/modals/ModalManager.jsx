import { useSelector } from "react-redux";
import TestModal from "../../../features/sandbox/TestModal";
import LoginForm from "../../../features/auth/LoginForm";

const ModalManager = () => {
  const modalLookup = {
    TestModal,
    LoginForm,
  };
  const currentModal = useSelector((state) => state.modals);
  let renderedModal = null;
  if (currentModal) {
    const { modalType, modalProps } = currentModal;
    const ModalComponent = modalLookup[modalType];
    renderedModal = <ModalComponent {...modalProps} />;
  }

  return <span>{renderedModal}</span>;
};

export default ModalManager;
