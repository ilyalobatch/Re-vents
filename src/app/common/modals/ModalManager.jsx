// Components
import LoginForm from "../../../features/auth/LoginForm";
import RegisterForm from "../../../features/auth/RegisterForm";

// library
import { useSelector } from "react-redux";

function ModalManager() {
  const modalLookup = {
    LoginForm,
    RegisterForm,
  };
  const currentModal = useSelector((state) => state.modals);
  let renderedModal = null;
  if (currentModal) {
    const { modalType, modalProps } = currentModal;
    const ModalComponent = modalLookup[modalType];
    renderedModal = <ModalComponent {...modalProps} />;
  }

  return <span>{renderedModal}</span>;
}

export default ModalManager;
