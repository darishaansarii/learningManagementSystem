import * as React from "react";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../Firebase";
import { BaseTable } from "../../components/BaseTable/BaseTable";

const ExamSchedule = () => {
  const [dataArr, setDataArr] = React.useState([]);

  React.useEffect(() => {
    const unsub = onSnapshot(collection(db, "Exam Schedule"), (snapshot) => {
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
      await deleteDoc(doc(db, "Exam Schedule", id));
      console.log("Deleted:", id);
    } catch (err) {
      console.error("Error deleting document:", err);
    }
  };
  return (
    <>
      <BaseTable
        headers={["Exam Name", "Class", "Subject", "Date"]}
        keys={["name", "class", "subject", "date"]}
        rows={dataArr}
        onDelete={handleDelete}
        editPath="/editexam"
        btnText="the Schedule of Exam"
        btnNavigatePath="/addexam"
      />
    </>
  );
};

export default ExamSchedule;
