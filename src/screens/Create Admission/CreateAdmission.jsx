import React from "react";
import BaseForm from "../../components/BaseForm/BaseForm.jsx";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../Firebase.jsx";
import { useNavigate } from "react-router-dom";

const CreateAdmission = () => {
  const navigate = useNavigate();
  const admissionFields = [
    { label: "Full Name", name: "name" },
    { label: "Date of birth", name: "dob", type: "date" },
    { label: "Address", name: "address" },
    { label: "Phone", name: "phone" },
    { label: "Email", name: "email", type: "email" },
    { label: "Field", name: "field" },
  ];

  const handleSubmit = async (data) => {
    console.log("Student Data:", data);
    await setDoc(doc(db, "Admissions", data.email), data);

    setTimeout(() => {
      navigate("/viewadmission");
    }, 1500);
  };
  return (
    <>
      <BaseForm
        title="Create Admissions"
        radioOptions={{
          label: "Class",
          name: "class",
          options: [
            { label: "Class 9", value: "9" },
            { label: "Class 10", value: "10" },
            { label: "Class 11", value: "11" },
            { label: "Class 12", value: "12" },
          ],
        }}
        toastValue="Admission Created"
        fields={admissionFields}
        initialValues={{}}
        onSubmit={handleSubmit}
      /> <br /><br /><br /><br />
    </>
  );
};

export default CreateAdmission;
