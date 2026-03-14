<%@ page import="java.sql.*" %>
<%@ page import="com.course.db.DBConnection" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
    // Check if the user is logged in
    if(session.getAttribute("student_id") == null) {
        response.sendRedirect("login.jsp?error=Please login to access courses");
        return;
    }
%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Available Courses - Student Course Registration</title>
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
          <a class="nav-link active" href="courses.jsp">Available Courses</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="mycourses.jsp">My Registered Courses</a>
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
    <h2 class="mb-4">Available Courses</h2>
    
    <%
        String error = request.getParameter("error");
        if (error != null) {
    %>
        <div class="alert alert-danger" role="alert"><%= error %></div>
    <%
        }
    %>

    <div class="table-responsive">
        <table class="table table-bordered table-hover bg-white shadow-sm">
            <thead class="table-dark">
                <tr>
                    <th>Course ID</th>
                    <th>Course Name</th>
                    <th>Instructor</th>
                    <th>Credits</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
            <%
                Connection conn = null;
                Statement stmt = null;
                ResultSet rs = null;
                try {
                    conn = DBConnection.getConnection();
                    if(conn != null) {
                        stmt = conn.createStatement();
                        String query = "SELECT * FROM courses ORDER BY course_id";
                        rs = stmt.executeQuery(query);
                        
                        while(rs.next()) {
             %>
                            <tr>
                                <td><%= rs.getInt("course_id") %></td>
                                <td><%= rs.getString("course_name") %></td>
                                <td><%= rs.getString("instructor") %></td>
                                <td><%= rs.getInt("credits") %></td>
                                <td>
                                    <form action="CourseRegisterServlet" method="post" class="m-0">
                                        <input type="hidden" name="course_id" value="<%= rs.getInt("course_id") %>">
                                        <button type="submit" class="btn btn-primary btn-sm">Register</button>
                                    </form>
                                </td>
                            </tr>
            <%
                        }
                    } else {
                        out.println("<tr><td colspan='5' class='text-danger'>Database connection unavailable.</td></tr>");
                    }
                } catch(Exception e) {
                    out.println("<tr><td colspan='5' class='text-danger'>Error: " + e.getMessage() + "</td></tr>");
                } finally {
                    if (rs != null) try { rs.close(); } catch (SQLException e) { }
                    if (stmt != null) try { stmt.close(); } catch (SQLException e) { }
                    if (conn != null) try { conn.close(); } catch (SQLException e) { }
                }
            %>
            </tbody>
        </table>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
