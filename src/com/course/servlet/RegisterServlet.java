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

@WebServlet("/RegisterServlet")
public class RegisterServlet extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String name = request.getParameter("name");
        String rollNumber = request.getParameter("roll_number");
        String email = request.getParameter("email");
        String phone = request.getParameter("phone");
        String department = request.getParameter("department");
        String year = request.getParameter("year");
        String password = request.getParameter("password");

        Connection conn = null;
        PreparedStatement pstmt = null;

        try {
            conn = DBConnection.getConnection();
            if (conn != null) {
                String sql = "INSERT INTO students (name, roll_number, email, phone, department, year, password) VALUES (?, ?, ?, ?, ?, ?, ?)";
                pstmt = conn.prepareStatement(sql);
                pstmt.setString(1, name);
                pstmt.setString(2, rollNumber);
                pstmt.setString(3, email);
                pstmt.setString(4, phone);
                pstmt.setString(5, department);
                pstmt.setString(6, year);
                pstmt.setString(7, password);

                int rowsInserted = pstmt.executeUpdate();
                if (rowsInserted > 0) {
                    System.out.println("A new student was inserted successfully!");
                    response.sendRedirect("login.jsp?success=Registration successful. Please login.");
                } else {
                     response.sendRedirect("register.jsp?error=Registration failed. Please try again.");
                }
            } else {
                 response.sendRedirect("register.jsp?error=Database connection failed.");
            }
        } catch (SQLException e) {
            e.printStackTrace();
            response.sendRedirect("register.jsp?error=Database error: " + e.getMessage());
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
