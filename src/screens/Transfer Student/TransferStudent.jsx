import {
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./TransferStudent.module.css";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../Firebase";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { toast } from "react-toastify";

export const TransferStudent = () => {
  const reasonRef = React.useRef();
  const emailRef = React.useRef();
  const confirmBtnRef = React.useRef();
  const [email, setEmail] = useState();
  const [stdData, setStdData] = useState(null);
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSearch = async () => {
    if (!email) return;

    const docRef = doc(db, "Students", email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setStdData(docSnap.data());
      console.log("Student Data:", stdData);
    } else {
      console.log("No such student!");
      toast.error(`Invalid Email!`, {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const [openTransferForm, setOpenTransferForm] = useState(false);
  const [transferData, setTransferData] = useState({
    newClass: "",
    reason: "",
    email: "",
  });

  const handleTransfer = () => {
    setOpenTransferForm(true);
  };

  const handleConfirmTransfer = async () => {
    try {
      const { newClass, reason, email } = transferData;

      if (!newClass || !reason || !email) {
        toast.error("All fields are required!", {
          position: "bottom-right",
          autoClose: 2500,
          theme: "light",
        });
        return;
      }
      if (transferData.email === email) {
        console.log("Transfer Data:", transferData);
        await setDoc(doc(db, "Transfer Students", email), transferData);
        await updateDoc(doc(db, "Students", email), {
          class: transferData.newClass,
        });
        toast.success(`Student transferred successfully!`, {
          position: "bottom-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setOpenTransferForm(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(`Entered email did not match with existing students!`, {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  return (
    <>
      <Box className={styles.container}>
        <Box className={styles.textField}>
          <TextField
            fullWidth
            name="email"
            type="email"
            value={email}
            onChange={handleChange}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Enter Email..."
            InputLabelProps={{
              shrink: true,
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "30px 0 0 30px",
                "& fieldset": {
                  borderColor: "gray",
                },
                "&:hover fieldset": {
                  borderColor: "#009e97",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#009e97",
                },
              },
            }}
          />

          <Button
            variant="contained"
            onClick={handleSearch}
            sx={{
              borderRadius: "0 30px 30px 0",
              backgroundColor: "#009e97",
              textTransform: "none",
              padding: "14px 24px",
              fontSize: "16px",
              "&:hover": {
                backgroundColor: "#007f78",
              },
            }}
          >
            Search
          </Button>
        </Box>

        {stdData && (
          <Box mt={3}>
            <Card
              sx={{
                cursor: "pointer",
                maxWidth: 350,
                borderRadius: "16px",
                boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  boxShadow: "0px 0px 5px #009e97",
                  transform: "translateY(-5px) scale(1.02)",
                },
              }}
            >
              <CardContent>
                <Typography
                  sx={{
                    borderTop: "none",
                    borderBottom: "1px solid #009e97",
                    color: "#009e97",
                    fontWeight: "bold",
                    paddingBottom: "5px",
                  }}
                  variant="h5"
                >
                  {stdData.name}
                </Typography>

                <Typography
                  sx={{
                    lineHeight: "1rem",
                    border: "none",
                    textAlign: "start",
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#e7c137",
                  }}
                >
                  {stdData.class}
                  <sup>th </sup>
                  class
                </Typography>
                <Typography
                  sx={{
                    border: "none",
                    textAlign: "start",
                    fontSize: "14px",
                    color: "text.secondary",
                  }}
                >
                  {stdData.email} <br />
                  {stdData.field}
                </Typography>

                <Button
                  variant="outlined"
                  fullWidth
                  onClick={handleTransfer}
                  sx={{
                    color: "#009e97",
                    border: "1px solid #009e97",
                    "&:hover": {
                      backgroundColor: "#009e97",
                      color: "#fff",
                      border: "1px solid #007a74",
                    },
                  }}
                >
                  Transfer
                </Button>
              </CardContent>
            </Card>
            <Dialog
              sx={{ zIndex: "2001" }}
              open={openTransferForm}
              onClose={() => setOpenTransferForm(false)}
              fullWidth
              maxWidth="sm"
            >
              <DialogTitle sx={{ color: "#009e97", fontWeight: "bold" }}>
                Transfer Student
              </DialogTitle>
              <DialogContent>
                <FormControl component="fieldset" sx={{ marginY: 2 }}>
                  <FormLabel
                    component="legend"
                    sx={{
                      color: transferData.newClass ? "#009e97" : "gray",
                      "&.Mui-focused": {
                        color: transferData.newClass ? "#009e97" : "gray",
                      },
                    }}
                  >
                    Select New Class
                  </FormLabel>
                  <RadioGroup
                    row
                    value={transferData.newClass}
                    onChange={(e) =>
                      setTransferData({
                        ...transferData,
                        newClass: e.target.value,
                      })
                    }
                  >
                    <FormControlLabel
                      value="Class 9"
                      control={
                        <Radio
                          sx={{
                            "&.Mui-checked": { color: "#009e97" },
                          }}
                        />
                      }
                      label="Class 9"
                    />
                    <FormControlLabel
                      value="Class 10"
                      control={
                        <Radio
                          sx={{
                            "&.Mui-checked": { color: "#009e97" },
                          }}
                        />
                      }
                      label="Class 10"
                    />
                    <FormControlLabel
                      value="Class 11"
                      control={
                        <Radio
                          sx={{
                            "&.Mui-checked": { color: "#009e97" },
                          }}
                        />
                      }
                      label="Class 11"
                    />
                    <FormControlLabel
                      value="Class 12"
                      control={
                        <Radio
                          sx={{
                            "&.Mui-checked": { color: "#009e97" },
                          }}
                        />
                      }
                      label="Class 12"
                    />
                  </RadioGroup>
                </FormControl>
                <TextField
                  label="Reason for Transfer"
                  inputRef={reasonRef}
                  fullWidth
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      emailRef.current.focus();
                    }
                  }}
                  sx={{
                    "& .MuiInputLabel-root": {
                      color: "gray",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#009e97",
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "gray",
                      },
                      "&:hover fieldset": {
                        borderColor: "#009e90",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#009e97",
                      },
                    },
                  }}
                  margin="normal"
                  multiline
                  rows={3}
                  value={transferData.reason}
                  onChange={(e) =>
                    setTransferData({ ...transferData, reason: e.target.value })
                  }
                />
                <TextField
                  label="Email"
                  type="email"
                  inputRef={emailRef}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      confirmBtnRef.current.click();
                    }
                  }}
                  sx={{
                    "& .MuiInputLabel-root": {
                      color: "gray",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#009e97",
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "gray",
                      },
                      "&:hover fieldset": {
                        borderColor: "#009e90",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#009e97",
                      },
                    },
                  }}
                  fullWidth
                  margin="normal"
                  value={transferData.email}
                  onChange={(e) =>
                    setTransferData({
                      ...transferData,
                      email: e.target.value,
                    })
                  }
                />
              </DialogContent>
              <DialogActions sx={{ paddingBottom: "20px" }}>
                <Button
                  onClick={() => setOpenTransferForm(false)}
                  color="error"
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#009e97" }}
                  onClick={handleConfirmTransfer}
                  ref={confirmBtnRef}
                >
                  Confirm Transfer
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        )}
      </Box>
    </>
  );
};
