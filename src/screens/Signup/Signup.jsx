import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import lms from "../../assets/LMS-img.jpg";
import React, { useRef, useState } from "react";
import styles from "../Login/Login.module.css";
import stylessheet from "./Signup.module.css";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../Firebase";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

export const Signup = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);
  const buttonRef = useRef(null);

  const handleKeyDown = (e, nextRef, isSubmit) => {
    if (e.key === "Enter") {
      e.preventDefault();
      isSubmit ? nextRef.current.click() : nextRef.current.focus();
    }
  };


  const handleSignup = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    const getToastPosition = () => {
      return window.innerWidth <= 800 ? "bottom-center" : "bottom-right";
    };
    
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        console.log("Signup successful: ", user);

        let userData = {
          name,
          email,
        };

        const uid = user.uid;
        await setDoc(doc(db, "Users", uid), userData);

        toast.success("Signup successfully!", {
          position: getToastPosition(),
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setTimeout(() => {
          navigate("/");
        }, 1500);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);

        toast.error(errorMessage, {
          position: getToastPosition(),
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  
  return (
    <>
      <Box className={`${stylessheet.container} ${styles.slideIn}`}>
        <img src={lms} className={styles.lms} alt="lms" />
        <form
          onSubmit={handleSignup}
          className={`${styles.form} ${stylessheet.formContainer}`}
          action=""
        >
          <Typography
            variant="h4"
            style={{ fontWeight: "bold", color: "#009e97" }}
          >
            Join Our LMS!
          </Typography>
          <TextField
            inputRef={input1Ref}
            onKeyDown={(e) => handleKeyDown(e, input2Ref)}
            onChange={(e) => setName(e.target.value)}
            sx={{
              "& label.Mui-focused": {
                color: "#009e97",
              },
              "& .MuiOutlinedInput-root": {
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
            label="Enter Name"
            variant="outlined"
            fullWidth
          />
          <TextField
            inputRef={input2Ref}
            onKeyDown={(e) => handleKeyDown(e, input3Ref)}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              "& label.Mui-focused": {
                color: "#009e97",
              },
              "& .MuiOutlinedInput-root": {
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
            label="Enter Email"
            variant="outlined"
            fullWidth
          />
          <FormControl fullWidth variant="outlined">
            <InputLabel
              sx={{
                "&.Mui-focused": {
                  color: "#009e97",
                },
              }}
              htmlFor="outlined-adornment-password"
            >
              Password
            </InputLabel>
            <OutlinedInput
              inputRef={input3Ref}
              onKeyDown={(e) => handleKeyDown(e, buttonRef, true)}
              onChange={(e) => setPassword(e.target.value)}
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "gray",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#009e97",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#009e97",
                },
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>

          <Button
            ref={buttonRef}
            type="submit"
            fullWidth
            variant="contained"
            style={{ backgroundColor: "#009e97", textTransform: "capitalize" }}
          >
            Sign up
          </Button>
          <p>
            Already have an account?{" "}
            <Link style={{ color: "#009e97" }} to="/">
              Login now
            </Link>
          </p>
        </form>
      </Box>
    </>
  );
};
