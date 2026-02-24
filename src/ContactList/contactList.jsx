import { useState } from "react";

//Style
import Styles from "./contactList.module.css";

//Icon
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const ContactList = ({
  addContact,
  requestDelete,
  deleteCheckBox,
  setIdList,
  idList,
  requestEdit,
}) => {
  const [openMenuId, setopenMenuId] = useState(null);

  const detailHandler = (id) => {
    id === openMenuId ? setopenMenuId(null) : setopenMenuId(id);
  };

  const toggleSeleted = (id) => {
    setIdList((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <>
      <h3 className={Styles.listTitle}>CONTACT LIST</h3>

      {addContact?.length ? (
        <ul className={Styles.Container}>
          {addContact.map((contact) => (
            <li key={contact.id} className={Styles.contactItem}>
              <p>{contact.name}</p>
              <p>{contact.email}</p>

              <div
                className={Styles.btnContainer}
                onClick={() => detailHandler(contact.id)}>
                {openMenuId === contact.id ? (
                  <div className={Styles.btnDetails}>
                    <span>
                      <button
                        type="button"
                        className={Styles.editBtn}
                        onClick={(e) => {
                          e.stopPropagation();
                          requestEdit(contact.id);
                        }}>
                        Edit
                      </button>
                    </span>
                    <span>
                      <button
                        className={Styles.deleteBtn}
                        onClick={(e) => {
                          e.stopPropagation();
                          requestDelete(contact.id);
                        }}>
                        Delete
                      </button>
                    </span>
                  </div>
                ) : (
                  <button className={Styles.dotsbtn}>
                    <MoreHorizIcon sx={{ color: " #1565c0" }} />
                  </button>
                )}
              </div>

              {deleteCheckBox && (
                <input
                  type="checkbox"
                  onChange={() => toggleSeleted(contact.id)}
                  checked={idList.includes(contact.id)}
                />
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className={Styles.noResult}>No User Found...</p>
      )}
    </>
  );
};

export default ContactList;
