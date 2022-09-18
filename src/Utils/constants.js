// export const ROOT_URL = "http://localhost:8000/api/v1/";
export const ROOT_URL = "http://18.183.199.34:8000/api/v1/";

// export const BASE_URL = "http://localhost:8001";
export const BASE_URL = "http://18.183.199.34:8001";

export const RegisterStudentURL = ROOT_URL + "user/student/register";

export const SignInStudentURL = ROOT_URL + "user/student/create-session";

export const RegisterTeacherURL = ROOT_URL + "user/teacher/register";

export const SignInTeacherURL = ROOT_URL + "user/teacher/create-session";

export const CreateClassRoomURL = ROOT_URL + "classroom/create";

export const CreateSessionURL = ROOT_URL + "classroom/create-session";

export const getClassroomURL = ROOT_URL + "classroom/get-classrooms";

export const getSessionURL = (classid) =>
  ROOT_URL + `classroom/get-sessions?classid=${classid}`;

export const activateAttendanceURL = (sessionid) =>
  ROOT_URL + `classroom/activate-session?sessionid=${sessionid}`;

export const deactivateAttendanceURL = (sessionid) =>
  ROOT_URL + `classroom/deactivate-session?sessionid=${sessionid}`;

export const getPresentStudentsURL = (sessionid) =>
  ROOT_URL + `classroom/get-present-students?sessionid=${sessionid}`;

export const joinClassroomURL = (classid) =>
  ROOT_URL + `classroom/join-classroom?id=${classid}`;

export const getActiveClassroomsURL =
  ROOT_URL + `classroom/get-active-sessions`;

export const getAuthStatusURL = ROOT_URL + "user/student/get-auth-status";

export const handleRegURL =
  ROOT_URL + "user/student/generate-registration-option";

export const verifyRegURL = ROOT_URL + "user/student/verify-registration";

export const handleAuthURL = (sid) =>
  ROOT_URL + `classroom/mark-attendance?id=${sid}`;

export const verifyAuthURL = (sid) =>
  ROOT_URL + `user/student/verify-authentication?id=${sid}`;
