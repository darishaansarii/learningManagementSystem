import React, { useEffect, useState } from "react";
import BaseForm from "../../components/BaseForm/BaseForm.jsx";
import { doc, getDocs, collection, setDoc } from "firebase/firestore";
import { db } from "../../Firebase.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const FeeSubmission = () => {
  const navigate = useNavigate();
  const [feeStructures, setFeeStructures] = useState([]);
  const submissionFields = [
    { label: "Name", name: "name" },
    { label: "Email", name: "email", type: "email" },
    { label: "Lab Fee", name: "labFee" },
    { label: "Monthly Fee", name: "monthlyFee" },
    { label: "Add. Fee", name: "additionalFee" },
    { label: "Month", name: "month" },
  ];
  
  useEffect(()=> {
    try {
    fetchFeeStructure();

    } catch (error) {
      console.log(error);

    }
  }, []);

  const fetchFeeStructure = async () => {
    try {
      const snap = await getDocs(collection(db, "Fee Structure"));
      const arr = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log("All Fee Structures:", arr);
      setFeeStructures(arr);
    } catch (error) {
      console.error("Error fetching all fee structures:", error);
    }
  };

  const handleFeeSubmit = async (data) => {
    console.log("Fee Submission Data:", data);
  
    const selectedClassObj = feeStructures.find(f => f.class === data.class);
    console.log("Selected Class Object:", selectedClassObj);
  
    if (!selectedClassObj) {
      toast.error("No fee structure found for selected class!");
      return;
    }
  
    if (
      data.labFee === selectedClassObj.labFee &&
      data.monthlyFee === selectedClassObj.monthlyFee &&
      data.additionalFee === selectedClassObj.additionalFee
    ) {

      await setDoc(doc(db, "Fee Submission", data.email), data);
      toast.success("Fee Submitted Successfully!");

      setTimeout(()=>{
        navigate("/feevoucher")
      }, 1500)
    } else {
      toast.error("Entered fee does not match the structure!");
    }
  };

  
  return (
    <>
      <BaseForm
        title="Fee Submission"
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
        disableSuccessToast= {true}
        toastValue="Fee Submitted"
        fields={submissionFields}
        initialValues={{}}
        onSubmit={handleFeeSubmit}
      /> <br /><br /><br /><br />
    </>
  );
};

export default FeeSubmission;
