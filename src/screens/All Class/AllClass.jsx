import * as React from "react";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../Firebase";
import { BaseTable } from "../../components/BaseTable/BaseTable";

const AllClass = () => {
  const [dataArr, setDataArr] = React.useState([]);

  React.useEffect(() => {
    const unsub = onSnapshot(collection(db, "Classes"), (snapshot) => {
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
      await deleteDoc(doc(db, "Classes", id));
      console.log("Deleted:", id);
    } catch (err) {
      console.error("Error deleting document:", err);
    }
  };
  return (
    <>
      <BaseTable
        headers={["Name", "Code", "Section", "Year", "Status"]}
        keys={["className", "classCode", "section", "year", "status"]}
        rows={dataArr}
        onDelete={handleDelete}
        editPath="/editclass"
        btnText="Class"
        btnNavigatePath="/registerclass"
      />
    </>
  );
};

export default AllClass;
