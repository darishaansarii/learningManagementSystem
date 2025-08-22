import { doc, getDoc, updateDoc } from "firebase/firestore";
import BaseForm from "../../components/BaseForm/BaseForm";
import { db } from "../../Firebase";
import { useNavigate, useParams } from "react-router-dom";
import React, { useState } from "react";

const EditClass = () => {
    const { id } = useParams();
          const [initialData, setInitialData] = useState({});
          const navigate = useNavigate();
          const classFields = [
            { label: "Class Name", name: "className" },
            { label: "Class Code", name: "classCode" },
            { label: "Section", name: "section" },
            { label: "Academic Year", name: "year" },
          ];
        
          React.useEffect(() => {
            const fetchClass = async () => {
              try {
                const docRef = doc(db, "Classes", id);
                const snap = await getDoc(docRef);
                if (snap.exists()) {
                  setInitialData(snap.data());
                } else {
                  console.log("No such document!");
                }
              } catch (error) {
                console.error("Error fetching Classes:", error);
              }
            };
            fetchClass();
          }, [id]);
          const handleClassSubmit = (data) => {
            console.log("Classes:", data);
            updateDoc(doc(db, "Classes", id), data);
        
            setTimeout(() => {
              navigate("/allclass");
            }, 1500);
          };
  return (
    <>
    {initialData && (
        <BaseForm
          title="Edit Class"
          fields={classFields}
          radioOptions={{
          label: "Status",
          name: "status",
          options: [
            { label: "Active", value: "active" },
            { label: "Inactive", value: "inactive" },
          ],
        }}
          onSubmit={handleClassSubmit}
          initialValues={initialData}
          toastValue="Class Updated"
        />
      )}
    </>
  )
}

export default EditClass