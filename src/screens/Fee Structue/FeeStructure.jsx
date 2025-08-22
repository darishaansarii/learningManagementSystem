import * as React from "react";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../Firebase";
import { BaseTable } from "../../components/BaseTable/BaseTable";

const FeeStructure = () => {
  const [dataArr, setDataArr] = React.useState([]);

  React.useEffect(() => {
    const unsub = onSnapshot(collection(db, "Fee Structure"), (snapshot) => {
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
      await deleteDoc(doc(db, "Fee Structure", id));
      console.log("Deleted:", id);
    } catch (err) {
      console.error("Error deleting document:", err);
    }
  };
  return (
    <>
      <BaseTable
        headers={["Class",  "Lab Fee", "Monthly Fee", "Add. Fee"]}
        keys={["class" , "labFee", "monthlyFee", "additionalFee"]}
        rows={dataArr}
        onDelete={handleDelete}
        editPath="/editfee"
        btnText="Fee Structure"
        btnNavigatePath="/addFee"
      />
    </>
  );
};

export default FeeStructure;
