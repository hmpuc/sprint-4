export interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Modal component, used to display a modal with a overlay and backdrop.
 * It includes a x button to close the modal.
 * @param children
 * @param isOpen
 * @param onClose
 */
const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose }) => {
  return (
    <div
      className={`fixed inset-0 w-full z-50 flex items-center justify-center 
        ${isOpen ? "block" : "hidden"}`}
    >
      <div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>
      <div className="modal-box relative bg-white py-6 px-12  rounded-lg shadow-lg z-10">
        <button
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
