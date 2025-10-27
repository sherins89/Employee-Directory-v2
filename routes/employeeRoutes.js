import { Router } from "express";
import employees, { addEmployee } from "#db/employees";

const router = Router();

//GET ALL Employees //
router.get("/", (req, res) => {
  res.json(employees);
});

// GET Random employees //
router.get("/random", (req, res) => {
  const randomIndex = Math.floor(Math.random() * employees.length);
  res.json(employees[randomIndex]);
});

// GET /employees/:id //
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const employee = employees.find((e) => e.id === id);

  if (!employee) {
    return res.status(404).send("Employee not found");
  }
  res.json(employee);
});

// POST Employees //
router.post("/", (req, res) => {
  const { name } = req.body ?? {};
  if (typeof name !== "string" || name.trim() === "") {
    return res.status(400).send("Invalid or missing employee name");
  }
  const created = addEmployee(name.trim());
  res.status(201).json(created);
});

export default router;
