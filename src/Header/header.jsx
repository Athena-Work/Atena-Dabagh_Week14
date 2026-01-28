//Style
import styles from "./header.module.css";

//Icons
import AddIcon from "@mui/icons-material/Add";

const Header = () => {
  return (
    <div className={styles.Container}>
      <div className={styles.InputContainer}>
        <p className={styles.searchTitle}>Search Contact:</p>
        <input type="text" />
      </div>
      <div>
        <button className={styles.addBtn}>
          <AddIcon sx={{ color: "#7371fc" }} />
        </button>
      </div>
    </div>
  );
};
export default Header;
