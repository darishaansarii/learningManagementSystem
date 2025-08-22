import React from "react";
import BaseForm from "../../components/BaseForm/BaseForm";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../../Firebase";

export const AddTeacher = () => {
  const navigate = useNavigate();
  const teacherFields = [
    { label: "Full Name", name: "name" },
    { label: "Email", name: "email", type: "email" },
    { label: "Profile", name: "profile" },
  ];

  const handleTeacherSubmit = async (data) => {
    console.log("Teacher Data:", data);
    await addDoc(collection(db, "Teachers"), data);

    setTimeout(() => {
      navigate("/viewteacher");
    }, 1500);
  };
  return (
    <>
      <BaseForm
        title="Add Teacher"
        toastValue="Teacher Added"
        fields={teacherFields}
        initialValues={{}}
        onSubmit={handleTeacherSubmit}
      />
    </>
  );
};
