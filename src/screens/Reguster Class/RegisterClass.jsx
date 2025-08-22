import React from 'react'
import BaseForm from "../../components/BaseForm/BaseForm.jsx";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../Firebase.jsx";
import { useNavigate } from "react-router-dom";

const RegisterClass = () => {
  const navigate = useNavigate();
    const classFields = [
        { label: "Class Name", name: "className" },
        { label: "Class Code", name: "classCode" },
        { label: "Section", name: "section" },
        { label: "Academic Year", name: "year" },
    ];
  
    const handleClassSubmit = async (data) => {
      console.log("Classes:", data);
      await addDoc(collection(db, "Classes"), data);
  
      setTimeout(() => {
        navigate("/allclass");
      }, 1500);
    };
  return (
    <>
    <BaseForm
        title="Register Class"
        radioOptions={{
          label: "Status",
          name: "status",
          options: [
            { label: "Active", value: "active" },
            { label: "Inactive", value: "inactive" },
          ],
          defaultValue: "active",
        }}
        toastValue="Class Registered"
        fields={classFields}
        initialValues={{}}
        onSubmit={handleClassSubmit}
      />
    </>
  )
}

export default RegisterClass