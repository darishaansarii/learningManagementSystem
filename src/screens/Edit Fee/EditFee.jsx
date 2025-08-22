import { doc, getDoc, updateDoc } from "firebase/firestore";
import BaseForm from "../../components/BaseForm/BaseForm";
import { db } from "../../Firebase";
import { useNavigate, useParams } from "react-router-dom";
import React, { useState } from "react";

const EditFee = () => {
  const { id } = useParams();
  const [initialData, setInitialData] = useState({});
  const navigate = useNavigate();
  const feeFields = [
    { label: "Lab Fee", name: "labFee" },
    { label: "Monthly Fee", name: "monthlyFee" },
    { label: "Additional Fee", name: "additionalFee" },
  ];

  React.useEffect(() => {
    const fetchFee = async () => {
      try {
        const docRef = doc(db, "Fee Structure", id);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setInitialData(snap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching fee structure:", error);
      }
    };
    fetchFee();
  }, [id]);
  const handleFeeSubmit = (data) => {
    console.log("Fee Structure Data:", data);
    updateDoc(doc(db, "Fee Structure", id), data);

    setTimeout(() => {
      navigate("/feestructure");
    }, 1500);
  };
  return (
    <>
      {initialData && (
        <BaseForm
          title="Edit Fee Structure"
          fields={feeFields}
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
          onSubmit={handleFeeSubmit}
          initialValues={initialData}
          toastValue="Fee Structure Updated"
        />
      )}
    </>
  );
};

export default EditFee;
