import Styles from "./deleteContactsModal.module.css";

const DeleteContactsModal = ({ deleteBulk, cancelBulk }) => {
  return (
    <div className={Styles.backdrop} onClick={cancelBulk}>
      <div className={Styles.Container} onClick={(e) => e.stopPropagation()}>
        <div className={Styles.textContainer}>
          <p className={Styles.modalText}>You are deleting this users</p>
          <p className={Styles.modalText}>Are you sure?</p>
        </div>

        <div className={Styles.buttonContainer}>
          <button
            type="button"
            className={Styles.cancelButton}
            onClick={cancelBulk}
          >
            Cancel
          </button>
          <button
            type="button"
            className={Styles.deleteButton}
            onClick={deleteBulk}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteContactsModal;
