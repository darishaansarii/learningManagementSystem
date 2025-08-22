import * as React from "react";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../Firebase";
import { BaseTable } from "../../components/BaseTable/BaseTable";

const SyllabusList = () => {
  const [dataArr, setDataArr] = React.useState([]);

  React.useEffect(() => {
    const unsub = onSnapshot(collection(db, "Syllabus"), (snapshot) => {
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
      await deleteDoc(doc(db, "Syllabus", id));
      console.log("Deleted:", id);
    } catch (err) {
      console.error("Error deleting document:", err);
    }
  };
  return (
    <>
      <BaseTable
        headers={["Title", "Class", "Description", "Status"]}
        keys={["title", "class", "description", "status"]}
        rows={dataArr}
        onDelete={handleDelete}
        editPath="/editsyllabus"
        btnText="Syllabus"
        btnNavigatePath="/createsyllabus"
        columnWidths={{ description: "40%" }}

      />
    </>
  );
};

export default SyllabusList;
