import { doc, getDoc, updateDoc } from "firebase/firestore";
import BaseForm from "../../components/BaseForm/BaseForm";
import { db } from "../../Firebase";
import { useNavigate, useParams } from "react-router-dom";
import React, { useState } from "react";

export const EditStudent = () => {
  const { id } = useParams();
  const [initialData, setInitialData] = useState({});
  const navigate = useNavigate();
  const studentFields = [
    { label: "Full Name", name: "name" },
    { label: "Email", name: "email", type: "email" },
    { label: "Field", name: "field" },
  ];

  React.useEffect(() => {
    const fetchStudent = async () => {
      try {
        const docRef = doc(db, "Students", id);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setInitialData(snap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching student:", error);
      }
    };
    fetchStudent();
  }, [id]);
  const handleStudentSubmit = (data) => {
    console.log("Student Data:", data);
    updateDoc(doc(db, "Students", id), data);

    setTimeout(() => {
      navigate("/viewstudent");
    }, 1500);
  };
  return (
    <>
      {initialData && (
        <BaseForm
          title="Edit Student"
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
          fields={studentFields}
          onSubmit={handleStudentSubmit}
          initialValues={initialData}
          toastValue="Student Updated"
        />
      )}
    </>
  );
};
