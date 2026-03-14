package com.course.servlet;

import com.course.db.DBConnection;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebServlet("/CourseRegisterServlet")
public class CourseRegisterServlet extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession(false);
        
        // Ensure user is logged in
        if (session == null || session.getAttribute("student_id") == null) {
            response.sendRedirect("login.jsp?error=Please login first");
            return;
        }

        int studentId = (Integer) session.getAttribute("student_id");
        String courseIdStr = request.getParameter("course_id");
        
        if (courseIdStr == null || courseIdStr.trim().isEmpty()) {
             response.sendRedirect("courses.jsp?error=No course selected");
             return;
        }
        
        int courseId;
        try {
            courseId = Integer.parseInt(courseIdStr);
        } catch(NumberFormatException e) {
             response.sendRedirect("courses.jsp?error=Invalid course ID");
             return;
        }

        Connection conn = null;
        PreparedStatement pstmt = null;

        try {
            conn = DBConnection.getConnection();
            if (conn != null) {
                // Insert into registration table
                String sql = "INSERT INTO registration (student_id, course_id) VALUES (?, ?)";
                pstmt = conn.prepareStatement(sql);
                pstmt.setInt(1, studentId);
                pstmt.setInt(2, courseId);

                int rowsInserted = pstmt.executeUpdate();
                if (rowsInserted > 0) {
                     response.sendRedirect("mycourses.jsp?success=Successfully registered for course!");
                } else {
                     response.sendRedirect("courses.jsp?error=Registration failed. Please try again.");
                }
            } else {
                 response.sendRedirect("courses.jsp?error=Database connection failed.");
            }
        } catch (SQLException e) {
            e.printStackTrace();
            // Oracle Error ORA-00001: unique constraint violated
            if (e.getErrorCode() == 1) { // 1 is unique constraint on Oracle
                 response.sendRedirect("courses.jsp?error=You are already registered for this course.");
            } else {
                 response.sendRedirect("courses.jsp?error=Database error: " + e.getMessage());
            }
        } finally {
            try {
                if (pstmt != null) pstmt.close();
                if (conn != null) conn.close();
            } catch (SQLException e) {
                 e.printStackTrace();
            }
        }
    }
}
