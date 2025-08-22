import * as React from "react";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../Firebase";
import { BaseTable } from "../../components/BaseTable/BaseTable";

const ViewSubject = () => {
  const [dataArr, setDataArr] = React.useState([]);

  React.useEffect(() => {
    const unsub = onSnapshot(collection(db, "Subjects"), (snapshot) => {
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
      await deleteDoc(doc(db, "Subjects", id));
      console.log("Deleted:", id);
    } catch (err) {
      console.error("Error deleting document:", err);
    }
  };

  return (
    <>
      <BaseTable
        headers={["Name", "Code", "Type"]}
        keys={["name", "code", "type"]}
        rows={dataArr}
        onDelete={handleDelete}
        editPath="/editsubject"
        btnText="Subject"
        btnNavigatePath="/addsubject"
      />
    </>
  );
};

export default ViewSubject;
