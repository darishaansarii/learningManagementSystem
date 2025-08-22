import * as React from "react";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../Firebase";
import { BaseTable } from "../../components/BaseTable/BaseTable";

const ViewAdmission = () => {
  const [dataArr, setDataArr] = React.useState([]);

  React.useEffect(() => {
    const unsub = onSnapshot(collection(db, "Admissions"), (snapshot) => {
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
      await deleteDoc(doc(db, "Admissions", id));
      console.log("Deleted:", id);
    } catch (err) {
      console.error("Error deleting document:", err);
    }
  };
  return (
    <>
      <BaseTable
        headers={["Name", "Email", "Class", "Field", "DOB", "Address", "Phone"]}
        keys={["name", "email", "class", "field", "dob", "address", "phone"]}
        rows={dataArr}
        onDelete={handleDelete}
        editPath="/editadmission"
        btnText="Admission"
        btnNavigatePath="/createadmission"
      />
    </>
  );
};

export default ViewAdmission;
