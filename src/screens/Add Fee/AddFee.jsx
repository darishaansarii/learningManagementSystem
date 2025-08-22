import React from "react";
import BaseForm from "../../components/BaseForm/BaseForm.jsx";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../Firebase.jsx";
import { useNavigate } from "react-router-dom";

const AddFee = () => {
  const navigate = useNavigate();
  const feeFields = [
    { label: "Lab fee", name: "labFee" },
    { label: "Monthly fee", name: "monthlyFee" },
    { label: "Additional Fee", name: "additionalFee" },
  ];

  const handleFeeSubmit = async (data) => {
    console.log("Fee Structure Data:", data);
    await setDoc(doc(db, "Fee Structure", data.class), data);

    setTimeout(() => {
      navigate("/feestructure");
    }, 1500);
  };

  return (
    <>
      <BaseForm
        title="Add Fee Structure"
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
        toastValue="Fee Structure Added"
        fields={feeFields}
        initialValues={{}}
        onSubmit={handleFeeSubmit}
      />
    </>
  );
};

export default AddFee;
