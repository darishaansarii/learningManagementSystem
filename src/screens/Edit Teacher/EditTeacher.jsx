import { doc, getDoc, updateDoc } from "firebase/firestore";
import BaseForm from "../../components/BaseForm/BaseForm";
import { db } from "../../Firebase";
import { useNavigate, useParams } from "react-router-dom";
import React, { useState } from "react";

const EditTeacher = () => {
    const { id } = useParams();
  const [initialData, setInitialData] = useState({});
  const navigate = useNavigate();
  const teacherFields = [
    { label: "Full Name", name: "name" },
    { label: "Email", name: "email", type: "email" },
    { label: "Profile", name: "profile" },
    { label: "Subject", name: "allocatedSubject" },

  ];

  React.useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const docRef = doc(db, "Teachers", id);
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
    fetchTeacher();
  }, [id]);
  const handleTeacherSubmit = (data) => {
    console.log("Teacher Data:", data);
    updateDoc(doc(db, "Teachers", id), data);

    setTimeout(() => {
      navigate("/viewteacher");
    }, 1500);
  };
  return (
    <>
    {initialData && (
        <BaseForm
          title="Edit Teacher"
          fields={teacherFields}
          radioOptions={{
            label: "Classes",
            name: "allocatedClass",
            options: [
              { label: "Class 9", value: "Class 9" },
              { label: "Class 10", value: "Class 10" },
              { label: "Class 11", value: "Class 11" },
              { label: "Class 12", value: "Class 12" },
            ],
          }}
          onSubmit={handleTeacherSubmit}
          initialValues={initialData}
          toastValue="Teacher Updated"
        />
      )}</>
  )
}

export default EditTeacher