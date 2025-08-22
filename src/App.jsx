import { Routes, Route, useLocation } from "react-router-dom";
import { Login } from "./screens/Login/Login.jsx";
import { Signup } from "./screens/Signup/Signup.jsx";
import { Dashboard } from "./screens/Dashboard/Dashboard.jsx";
import { ProtectedRoute } from "./Routes/ProtectedRoute.jsx";
import { ProtectedLoginSignup } from "./Routes/ProtectedLoginSignup.jsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { AddStudent } from "./screens/Add Student/AddStudent.jsx";
import { ViewStudent } from "./screens/View Student/ViewStudent.jsx";
import { TransferStudent } from "./screens/Transfer Student/TransferStudent.jsx";
import { AddTeacher } from "./screens/Add Teacher/AddTeacher.jsx";
import { ViewTeacher } from "./screens/View Teacher/ViewTeacher.jsx";
import { TeacherAllocation } from "./screens/Teacher Allocation/TeacherAllocation.jsx";
import AddSubject from "./screens/Add Subject/AddSubject.jsx";
import ViewSubject from "./screens/View Subject/ViewSubject.jsx";
import SyllabusList from "./screens/Syllabus List/SyllabusList.jsx";
import RegisterClass from "./screens/Reguster Class/RegisterClass.jsx";
import AllClass from "./screens/All Class/AllClass.jsx";
import FeeStructure from "./screens/Fee Structue/FeeStructure.jsx";
import FeeSubmission from "./screens/Fee Submission/FeeSubmission.jsx";
import FeeVoucher from "./screens/Fee Voucher/FeeVoucher.jsx";
import CreateAdmission from "./screens/Create Admission/CreateAdmission.jsx";
import ExamSchedule from "./screens/Exam Schedule/ExamSchedule.jsx";
import ExamResults from "./screens/Exam Results/ExamResults.jsx";
import { EditStudent } from "./screens/Edit Student/EditStudent.jsx";
import { Navbar } from "./components/Navbar/Navbar.jsx";
import EditTeacher from "./screens/Edit Teacher/EditTeacher.jsx";
import EditSubject from "./screens/Edit Subject/EditSubject.jsx";
import CreateSyllabus from "./screens/Create Syllabus/CreateSyllabus.jsx";
import EditSyllabus from "./screens/Edit Syllabus/EditSyllabus.jsx";
import EditClass from "./screens/Edit Class/EditClass.jsx";
import SchoolRegistration from "./screens/Registration/Registration.jsx"
import ViewSchool from "./screens/View School/ViewSchool.jsx";
import EditSchool from "./screens/Edit School/EditSchool.jsx";
import AddFee from "./screens/Add Fee/AddFee.jsx"
import EditFee from "./screens/Edit Fee/EditFee.jsx";
import ViewAdmission from "./screens/View Admission/ViewAdmission.jsx";
import EditAdmission from "./screens/Edit Admission/EditAdmission.jsx";
import AddExam from "./screens/Add Exam/AddExam.jsx";
import EditExam from "./screens/Edit Exam/EditExam.jsx";
import AddResult from "./screens/Add Result/AddResult.jsx";
import EditResult from "./screens/Edit Result/EditResult.jsx";

function App() {
  const location = useLocation();

  const hideNavbarRoutes = ["/", "/signup"];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);
  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route element={<ProtectedLoginSignup />}>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/addstudent" element={<AddStudent />} />
          <Route path="/viewstudent" element={<ViewStudent />} />
          <Route path="/editstudent/:id" element={<EditStudent />} />
          <Route path="/transferstudent" element={<TransferStudent />} />

          <Route path="/addteacher" element={<AddTeacher />} />
          <Route path="/viewteacher" element={<ViewTeacher />} />
          <Route path="/editteacher/:id" element={<EditTeacher />} />
          <Route path="/teacherallocation" element={<TeacherAllocation />} />

          <Route path="/addsubject" element={<AddSubject />} />
          <Route path="/viewsubject" element={<ViewSubject />} />
          <Route path="/editsubject/:id" element={<EditSubject />} />

          <Route path="/schoolregistration" element={<SchoolRegistration />} />
          <Route path="/viewschool" element={<ViewSchool />} />
          <Route path="/editschool/:id" element={<EditSchool />} />

          <Route path="/createsyllabus" element={<CreateSyllabus />} />
          <Route path="/editsyllabus/:id" element={<EditSyllabus />} />
          <Route path="/syllabuslist" element={<SyllabusList />} />

          <Route path="/registerclass" element={<RegisterClass />} />
          <Route path="/editclass/:id" element={<EditClass />} />
          <Route path="/allclass" element={<AllClass />} />

          <Route path="/feestructure" element={<FeeStructure />} />
          <Route path="/addFee" element={<AddFee />} />
          <Route path="/editFee/:id" element={<EditFee />} />
          <Route path="/feesubmission" element={<FeeSubmission />} />
          <Route path="/feevoucher" element={<FeeVoucher />} />

          <Route path="/createadmission" element={<CreateAdmission />} />
          <Route path="/viewadmission" element={<ViewAdmission />} />
          <Route path="/editadmission/:id" element={<EditAdmission />} />

          <Route path="/examschedule" element={<ExamSchedule />} />
          <Route path="/editexam/:id" element={<EditExam />} />
          <Route path="/addexam" element={<AddExam />} />
          <Route path="/addresult" element={<AddResult />} />
          <Route path="/examresult" element={<ExamResults />} />
          <Route path="/editresult/:id" element={<EditResult />} />
          
        </Route>
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
