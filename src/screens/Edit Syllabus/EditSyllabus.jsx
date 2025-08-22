import { doc, getDoc, updateDoc } from "firebase/firestore";
import BaseForm from "../../components/BaseForm/BaseForm";
import { db } from "../../Firebase";
import { useNavigate, useParams } from "react-router-dom";
import React, { useState } from "react";

const EditSyllabus = () => {
    const { id } = useParams();
      const [initialData, setInitialData] = useState({});
      const navigate = useNavigate();
      const syllabusFields = [
        { label: "Title", name: "title" },
        { label: "Class", name: "class" },
        { label: "Description", name: "description" },
      ];
    
      React.useEffect(() => {
        const fetchSyllabus = async () => {
          try {
            const docRef = doc(db, "Syllabus", id);
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
        fetchSyllabus();
      }, [id]);
      const handleSyllabusSubmit = (data) => {
        console.log("Syllabus Data:", data);
        updateDoc(doc(db, "Syllabus", id), data);
    
        setTimeout(() => {
          navigate("/syllabuslist");
        }, 1500);
      };
  return (
    <>
    {initialData && (
        <BaseForm
          title="Edit Syllabus"
          radioOptions={{
            label: "Status",
            name: "status",
            options: [
              { label: "Active", value: "active" },
              { label: "Inactive", value: "inactive" },
            ],
          }}
          fields={syllabusFields}
          onSubmit={handleSyllabusSubmit}
          initialValues={initialData}
          toastValue="Syllabus Updated"
        />
      )}
    </>
  )
}

export default EditSyllabus