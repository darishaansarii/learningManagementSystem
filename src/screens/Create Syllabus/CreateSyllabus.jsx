import React from "react";
import BaseForm from "../../components/BaseForm/BaseForm.jsx";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../Firebase.jsx";
import { useNavigate } from "react-router-dom";

const CreateSyllabus = () => {
  const navigate = useNavigate();
  const syllabusFields = [
    { label: "Title", name: "title" },
    { label: "Class/Grade", name: "class" },
    { label: "Description", name: "description" },
  ];

  const handleSyllabusSubmit = async (data) => {
    console.log("Syllabus:", data);
    await addDoc(collection(db, "Syllabus"), data);

    setTimeout(() => {
      navigate("/syllabuslist");
    }, 1500);
  };
  return (
    <>
      <BaseForm
        title="Create Syllabus"
        radioOptions={{
          label: "Status",
          name: "status",
          options: [
            { label: "Active", value: "active" },
            { label: "Inactive", value: "inactive" },
          ],
          defaultValue: "active",
        }}
        toastValue="Syllabus Added"
        fields={syllabusFields}
        initialValues={{}}
        onSubmit={handleSyllabusSubmit}
      />
    </>
  );
};

export default CreateSyllabus;
