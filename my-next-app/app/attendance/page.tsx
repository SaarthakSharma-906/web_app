"use client";

import { useEffect, useState } from "react";
import "../../styles/attendance.css";

const courseSchedule = [
  { course: "Modelling and Designing of Robots", start: "11:00", end: "12:00", teacher: "Atul Mishra" },
  // Add more courses and time slots as needed
];

const AttendancePage = () => {
  const [loggedInUser, setLoggedInUser] = useState<{ username: string; role: string } | null>(null);
  const [attendanceData, setAttendanceData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    if (user) {
      setLoggedInUser(JSON.parse(user));
    } else {
      window.location.href = "/login";
    }
  }, []);

  useEffect(() => {
    if (!loggedInUser) return;

    const fetchAttendanceData = async () => {
      try {
        let endpoint = "/api/attendance";
        if (loggedInUser.role === "student") {
          endpoint += `?username=${loggedInUser.username}`;
        }

        const response = await fetch(endpoint);
        if (response.ok) {
          const data = await response.json();

          // Handle filtering for teacher's role
          if (loggedInUser.role === "teacher") {
            const currentCourse = getCurrentCourse(loggedInUser.username);
            if (currentCourse) {
              const filteredData = data.filter((entry: any) => {
                const entryTime = new Date(entry.timestamp).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
                return (
                  entryTime >= currentCourse.start &&
                  entryTime <= currentCourse.end
                );
              });
              setAttendanceData(filteredData);
            } else {
              setError("No course found for the current time.");
            }
          } else {
            setAttendanceData(data);
          }
        } else {
          setError("Failed to fetch attendance data.");
        }
      } catch (error) {
        console.error("Error fetching attendance data:", error);
        setError("Error fetching attendance data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, [loggedInUser]);

  const getCurrentCourse = (teacherName: string) => {
    const now = new Date();
    const currentTime = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

    return courseSchedule.find(
      (course) =>
        course.teacher === teacherName &&
        currentTime >= course.start &&
        currentTime <= course.end
    );
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!loggedInUser) {
    return <div className="error">Please log in to view your attendance.</div>;
  }

  return (
    <div className="container">
      <h1 className="header">
        Attendance for {loggedInUser.role === "student" ? loggedInUser.username : "All Students"}
      </h1>
      {error ? (
        <div className="error">{error}</div>
      ) : (
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Last Updated Time</th>
              <th>Course</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.length > 0 ? (
              attendanceData.map((entry) => (
                <tr key={entry._id}>
                  <td>{entry.person_name}</td>
                  <td>{new Date(entry.timestamp).toLocaleString()}</td>
                  <td>{getCurrentCourse(loggedInUser.username)?.course || "N/A"}</td>
                  <td>Marked</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="no-data">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AttendancePage;
