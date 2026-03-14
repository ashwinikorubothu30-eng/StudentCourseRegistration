<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
    // Check if the user is logged in
    if(session.getAttribute("student_id") == null) {
        response.sendRedirect("login.jsp?error=Please login to access the dashboard");
        return;
    }
%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Student Course Registration</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body { background-color: #f8f9fa; }
    </style>
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
          <a class="nav-link active" href="dashboard.jsp">Dashboard</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="courses.jsp">Available Courses</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="mycourses.jsp">My Registered Courses</a>
        </li>
      </ul>
      <div class="d-flex">
          <span class="navbar-text me-3">
              Welcome, <%= session.getAttribute("student_name") %> (<%= session.getAttribute("roll_number") %>)
          </span>
          <a href="logout.jsp" class="btn btn-outline-light btn-sm">Logout</a>
      </div>
    </div>
  </div>
</nav>

<div class="container mt-5">
    <div class="row">
        <div class="col-md-12">
            <div class="card shadow-sm">
                <div class="card-body text-center py-5">
                    <h2 class="card-title">Welcome to the Student Course Registration System</h2>
                    <p class="card-text lead mt-3">Manage your academic journey. Browse available courses and register for the current semester.</p>
                    <div class="mt-4">
                        <a href="courses.jsp" class="btn btn-primary btn-lg me-2">Browse Courses</a>
                        <a href="mycourses.jsp" class="btn btn-outline-secondary btn-lg">View My Courses</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
