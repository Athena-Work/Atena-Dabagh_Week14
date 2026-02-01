import { useEffect, useState } from "react";

//Style
import styles from "./editContactModal.module.css";

const EditContactModal = ({ contact, onCancel, onSave }) => {
  const [error, setError] = useState({
    name: "",
    email: "",
    job: "",
    phone: "",
    all: "",
  });

  const [form, setForm] = useState({
    name: "",
    email: "",
    job: "",
    phone: "",
  });

  useEffect(() => {
    if (!contact) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setForm({
      name: contact.name || "",
      email: contact.email || "",
      job: contact.job || "",
      phone: contact.phone || "",
    });

    setError({
      name: "",
      email: "",
      job: "",
      phone: "",
      all: "",
    });
  }, [contact]);

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    setError((prev) => ({ ...prev, [name]: "" }));
    setError((prev) => ({ ...prev, all: "" }));
  };

  const saveHandler = () => {
    const nameTrim = form.name.trim();
    const emailTrim = form.email.trim();
    const jobTrim = form.job.trim();
    const phoneTrim = form.phone.trim();

    const newErrors = {
      name: "",
      email: "",
      job: "",
      phone: "",
      all: "",
    };

    if (!nameTrim) {
      newErrors.name = "The name and last name field is empty...";
      setError(newErrors);
      return;
    } else if (nameTrim.length < 7) {
      newErrors.name = "the number of character should more than 7...";
      setError(newErrors);
      return;
    }

    if (!emailTrim.includes("@")) {
      newErrors.email = "Write correct email...";
      setError(newErrors);
      return;
    } else if (!emailTrim) {
      newErrors.name = "The email field is empty...";
      setError(newErrors);
      return;
    }

    if (phoneTrim && phoneTrim.length < 11) {
      newErrors.phone = "enter the valid number... ";
      setError(newErrors);
      return;
    }

    onSave({
      ...contact,
      name: nameTrim,
      email: emailTrim,
      job: jobTrim,
      phone: phoneTrim,
    });
  };

  if (!contact) return null;

  return (
    <div className={styles.backdrop} onClick={onCancel}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3 className={styles.title}>Edit Contact</h3>

        <div className={styles.form}>
          <div className={styles.inputError}>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={changeHandler}
              placeholder="Enter Your First name And Last name..."
            />
            {error.name && <div className={styles.error}>{error.name}</div>}
          </div>

          <div className={styles.inputError}>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={changeHandler}
              placeholder="Enter Your Email..."
            />
            {error.email && <div className={styles.error}>{error.email}</div>}
          </div>

          <div className={styles.inputError}>
            <input
              type="text"
              name="job"
              value={form.job}
              onChange={changeHandler}
              placeholder="Enter Your Job... (optional)"
            />
            {error.job && <div className={styles.error}>{error.job}</div>}
          </div>

          <div className={styles.inputError}>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={changeHandler}
              placeholder="Enter your Phone Number... (optional)"
            />
            {error.phone && <div className={styles.error}>{error.phone}</div>}
          </div>

          {error.all && <div className={styles.error}>{error.all}</div>}
        </div>

        <div className={styles.actions}>
          <button type="button" className={styles.cancelBtn} onClick={onCancel}>
            Cancel
          </button>
          <button
            type="button"
            className={styles.saveBtn}
            onClick={saveHandler}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditContactModal;
