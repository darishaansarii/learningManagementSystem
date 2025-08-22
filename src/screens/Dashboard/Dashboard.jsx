// import React, { useState, useEffect } from "react";
// import {
//   Typography,
//   Box,
//   useMediaQuery,
//   useTheme,
//   Divider,
// } from "@mui/material";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../../Firebase.jsx";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import styles from "./Dashboard.module.css";

// export const Dashboard = () => {
//   const userDataJSON = localStorage.getItem("userData");
//   const userData = JSON.parse(userDataJSON);
//   const theme = useTheme();
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

//   const [totals, setTotals] = useState({
//     students: 0,
//     teachers: 0,
//     exams: 0,
//     admissions: 0,
//     subjects: 0,
//   });

//   useEffect(() => {
//     const fetchCounts = async () => {
//       try {
//         const [
//           studentsSnap,
//           teachersSnap,
//           examsSnap,
//           admissionsSnap,
//           subjectsSnap,
//         ] = await Promise.all([
//           getDocs(collection(db, "Students")),
//           getDocs(collection(db, "Teachers")),
//           getDocs(collection(db, "Exam Schedule")),
//           getDocs(collection(db, "Admissions")),
//           getDocs(collection(db, "Subjects")),
//         ]);

//         setTotals({
//           students: studentsSnap.docs.length,
//           teachers: teachersSnap.docs.length,
//           exams: examsSnap.docs.length,
//           admissions: admissionsSnap.docs.length,
//           subjects: subjectsSnap.docs.length,
//         });
//       } catch (error) {
//         console.error("Error fetching totals:", error);
//       }
//     };

//     fetchCounts();
//   }, []);

//   const data = [
//     { name: "Students", count: totals.students },
//     { name: "Teachers", count: totals.teachers },
//     { name: "Exams", count: totals.exams },
//     { name: "Admissions", count: totals.admissions },
//     { name: "Subjects", count: totals.subjects },
//   ];

//   const quotes = [
//     "Learning today, leading tomorrow.",
//     "Every expert was once a beginner.",
//     "Your progress is your power.",
//     "Mistakes are proof you are trying.",
//     "Small steps every day lead to big results.",
//     "Discipline beats motivation.",
//     "Keep going, your future self will thank you.",
//     "Dream. Learn. Achieve.",
//     "One chapter at a time.",
//     "Your education is your superpower.",
//   ];

//   const [quoteIndex, setQuoteIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
//     }, 8000);

//     return () => clearInterval(interval);
//   }, [quotes.length]);

//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const snap = await getDocs(collection(db, "Students"));
//         setTotalStudents(snap.docs.length);
//       } catch (error) {
//         console.error("Error fetching students:", error);
//       }
//     };

//     fetchStudents();
//   }, []);

//   const hours = new Date().getHours();
//   const greeting =
//     hours < 12
//       ? "Good Morning"
//       : hours < 18
//       ? "Good Afternoon"
//       : "Good Evening";

//   return (
//     <>
//       <Box className={styles.dashContainer}>
//         <Typography
//          sx={{border: "none"}}

//           variant={isSmallScreen ? "h3" : "h2"}
//           className={styles.heading}
//         >
//           {greeting}, {userData?.name || "User"}!
//         </Typography>

//         <Typography
//           variant={isSmallScreen ? "h6" : "h5"}
//           className={`${styles.quote} ${styles.show}`}
//         >
//           💡 "{quotes[quoteIndex]}"
//         </Typography>

//         <Divider sx={{ margin: "20px 0", backgroundColor: "#ccc" }} />
//         <ResponsiveContainer width="90%" height={300}>
//           <BarChart
//          sx={{border: "none !important"}}

//             data={data}
//             margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey="count" fill="#e7c137" barSize={40} />
//           </BarChart>
//         </ResponsiveContainer>
        
//       </Box>
      
//     </>
//   );
// };


import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  useMediaQuery,
  useTheme,
  Divider,
} from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Firebase.jsx";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import styles from "./Dashboard.module.css";

export const Dashboard = () => {
  const userDataJSON = localStorage.getItem("userData");
  const userData = JSON.parse(userDataJSON);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [totals, setTotals] = useState({
    students: 0,
    teachers: 0,
    exams: 0,
    admissions: 0,
    subjects: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [
          studentsSnap,
          teachersSnap,
          examsSnap,
          admissionsSnap,
          subjectsSnap,
        ] = await Promise.all([
          getDocs(collection(db, "Students")),
          getDocs(collection(db, "Teachers")),
          getDocs(collection(db, "Exam Schedule")),
          getDocs(collection(db, "Admissions")),
          getDocs(collection(db, "Subjects")),
        ]);

        setTotals({
          students: studentsSnap.docs.length,
          teachers: teachersSnap.docs.length,
          exams: examsSnap.docs.length,
          admissions: admissionsSnap.docs.length,
          subjects: subjectsSnap.docs.length,
        });
      } catch (error) {
        console.error("Error fetching totals:", error);
      }
    };

    fetchCounts();
  }, []);

  const data = [
    { name: "Students", count: totals.students },
    { name: "Teachers", count: totals.teachers },
    { name: "Exams", count: totals.exams },
    { name: "Admissions", count: totals.admissions },
    { name: "Subjects", count: totals.subjects },
  ];

  const quotes = [
    "Learning today, leading tomorrow.",
    "Every expert was once a beginner.",
    "Your progress is your power.",
    "Mistakes are proof you are trying.",
    "Small steps every day lead to big results.",
    "Discipline beats motivation.",
    "Keep going, your future self will thank you.",
    "Dream. Learn. Achieve.",
    "One chapter at a time.",
    "Your education is your superpower.",
  ];

  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const hours = new Date().getHours();
  const greeting =
    hours < 12
      ? "Good Morning"
      : hours < 18
      ? "Good Afternoon"
      : "Good Evening";

  const getChartWidth = () => {
    if (window.innerWidth <= 550) return "100%"; // mobile
    // if (window.innerWidth <= 650) return "calc(100% - 0px)";
    // if (window.innerWidth <= 800) return "calc(100% - 100px)";
    return "calc(100% - 0px)"; // desktop
  };

  return (
    <Box className={styles.dashContainer}>
      <Typography
        sx={{ border: "none" }}
        variant={isSmallScreen ? "h3" : "h2"}
        className={styles.heading}
      >
        {greeting}, {userData?.name || "User"}!
      </Typography>

      <Typography
        variant={isSmallScreen ? "h6" : "h5"}
        className={`${styles.quote} ${styles.show}`}
      >
        💡 "{quotes[quoteIndex]}"
      </Typography>

      <Divider sx={{ margin: "20px 0", backgroundColor: "#ccc" }} />

      <Box sx={{ width: getChartWidth(), transition: "width 0.3s" }}>
      <ResponsiveContainer width="100%" height={300}>
  <BarChart
    data={data}
    layout={window.innerWidth <= 750 ? "vertical" : "horizontal"}
    margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
  >
    <CartesianGrid strokeDasharray="3 3" />
    {window.innerWidth <= 750 ? (
      <>
        <XAxis type="number"  />
        <YAxis type="category" 
  dataKey="name"
  angle={-45}
  textAnchor="end"/>
      </>
    ) : (
      <>
        <XAxis type="category" dataKey="name" />
        <YAxis type="number" />
      </>
    )}
    <Tooltip />
    <Bar dataKey="count" fill="#e7c137" barSize={40} />
  </BarChart>
</ResponsiveContainer>

      </Box>
    </Box>
  );
};
