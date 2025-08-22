import * as React from "react";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../Firebase";
import { BaseTable } from "../../components/BaseTable/BaseTable";

const ExamResults = () => {
  const [dataArr, setDataArr] = React.useState([]);

  React.useEffect(() => {
    const unsub = onSnapshot(collection(db, "Exam Results"), (snapshot) => {
      let arr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDataArr(arr);
    });

    return () => unsub();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "Exam Results", id));
      console.log("Deleted:", id);
    } catch (err) {
      console.error("Error deleting document:", err);
    }
  };
  return (
    <>
      <BaseTable
        headers={["Name","Email", "Class", "Subject", "Marks"]}
        keys={["name", "email", "class", "subject", "marks"]}
        rows={dataArr}
        onDelete={handleDelete}
        editPath="/editresult"
        btnText="Exam Result"
        btnNavigatePath="/addresult"
      />
    </>
  );
};

export default ExamResults;
