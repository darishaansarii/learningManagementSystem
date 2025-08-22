import React from "react";
import BaseForm from "../../components/BaseForm/BaseForm.jsx";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../Firebase.jsx";
import { useNavigate } from "react-router-dom";

const SchoolRegistration = () => {
  const navigate = useNavigate();
    const schoolFields = [
      { label: "School Name", name: "name" },
      { label: "Principal", name: "principal" },
      { label: "Email", name: "email", type: "email" },
      { label: "Address", name: "address" },
    ];
  
    const handleSchoolSubmit = async(data) => {
      console.log("School Data:", data);
      await setDoc(doc(db, "Schools", data.email), data);
  
  
      setTimeout(() => {
        navigate("/viewschool");
      }, 1500);
    };
  return (
    <>
      <BaseForm
        title="School Registration"
        toastValue="School Registered"
        fields={schoolFields}
        initialValues={{}}
        onSubmit={handleSchoolSubmit}
      />
    </>
  );
};

export default SchoolRegistration;
