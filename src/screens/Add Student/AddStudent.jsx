import React from "react";
import BaseForm from "../../components/BaseForm/BaseForm.jsx";
import {  doc, setDoc } from "firebase/firestore";
import { db } from "../../Firebase.jsx";
import { useNavigate } from "react-router-dom";

export const AddStudent = () => {
  const navigate = useNavigate();
  const studentFields = [
    { label: "Full Name", name: "name" },
    { label: "Email", name: "email", type: "email" },
    { label: "Field", name: "field" },
  ];

  const handleStudentSubmit = async(data) => {
    console.log("Student Data:", data);
    await setDoc(doc(db, "Students", data.email), data);


    setTimeout(() => {
      navigate("/viewstudent");
    }, 1500);
  };

  return (
    <>
    <BaseForm title="Add Student" radioOptions={{
          label: "Class",
          name: "class",
          options: [
            { label: "Class 9", value: "9" },
            { label: "Class 10", value: "10" },
            { label: "Class 11", value: "11" },
            { label: "Class 12", value: "12" },
          ],
        }} toastValue="Student Added" fields={studentFields} initialValues={{}} onSubmit={handleStudentSubmit} />    
    </>
  )
};

