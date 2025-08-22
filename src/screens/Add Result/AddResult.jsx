import React from "react";
import BaseForm from "../../components/BaseForm/BaseForm.jsx";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../Firebase.jsx";
import { useNavigate } from "react-router-dom";

const AddResult = () => {
  const navigate = useNavigate();
  const resultFields = [
    { label: "Student Name", name: "name" },
    { label: "Subject", name: "subject" },
    { label: "Marks", name: "marks" },
    { label: "Email", name: "email", type: "email" },
    { label: "Field", name: "field" },
  ];

  const handleSubmit = async (data) => {
    console.log("Result Data:", data);
    await setDoc(doc(db, "Exam Results", data.email), data);

    setTimeout(() => {
      navigate("/examresult");
    }, 1500);
  };
  return (
    <>
      <BaseForm
        title="Add Result"
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
        toastValue="Result Added"
        fields={resultFields}
        initialValues={{}}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default AddResult;
