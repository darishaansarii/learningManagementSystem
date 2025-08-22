import React, { useEffect, useState } from "react";
import { Box, Typography, Divider } from "@mui/material";
import styles from "../../components/BaseForm/BaseForm.module.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Firebase";

const FeeVoucher = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      const snap = await getDocs(collection(db, "Fee Submission"));
      const arr = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setSubmissions(arr);
    };
    fetchSubmissions();
  }, []);
  return (
    <>
      <Box className={styles.baseForm} sx={{ paddingBottom: "40px" }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", color: "#009e97", mb: 3 }}
        >
          Fee Vouchers
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 3,
          }}
        >
          {submissions.map((data) => (
            <Box
              key={data.id}
              sx={{
                border: "1px solid #e0e0e0",
                borderRadius: 3,
                p: 3,
                boxShadow: 2,
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "scale(1.03)",
                  boxShadow: "0px 8px 20px rgba(0, 158, 151, 0.3)",
                },
                backgroundColor: "#fff",
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#009e97", mb: 1 }}
              >
                {data.name} -{" "}
                <span style={{ color: "#e7c137" }}>Class {data.class}</span>
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Typography
                  sx={{ fontWeight: "500", color: "#333", border: "none" }}
                >
                  Lab Fee
                </Typography>
                <Typography
                  sx={{ fontWeight: "500", color: "#333", border: "none" }}
                >
                  {data.labFee}
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Typography
                  sx={{ fontWeight: "500", color: "#333", border: "none" }}
                >
                  Monthly Fee
                </Typography>
                <Typography
                  sx={{ fontWeight: "500", color: "#333", border: "none" }}
                >
                  {data.monthlyFee}
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Typography
                  sx={{ fontWeight: "500", color: "#333", border: "none" }}
                >
                  Additional Fee
                </Typography>
                <Typography
                  sx={{ fontWeight: "500", color: "#333", border: "none" }}
                >
                  {data.additionalFee}
                </Typography>
              </Box>

              <Divider sx={{ my: 1 }} />

              <Box>
                <Typography
                  sx={{ fontWeight: "bold", color: "#009e97", border: "none" }}
                >
                  Month: {data.month} <br /> Email: {data.email}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default FeeVoucher;
