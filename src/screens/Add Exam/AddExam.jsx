import React from "react";
import BaseForm from "../../components/BaseForm/BaseForm.jsx";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../Firebase.jsx";
import { useNavigate } from "react-router-dom";

const AddExam = () => {
  const navigate = useNavigate();
  const examFields = [
    { label: "Exam Name", name: "name" },
    { label: "Subject", name: "subject" },
    { label: "Date", name: "date", type: "date" },
  ];

  const handleSubmit = async (data) => {
    console.log("Exam Data:", data);
    await addDoc(collection(db, "Exam Schedule"), data);

    setTimeout(() => {
      navigate("/examschedule");
    }, 1500);
  };
  return (
    <>
      <BaseForm
        title="Add Exam"
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
        toastValue="Exam Added"
        fields={examFields}
        initialValues={{}}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default AddExam;
