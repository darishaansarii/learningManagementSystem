import { doc, getDoc, updateDoc } from "firebase/firestore";
import BaseForm from "../../components/BaseForm/BaseForm";
import { db } from "../../Firebase";
import { useNavigate, useParams } from "react-router-dom";
import React, { useState } from "react";

const EditResult = () => {
  const { id } = useParams();
  const [initialData, setInitialData] = useState({});
  const navigate = useNavigate();
  const resultFields = [
    { label: "Student Name", name: "name" },
    { label: "Subject", name: "subject" },
    { label: "Marks", name: "marks" },
    { label: "Email", name: "email", type: "email" },
    { label: "Field", name: "field" },
  ];

  React.useEffect(() => {
    const fetchResult = async () => {
      try {
        const docRef = doc(db, "Exam Results", id);
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
    fetchResult();
  }, [id]);
  const handleSubmit = (data) => {
    console.log("Result Data:", data);
    updateDoc(doc(db, "Exam Results", id), data);

    setTimeout(() => {
      navigate("/examresult");
    }, 1500);
  };
  return (
    <>
      {initialData && (
        <BaseForm
          title="Edit Result"
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
          fields={resultFields}
          onSubmit={handleSubmit}
          initialValues={initialData}
          toastValue="Result Updated"
        />
      )}
    </>
  );
};

export default EditResult;
