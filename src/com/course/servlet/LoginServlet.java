package com.course.servlet;

import com.course.db.DBConnection;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebServlet("/LoginServlet")
public class LoginServlet extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String email = request.getParameter("email");
        String password = request.getParameter("password");

        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;

        try {
            conn = DBConnection.getConnection();
            if (conn != null) {
                String sql = "SELECT student_id, name, roll_number FROM students WHERE email = ? AND password = ?";
                pstmt = conn.prepareStatement(sql);
                pstmt.setString(1, email);
                pstmt.setString(2, password);

                rs = pstmt.executeQuery();

                if (rs.next()) {
                    // Login successful
                    int studentId = rs.getInt("student_id");
                    String studentName = rs.getString("name");
                    String rollNumber = rs.getString("roll_number");

                    // Create session
                    HttpSession session = request.getSession();
                    session.setAttribute("student_id", studentId);
                    session.setAttribute("student_name", studentName);
                    session.setAttribute("roll_number", rollNumber);
                    session.setAttribute("email", email);

                    response.sendRedirect("dashboard.jsp");
                } else {
                    // Login failed
                    response.sendRedirect("login.jsp?error=Invalid email or password");
                }
            } else {
                response.sendRedirect("login.jsp?error=Database connection failed");
            }
        } catch (SQLException e) {
            e.printStackTrace();
            response.sendRedirect("login.jsp?error=Database error: " + e.getMessage());
        } finally {
            try {
                if (rs != null) rs.close();
                if (pstmt != null) pstmt.close();
                if (conn != null) conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
    
    // Allow GET requests to just show the login page
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.sendRedirect("login.jsp");
    }
}
