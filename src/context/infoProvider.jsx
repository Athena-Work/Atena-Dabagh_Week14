import { createContext, useEffect, useMemo, useState } from "react";
import api from "../services/config";

// eslint-disable-next-line react-refresh/only-export-components
export const ContactContext = createContext(null);

export default function ContactProvider({ children }) {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/contacts");
      setContacts(res.data);
    } catch (e) {
      console.log("Fetch contacts error:", e?.message, e?.response?.status);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const createContact = async (payload) => {
    const res = await api.post("/contacts", payload);
    setContacts((prev) => [...prev, res.data]);
    return res.data;
  };

  const deleteContact = async (id) => {
    await api.delete(`/contacts/${id}`);
    setContacts((prev) => prev.filter((c) => String(c.id) !== String(id)));
  };

  const updateContact = async (id, payload) => {
    const { id: _ignore, ...data } = payload;
    const res = await api.patch(`/contacts/${id}`, data);

    setContacts((prev) =>
      prev.map((c) => (String(c.id) === String(id) ? res.data : c))
    );
    return res.data;
  };

  const deleteManyContacts = async (ids) => {
    const normalized = ids.map(String);

    await Promise.all(normalized.map((id) => api.delete(`/contacts/${id}`)));

    setContacts((prev) =>
      prev.filter((c) => !normalized.includes(String(c.id)))
    );
  };

  const value = useMemo(
    () => ({
      contacts,
      loading,
      fetchContacts,
      createContact,
      deleteContact,
      updateContact,
      deleteManyContacts,
    }),
    [contacts, loading]
  );

  return (
    <ContactContext.Provider value={value}>{children}</ContactContext.Provider>
  );
}
