import { useEffect, useState } from "react";

// Components
import AddContact from "../AddContact/addContact";
import Header from "../Header/header";
import ContactList from "../ContactList/contactList";
import DeleteContactModal from "../deleteContactModal/deleteContactModal";
import DeleteContactsModal from "../deleteContactsModal/deleteContactsModal";
import EditContactModal from "../editContactModal/editContactModal";

// Style
import styles from "./contactPage.module.css";

const ContactPage = () => {
  const [search, setSearch] = useState("");
  const [addContact, setAddContact] = useState([]);
  const [openAddContact, setOpenAddContact] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  const [deleteCheckBox, setDeleteCheckBox] = useState(false);
  const [idList, setIdList] = useState([]);
  const [isBulkDeleteModalOpen, setIsBulkDeleteModalOpen] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [pendingEditId, setPendingEditId] = useState(null);

  const [toastOpen, setToastOpen] = useState(false);
  const [toastText, setToastText] = useState("");

  const showToast = (text) => {
    setToastText(text);
    setToastOpen(true);
  };

  useEffect(() => {
    if (!toastOpen) return;
    const t = setTimeout(() => setToastOpen(false), 2500);
    return () => clearTimeout(t);
  }, [toastOpen]);

  const filteredContacts = addContact.filter((c) => {
    const q = (search || "").trim().toLowerCase();
    if (!q) return true;
    return (
      c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q)
    );
  });

  // bulk delete button logic
  const handleBulkDeleteClick = () => {
    if (!deleteCheckBox) {
      setDeleteCheckBox(true);
      return;
    }

    if (idList.length === 0) {
      setDeleteCheckBox(false);
      setIdList([]);
      setIsBulkDeleteModalOpen(false);
      return;
    }

    setIsBulkDeleteModalOpen(true);
  };

  const requestDelete = (id) => {
    setPendingDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setPendingDeleteId(null);
  };

  const confirmDelete = () => {
    setAddContact((prev) => prev.filter((c) => c.id !== pendingDeleteId));
    setIsDeleteModalOpen(false);
    setPendingDeleteId(null);
    showToast("Contact deleted...");
  };

  const cancelBulk = () => setIsBulkDeleteModalOpen(false);

  const deleteBulk = () => {
    const count = idList.length;

    setAddContact((prev) => prev.filter((c) => !idList.includes(c.id)));
    setIdList([]);
    setIsBulkDeleteModalOpen(false);
    setDeleteCheckBox(false);

    showToast(`${count} contact(s) deleted...`);
  };

  const requestEdit = (id) => {
    setPendingEditId(id);
    setIsEditModalOpen(true);
  };

  const cancelEdit = () => {
    setIsEditModalOpen(false);
    setPendingEditId(null);
  };

  const saveEdit = (updatedContact) => {
    setAddContact((prev) =>
      prev.map((c) => (c.id === updatedContact.id ? updatedContact : c)),
    );
    setIsEditModalOpen(false);
    setPendingEditId(null);
    showToast("Contact updated...");
  };

  const contactForEdit = addContact.find((c) => c.id === pendingEditId);

  return (
    <div className={styles.Container}>
      <Header
        setSearch={setSearch}
        setOpenAddContact={setOpenAddContact}
        openAddContact={openAddContact}
        deleteCheckBox={deleteCheckBox}
        selectedCount={idList.length}
        handleBulkDeleteClick={handleBulkDeleteClick}
        idList={idList}
      />

      <AddContact
        setAddContact={setAddContact}
        openAddContact={openAddContact}
      />

      <ContactList
        addContact={filteredContacts}
        requestDelete={requestDelete}
        requestEdit={requestEdit}
        deleteCheckBox={deleteCheckBox}
        setIdList={setIdList}
        idList={idList}
      />

      {isBulkDeleteModalOpen && (
        <DeleteContactsModal deleteBulk={deleteBulk} cancelBulk={cancelBulk} />
      )}

      {isDeleteModalOpen && (
        <DeleteContactModal onCancel={cancelDelete} onDelete={confirmDelete} />
      )}

      {isEditModalOpen && (
        <EditContactModal
          contact={contactForEdit}
          onCancel={cancelEdit}
          onSave={saveEdit}
        />
      )}

      {toastOpen && (
        <div className={styles.toast} onClick={() => setToastOpen(false)}>
          {toastText}
        </div>
      )}
    </div>
  );
};

export default ContactPage;
