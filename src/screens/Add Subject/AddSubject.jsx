import React from "react";
import BaseForm from "../../components/BaseForm/BaseForm.jsx";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../Firebase.jsx";
import { useNavigate } from "react-router-dom";

const AddSubject = () => {
  const navigate = useNavigate();
  const subjectFields = [
    { label: "Subject Name", name: "name" },
    { label: "Subject Code", name: "code" },
  ];

  const handleSubjectSubmit = async (data) => {
    console.log("Subjects:", data);
    await addDoc(collection(db, "Subjects"), data);

    setTimeout(() => {
      navigate("/viewsubject");
    }, 1500);
  };

  return (
    <>
      <BaseForm
        title="Add Subject"
        radioOptions={{
          label: "Type",
          name: "type",
          options: [
            { label: "Compulsory", value: "compulsory" },
            { label: "Elective", value: "elective" },
          ],
          defaultValue: "compulsory",
        }}
        toastValue="Subject Added"
        fields={subjectFields}
        initialValues={{}}
        onSubmit={handleSubjectSubmit}
      />
    </>
  );
};

export default AddSubject;
