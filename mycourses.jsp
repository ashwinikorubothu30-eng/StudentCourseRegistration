<%@ page import="java.sql.*" %>
<%@ page import="com.course.db.DBConnection" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
    // Check if the user is logged in
    if(session.getAttribute("student_id") == null) {
        response.sendRedirect("login.jsp?error=Please login to view your courses");
        return;
    }
    
    int studentId = (Integer) session.getAttribute("student_id");
%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Registered Courses - Student Course Registration</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>body { background-color: #f8f9fa; }</style>
</head>
<body>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container">
    <a class="navbar-brand" href="dashboard.jsp">Course Registration</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav me-auto">
        <li class="nav-item">
          <a class="nav-link" href="dashboard.jsp">Dashboard</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="courses.jsp">Available Courses</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" href="mycourses.jsp">My Registered Courses</a>
        </li>
      </ul>
      <div class="d-flex">
          <span class="navbar-text me-3">
              Welcome, <%= session.getAttribute("student_name") %>
          </span>
          <a href="logout.jsp" class="btn btn-outline-light btn-sm">Logout</a>
      </div>
    </div>
  </div>
</nav>

<div class="container mt-5">
    <h2 class="mb-4">My Registered Courses</h2>
    
    <%
        String success = request.getParameter("success");
        if (success != null) {
    %>
        <div class="alert alert-success" role="alert"><%= success %></div>
    <%
        }
    %>

    <div class="table-responsive">
        <table class="table table-bordered table-striped bg-white shadow-sm">
            <thead class="table-primary">
                <tr>
                    <th>Registration ID</th>
                    <th>Course Code</th>
                    <th>Course Name</th>
                    <th>Instructor</th>
                    <th>Credits</th>
                    <th>Registration Date</th>
                </tr>
            </thead>
            <tbody>
            <%
                Connection conn = null;
                PreparedStatement pstmt = null;
                ResultSet rs = null;
                try {
                    conn = DBConnection.getConnection();
                    if(conn != null) {
                        String query = "SELECT r.id, c.course_id, c.course_name, c.instructor, c.credits, r.registration_date " +
                                       "FROM registration r " +
                                       "JOIN courses c ON r.course_id = c.course_id " +
                                       "WHERE r.student_id = ? " +
                                       "ORDER BY r.registration_date DESC";
                                       
                        pstmt = conn.prepareStatement(query);
                        pstmt.setInt(1, studentId);
                        
                        rs = pstmt.executeQuery();
                        
                        boolean hasCourses = false;
                        while(rs.next()) {
                            hasCourses = true;
             %>
                            <tr>
                                <td><%= rs.getInt("id") %></td>
                                <td><%= rs.getInt("course_id") %></td>
                                <td><%= rs.getString("course_name") %></td>
                                <td><%= rs.getString("instructor") %></td>
                                <td><%= rs.getInt("credits") %></td>
                                <td><%= rs.getTimestamp("registration_date") %></td>
                            </tr>
            <%
                        }
                        if (!hasCourses) {
                            out.println("<tr><td colspan='6' class='text-center'>You have not registered for any courses yet.</td></tr>");
                        }
                    } else {
                        out.println("<tr><td colspan='6' class='text-danger'>Database connection unavailable.</td></tr>");
                    }
                } catch(Exception e) {
                    out.println("<tr><td colspan='6' class='text-danger'>Error: " + e.getMessage() + "</td></tr>");
                } finally {
                    if (rs != null) try { rs.close(); } catch (SQLException e) { }
                    if (pstmt != null) try { pstmt.close(); } catch (SQLException e) { }
                    if (conn != null) try { conn.close(); } catch (SQLException e) { }
                }
            %>
            </tbody>
        </table>
    </div>
    
    <div class="mt-4">
        <a href="courses.jsp" class="btn btn-primary">Register for more courses</a>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
