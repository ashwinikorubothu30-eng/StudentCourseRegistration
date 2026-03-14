package com.course.db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBConnection {

    // Oracles DB properties
    private static final String URL = "jdbc:oracle:thin:@localhost:1521:xe"; // Default Oracle XE port/SID. Adjust if different.
    private static final String USERNAME = "system";
    private static final String PASSWORD = "ashu0812";

    public static Connection getConnection() {
        Connection connection = null;
        try {
            // Load the Oracle JDBC Driver
            Class.forName("oracle.jdbc.OracleDriver");
            
            // Establish the connection
            connection = DriverManager.getConnection(URL, USERNAME, PASSWORD);
            System.out.println("Connection established successfully with Oracle DB");
        } catch (ClassNotFoundException e) {
            System.err.println("Oracle JDBC Driver not found: " + e.getMessage());
        } catch (SQLException e) {
            System.err.println("Connection failed: " + e.getMessage());
        }
        return connection;
    }
}
