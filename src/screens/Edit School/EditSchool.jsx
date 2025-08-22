import { doc, getDoc, updateDoc } from "firebase/firestore";
import BaseForm from "../../components/BaseForm/BaseForm";
import { db } from "../../Firebase";
import { useNavigate, useParams } from "react-router-dom";
import React, { useState } from "react";

const EditSchool = () => {
  const { id } = useParams();
  const [initialData, setInitialData] = useState({});
  const navigate = useNavigate();
  const schoolFields = [
    { label: "School Name", name: "name" },
    { label: "Principal", name: "principal" },
    { label: "Email", name: "email", type: "email" },
    { label: "Address", name: "address" },
  ];

  React.useEffect(() => {
    const fetchSchool = async () => {
      try {
        const docRef = doc(db, "Schools", id);
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
    fetchSchool();
  }, [id]);
  const handleSchoolSubmit = (data) => {
    console.log("Schools Data:", data);
    updateDoc(doc(db, "Schools", id), data);

    setTimeout(() => {
      navigate("/viewschool");
    }, 1500);
  };
  return (
    <>
      {initialData && (
        <BaseForm
          title="Edit School"
          fields={schoolFields}
          onSubmit={handleSchoolSubmit}
          initialValues={initialData}
          toastValue="School Updated"
        />
      )}
    </>
  );
};

export default EditSchool;
