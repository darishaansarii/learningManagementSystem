import * as React from "react";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../Firebase";
import { BaseTable } from "../../components/BaseTable/BaseTable";

const ViewSchool = () => {
  const [dataArr, setDataArr] = React.useState([]);

  React.useEffect(() => {
    const unsub = onSnapshot(collection(db, "Schools"), (snapshot) => {
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
      await deleteDoc(doc(db, "Schools", id));
      console.log("Deleted:", id);
    } catch (err) {
      console.error("Error deleting document:", err);
    }
  };

  return (
    <>
      <BaseTable
        headers={["Name", "Email", "Address", "Principal"]}
        keys={["name", "email", "address", "principal"]}
        rows={dataArr}
        onDelete={handleDelete}
        editPath="/editschool"
        btnText="School"
        btnNavigatePath="/schoolregistration"
      />
    </>
  );
};

export default ViewSchool;
