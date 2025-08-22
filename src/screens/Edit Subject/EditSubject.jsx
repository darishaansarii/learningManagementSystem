import BaseForm from "../../components/BaseForm/BaseForm";
import { db } from "../../Firebase";
import { useNavigate, useParams } from "react-router-dom";
import React, { useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";


const EditSubject = () => {
     const { id } = useParams();
      const [initialData, setInitialData] = useState({});
      const navigate = useNavigate();
      const subjectFields = [
        { label: "Subject Name", name: "name" },
        { label: "Subject Code", name: "code" },
      ];
    
      React.useEffect(() => {
        const fetchSubject = async () => {
          try {
            const docRef = doc(db, "Subjects", id);
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
        fetchSubject();
      }, [id]);
      const handleSubjectSubmit = (data) => {
        console.log("Student Data:", data);
        updateDoc(doc(db, "Subjects", id), data);
    
        setTimeout(() => {
          navigate("/viewsubject");
        }, 1500);
      };
  return (
    <>
    {initialData && (
        <BaseForm
          title="Edit Subject"
          fields={subjectFields}
          onSubmit={handleSubjectSubmit}
          radioOptions={{
            label: "Type",
            name: "type",
            options: [
              { label: "Compulsory", value: "compulsory" },
              { label: "Elective", value: "elective" },
            ],
          }}
          initialValues={initialData}
          toastValue="Subject Updated"
        />
      )}
    </>
  )
}

export default EditSubject