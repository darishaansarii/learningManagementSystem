import * as React from "react";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../Firebase";
import { BaseTable } from "../../components/BaseTable/BaseTable";

export const ViewStudent = () => {
  const [dataArr, setDataArr] = React.useState([]);

  React.useEffect(() => {
    const unsub = onSnapshot(collection(db, "Students"), (snapshot) => {
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
      await deleteDoc(doc(db, "Students", id));
      console.log("Deleted:", id);
    } catch (err) {
      console.error("Error deleting document:", err);
    }
  };

  return (
    <>
      <BaseTable
        headers={["Name", "Email", "Class", "Field"]}
        keys={["name", "email", "class", "field"]}
        rows={dataArr}
        onDelete={handleDelete}
        editPath="/editstudent"
        btnText="Student"
        btnNavigatePath="/addstudent"
      />

    </>
  );
};

