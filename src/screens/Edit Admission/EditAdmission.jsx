import { doc, getDoc, updateDoc } from "firebase/firestore";
import BaseForm from "../../components/BaseForm/BaseForm";
import { db } from "../../Firebase";
import { useNavigate, useParams } from "react-router-dom";
import React, { useState } from "react";

const EditAdmission = () => {
  const { id } = useParams();
  const [initialData, setInitialData] = useState({});
  const navigate = useNavigate();
  const admissionFields = [
    { label: "Full Name", name: "name" },
    { label: "Date of birth", name: "dob", type: "date" },
    { label: "Address", name: "address" },
    { label: "Phone", name: "phone" },
    { label: "Email", name: "email", type: "email" },
    { label: "Field", name: "field" },
  ];

  React.useEffect(() => {
    const fetchStudent = async () => {
      try {
        const docRef = doc(db, "Admissions", id);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setInitialData(snap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching admission:", error);
      }
    };
    fetchStudent();
  }, [id]);
  const handleSubmit = (data) => {
    console.log("Admission Data:", data);
    updateDoc(doc(db, "Admissions", id), data);

    setTimeout(() => {
      navigate("/viewadmission");
    }, 1500);
  };
  return (
    <>
      {initialData && (
        <BaseForm
          title="Edit Admission"
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
          fields={admissionFields}
          onSubmit={handleSubmit}
          initialValues={initialData}
          toastValue="Admission Updated"
        />
      )}
    </>
  );
};

export default EditAdmission;
