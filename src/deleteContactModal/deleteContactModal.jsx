//Style
import Styles from "./deleteContactModal.module.css";

const DeleteContactModal = ({ onCancel, onDelete }) => {
  return (
    <div className={Styles.backdrop} onClick={onCancel}>
      <div className={Styles.Container} onClick={(e) => e.stopPropagation()}>
        <div className={Styles.textContainer}>
          <p className={Styles.modalText}>You are deleting this user...</p>
          <p className={Styles.modalText}>Are you sure?</p>
        </div>

        <div className={Styles.buttonContainer}>
          <button
            type="button"
            className={Styles.cancelButton}
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className={Styles.deleteButton}
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteContactModal;
