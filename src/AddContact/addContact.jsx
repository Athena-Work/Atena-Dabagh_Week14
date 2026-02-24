import { useContext, useEffect, useState } from "react";
import { ContactContext } from "../context/infoProvider";

// Style
import styles from "./addContact.module.css";

const AddContact = ({ openAddContact }) => {
  const { createContact } = useContext(ContactContext);

  const [toastOpen, setToastOpen] = useState(false);
  const [toastClosing, setToastClosing] = useState(false);
  const [toastText, setToastText] = useState("");

  const [error, setError] = useState({
    name: "",
    email: "",
    job: "",
    phone: "",
    all: "",
  });

  const [information, setInformation] = useState({
    name: "",
    email: "",
    job: "",
    phone: "",
  });

  const changeHandler = (e) => {
    const fieldName = e.target.name;
    const value = e.target.value;

    setInformation((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    setError((prev) => ({ ...prev, [fieldName]: "", all: "" }));
  };

  const showToast = (text) => {
    setToastText(text);
    setToastClosing(false);
    setToastOpen(true);
  };

  const closeToast = () => {
    setToastClosing(true);
    setTimeout(() => {
      setToastOpen(false);
      setToastClosing(false);
    }, 220);
  };

  useEffect(() => {
    if (!toastOpen) return;
    const t = setTimeout(() => closeToast(), 3000);
    return () => clearTimeout(t);
  }, [toastOpen]);

  const addHandler = async () => {
    const nameTrim = information.name.trim();
    const emailTrim = information.email.trim();
    const jobTrim = information.job.trim();
    const phoneTrim = information.phone.trim();

    const newErrors = {
      name: "",
      email: "",
      job: "",
      phone: "",
      all: "",
    };

    // Handle all inputs
    if (!nameTrim && !emailTrim && !phoneTrim && !jobTrim) {
      newErrors.all = "Fields are empty...";
      setError(newErrors);
      return;
    }

    // Name
    if (!nameTrim) {
      newErrors.name = "The name and last name field is empty...";
      setError(newErrors);
      return;
    } else if (nameTrim.length < 7) {
      newErrors.name = "Name must be at least 7 characters.";
      setError(newErrors);
      return;
    }

    // Email
    if (!emailTrim) {
      newErrors.email = "The email field is empty...";
      setError(newErrors);
      return;
    } else if (!emailTrim.includes("@")) {
      newErrors.email = "Write correct email...";
      setError(newErrors);
      return;
    }

    // Job
    if (!jobTrim) {
      newErrors.job = "The job field is Empty...";
      setError(newErrors);
      return;
    }

    // Phone
    if (!phoneTrim) {
      newErrors.phone = "The phone field is Empty...";
      setError(newErrors);
      return;
    } else if (phoneTrim.length < 11) {
      newErrors.phone = "enter the valid number... ";
      setError(newErrors);
      return;
    }

    // Create
    const newContact = {
      name: nameTrim,
      email: emailTrim,
      job: jobTrim,
      phone: phoneTrim,
    };

    try {
      await createContact(newContact);
      showToast("User added successfully!");
      setInformation({ name: "", email: "", job: "", phone: "" });
    } catch (e) {
      console.log("Create contact error:", e);
      showToast("Server error! Is json-server running?");
    }
  };

  return (
    openAddContact && (
      <div className={styles.Container}>
        <div className={styles.toastContainer}>
          {toastOpen && (
            <button
              type="button"
              onClick={closeToast}
              className={`${styles.ToastNotif} ${
                toastClosing ? styles.toastOut : styles.toastIn
              }`}>
              {toastText}
            </button>
          )}
        </div>

        <div className={styles.inputContainer}>
          <div className={styles.inputError}>
            <input
              type="text"
              name="name"
              value={information.name}
              onChange={changeHandler}
              placeholder="Enter Your First name And Last name..."
            />
            {error.name && <div className={styles.error}>{error.name}</div>}
          </div>

          <div className={styles.inputError}>
            <input
              type="email"
              name="email"
              value={information.email}
              onChange={changeHandler}
              placeholder="Enter Your Email..."
            />
            {error.email && <div className={styles.error}>{error.email}</div>}
          </div>

          <div className={styles.inputError}>
            <input
              type="text"
              name="job"
              value={information.job}
              onChange={changeHandler}
              placeholder="Enter Your Job..."
            />
            {error.job && <div className={styles.error}>{error.job}</div>}
          </div>

          <div className={styles.inputError}>
            <input
              type="tel"
              name="phone"
              value={information.phone}
              onChange={changeHandler}
              placeholder="Enter your Phone Number..."
            />
            {error.phone && <div className={styles.error}>{error.phone}</div>}
          </div>

          {error.all && <div className={styles.error}>{error.all}</div>}
        </div>

        <div className={styles.buttonConatiner}>
          <button onClick={addHandler}>Save</button>
        </div>
      </div>
    )
  );
};

export default AddContact;
