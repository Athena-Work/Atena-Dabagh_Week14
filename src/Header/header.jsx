//Style
import styles from "./header.module.css";

//Icons
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const Header = ({
  setSearch,
  setOpenAddContact,
  openAddContact,
  deleteCheckBox,
  handleBulkDeleteClick,
  idList,
}) => {
  return (
    <div>
      <div className={styles.Container}>
        <div className={styles.InputContainer}>
          <p className={styles.searchTitle}>Search Contact:</p>
          <input
            type="text"
            placeholder="Search by Name and Email... "
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className={styles.buttonContainer}>
          <button
            className={styles.addBtn}
            onClick={() => setOpenAddContact(!openAddContact)}
          >
            <AddIcon sx={{ color: "#1565c0" }} />
            <span style={{ color: "#1565c0" }}>
              {openAddContact ? "Close Add Contact" : "Add Contact"}
            </span>
          </button>
          <button className={styles.deleteBtn} onClick={handleBulkDeleteClick}>
            <DeleteIcon sx={{ color: "#1565c0" }} />
            <span style={{ color: "#1565c0" }}>
              {!deleteCheckBox
                ? "Select to Delete"
                : idList.length
                  ? "Delete Selected"
                  : "Cancel"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Header;
