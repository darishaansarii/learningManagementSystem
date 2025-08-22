import { useNavigate } from "react-router-dom";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import React from "react";
import { db } from "../../Firebase.jsx";
import {
  Box,
  Button,
  Typography,
  FormControl,
  FormLabel,
  FormControlLabel,
  InputLabel,
  Select,
  MenuItem,
  Radio,
  RadioGroup,
} from "@mui/material";
import styles from "../../components/BaseForm/BaseForm.module.css";
import { toast } from "react-toastify";

export const TeacherAllocation = () => {
  const navigate = useNavigate();
  const [teachers, setTeachers] = React.useState([]);
  const [classes, setclasses] = React.useState([]);
  const [subjects, setSubjects] = React.useState([]);
  const [selectedTeacher, setSelectedTeacher] = React.useState("");
  const [selectedSubject, setSelectedSubject] = React.useState("");
  const [selectedClass, setSelectedClass] = React.useState("");

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  React.useEffect(() => {
    fetchTeachers();
    fetchClasses();
    fetchSubjects();
  }, []);

  const fetchTeachers = async () => {
    try {
      const snapshot = await getDocs(collection(db, "Teachers"));
      const teachersList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const notAllocated = teachersList.filter(
        (t) => !t.allocatedClass && !t.allocatedSubject
      );

      setTeachers(notAllocated);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  const fetchClasses = async () => {
    try {
      const snapshot = await getDocs(collection(db, "Classes"));
      const classesList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setclasses(classesList);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const fetchSubjects = async () => {
    try {
      const snapshot = await getDocs(collection(db, "Subjects"));
      const subjectsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSubjects(subjectsList);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  const handleTeacherChange = (event) => {
    setSelectedTeacher(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
  };

  console.log(selectedSubject);

  const handleAllocate = async () => {
    if (!selectedTeacher || !selectedClass || !selectedSubject) {
      toast.error(`All fields are required!`, {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    if (teacherInfo.allocatedClass || teacherInfo.allocatedSubject) {
      toast.error("This teacher is already allocated. Please edit instead.", {
        position: "bottom-right", 
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    const teacherInfo = teachers.find((t) => t.id === selectedTeacher);

    const teacherData = {
      allocatedClass: selectedClass,
      allocatedSubject: selectedSubject,
    };

    console.log(teacherData);

    try {
      await updateDoc(doc(db, "Teachers", selectedTeacher), teacherData);

      toast.success(`Teacher Allocated successfully!`, {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setTimeout(() => {
        navigate("/viewteacher");
      }, 1500);
    } catch (error) {
      console.error("Error allocating teacher:", error);
    }
  };

  return (
    <>
      <Box className={styles.baseForm}>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold" }}
          mb={2}
          color="teal"
        >
          Teacher Allocation
        </Typography>

        <FormControl fullWidth sx={{ mb: 3 }} variant="outlined">
          <InputLabel
            id="teacher-select-label"
            sx={{
              "&.Mui-focused": { color: "#009e97" },
            }}
          >
            Select Teacher
          </InputLabel>
          <Select
            labelId="teacher-select-label"
            value={selectedTeacher}
            onChange={handleTeacherChange}
            label="Select Teacher"
            sx={{
              borderRadius: 2,
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "teal" },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#009e97",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#009e97",
              },
            }}
          >
            <MenuItem value="" disabled>
              Select Teacher
            </MenuItem>
            {teachers.map((teacher) => (
              <MenuItem key={teacher.id} value={teacher.id}>
                {teacher.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mb: 3 }} variant="outlined">
          <InputLabel
            id="subject-select-label"
            sx={{
              "&.Mui-focused": { color: "#009e97" },
            }}
          >
            Select Subject
          </InputLabel>
          <Select
            labelId="subject-select-label"
            value={selectedSubject}
            onChange={handleSubjectChange}
            label="Select Subject"
            sx={{
              borderRadius: 2,
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "teal" },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#009e97",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#009e97",
              },
            }}
          >
            <MenuItem value="" disabled>
              Select Subject
            </MenuItem>
            {subjects.map((subject) => (
              <MenuItem key={subject.name} value={subject.name}>
                {subject.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ mt: 2 }}>
          <FormControl component="fieldset" variant="standard">
            <FormLabel
              component="legend"
              sx={{ color: "#009e97 !important", fontWeight: "bold" }}
            >
              Classes:
            </FormLabel>
            <RadioGroup row value={selectedClass} onChange={handleClassChange}>
              {classes.map((cls) => (
                <FormControlLabel
                  key={cls.classCode}
                  value={cls.className}
                  control={
                    <Radio
                      sx={{
                        color: "teal",
                        "&.Mui-checked": { color: "#009e97" },
                      }}
                    />
                  }
                  label={cls.className}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Box>

        <Button
          variant="contained"
          fullWidth
          onClick={handleAllocate}
          sx={{ backgroundColor: "#009e97", marginTop: "20px" }}
        >
          Allocate Teacher
        </Button>
      </Box>
    </>
  );
};
