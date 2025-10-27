import express from "express";
import employeesRouter from "./routes/employeeRoutes.js";
const app = express();

import employees from "#db/employees";

// Message for all Employees router 3000 //
app.get("/", (req, res) => {
  res.send("Hello employees!");
});

app.get("/employees", (req, res) => {
  res.send(employees);
});

// Note: this middleware has to come first! Otherwise, Express will treat
// "random" as the argument to the `id` parameter of /employees/:id.
app.get("/employees/random", (req, res) => {
  const randomIndex = Math.floor(Math.random() * employees.length);
  res.send(employees[randomIndex]);
});

app.get("/employees/:id", (req, res) => {
  const { id } = req.params;

  // req.params are always strings, so we need to convert `id` into a number
  // before we can use it to find the employee
  const employee = employees.find((e) => e.id === +id);

  if (!employee) {
    return res.status(404).send("Employee not found");
  }

  res.send(employee);
});

// At the Last //
export default app;
