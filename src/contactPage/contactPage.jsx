import { useContext, useEffect, useState } from "react";
import { ContactContext } from "../context/infoProvider";

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
  const {
    contacts,
    loading,
    deleteContact,
    deleteManyContacts,
    updateContact,
  } = useContext(ContactContext);

  const [search, setSearch] = useState("");
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

  const filteredContacts = contacts.filter((c) => {
    const q = (search || "").trim().toLowerCase();
    if (!q) return true;
    return (
      (c.name || "").toLowerCase().includes(q) ||
      (c.email || "").toLowerCase().includes(q)
    );
  });

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

  const confirmDelete = async () => {
    try {
      await deleteContact(pendingDeleteId);
      showToast("Contact deleted...");
    } catch (e) {
      console.log(e);
      showToast("Delete failed!");
    } finally {
      setIsDeleteModalOpen(false);
      setPendingDeleteId(null);
    }
  };

  const cancelBulk = () => setIsBulkDeleteModalOpen(false);

  const deleteBulk = async () => {
    const count = idList.length;

    try {
      await deleteManyContacts(idList);
      showToast(`${count} contact(s) deleted...`);
    } catch (e) {
      console.log(e);
      showToast("Bulk delete failed!");
    } finally {
      setIdList([]);
      setIsBulkDeleteModalOpen(false);
      setDeleteCheckBox(false);
    }
  };

  const requestEdit = (id) => {
    setPendingEditId(id);
    setIsEditModalOpen(true);
  };

  const cancelEdit = () => {
    setIsEditModalOpen(false);
    setPendingEditId(null);
  };

  const saveEdit = async (updatedContact) => {
    try {
      await updateContact(updatedContact.id, updatedContact);
      showToast("Contact updated...");
    } catch (e) {
      console.log(e);
      showToast("Update failed!");
    } finally {
      setIsEditModalOpen(false);
      setPendingEditId(null);
    }
  };

  const contactForEdit = contacts.find(
    (c) => String(c.id) === String(pendingEditId)
  );

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

      {loading && <p style={{ padding: 12 }}>Loading...</p>}

      <AddContact openAddContact={openAddContact} />

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
