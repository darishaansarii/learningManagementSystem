import * as React from "react";
import { BaseTable } from "../../components/BaseTable/BaseTable";
import { db } from "../../Firebase";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";

export const ViewTeacher = () => {
  const [dataArr, setDataArr] = React.useState([]);

  React.useEffect(() => {
    const unsub = onSnapshot(collection(db, "Teachers"), (snapshot) => {
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
      await deleteDoc(doc(db, "Teachers", id));
      console.log("Deleted:", id);
    } catch (err) {
      console.error("Error deleting document:", err);
    }
  };
  return (
    <>
      <BaseTable
        headers={["Name", "Email", "Profile", "Class", "Subject"]}
        keys={["name", "email", "profile", "allocatedClass", "allocatedSubject"]}
        rows={dataArr}
        onDelete={handleDelete}
        editPath="/editteacher"
        btnText="Teacher"
        btnNavigatePath="/addteacher"
      />
    </>
  );
};
