import { doc, getDoc, updateDoc } from "firebase/firestore";
import BaseForm from "../../components/BaseForm/BaseForm";
import { db } from "../../Firebase";
import { useNavigate, useParams } from "react-router-dom";
import React, { useState } from "react";

const EditExam = () => {
  const { id } = useParams();
  const [initialData, setInitialData] = useState({});
  const navigate = useNavigate();
  const examFields = [
    { label: "Exam Name", name: "name" },
    { label: "Subject", name: "subject" },
    { label: "Date", name: "date", type: "date" },
  ];

  React.useEffect(() => {
    const fetchExam = async () => {
      try {
        const docRef = doc(db, "Exam Schedule", id);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setInitialData(snap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching exam schedule:", error);
      }
    };
    fetchExam();
  }, [id]);
  const handleSubmit = (data) => {
    console.log("Exam Schedule Data:", data);
    updateDoc(doc(db, "Exam Schedule", id), data);

    setTimeout(() => {
      navigate("/examschedule");
    }, 1500);
  };
  return (
    <>
      {initialData && (
        <BaseForm
          title="Edit Exam"
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
          fields={examFields}
          onSubmit={handleSubmit}
          initialValues={initialData}
          toastValue="Exam Updated"
        />
      )}
    </>
  );
};

export default EditExam;
