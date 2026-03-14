<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register - Student Course Registration</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body { background-color: #f8f9fa; }
        .register-card { max-width: 600px; margin: 50px auto; padding: 30px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); border-radius: 10px; background-color: white;}
    </style>
</head>
<body>

<div class="container">
    <div class="register-card">
        <h3 class="text-center mb-4">Student Registration</h3>
        
        <%
            String error = request.getParameter("error");
            if (error != null) {
        %>
            <div class="alert alert-danger" role="alert"><%= error %></div>
        <%
            }
        %>

        <form action="RegisterServlet" method="post">
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label for="name" class="form-label">Full Name</label>
                    <input type="text" class="form-control" id="name" name="name" required>
                </div>
                <div class="col-md-6 mb-3">
                    <label for="roll_number" class="form-label">Roll Number</label>
                    <input type="text" class="form-control" id="roll_number" name="roll_number" required>
                </div>
            </div>
            
            <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input type="email" class="form-control" id="email" name="email" required>
            </div>
            
             <div class="row">
                <div class="col-md-6 mb-3">
                    <label for="phone" class="form-label">Phone Number</label>
                    <input type="text" class="form-control" id="phone" name="phone">
                </div>
                 <div class="col-md-6 mb-3">
                   <label for="year" class="form-label">Year of Study</label>
                    <select class="form-select" id="year" name="year">
                        <option value="1st Year">1st Year</option>
                        <option value="2nd Year">2nd Year</option>
                        <option value="3rd Year">3rd Year</option>
                        <option value="4th Year">4th Year</option>
                    </select>
                </div>
            </div>
            
            <div class="mb-3">
                <label for="department" class="form-label">Department</label>
                <select class="form-select" id="department" name="department">
                    <option value="Computer Science">Computer Science</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Mechanical">Mechanical</option>
                </select>
            </div>
            
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" name="password" required>
            </div>
            
            <button type="submit" class="btn btn-success w-100">Register</button>
        </form>
        <div class="text-center mt-3">
            <p>Already have an account? <a href="login.jsp">Login here</a></p>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
