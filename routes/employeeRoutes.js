import { Router } from "express";
import employees, { addEmployee } from "#db/employees";
const router = router();

//GET ALL Employees //
router.get("/", (req, res) => {
  res.json(employees);
});

// GET Random employees //
router.get("/random", (req, res) => {
  randomIdx = Math.floor(Math.random() * employees.length);
  res.json(employees[randomIdx]);
});

// GET Employees by ID //

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const employee = employees.find((e) => e.id === id);

  if (!employee) {
    return res.status(404).send("Employee not found");
  }

  res.json(employee);
});

router.post("/", (req, res) => {
  const { name } = req.body ?? {};

  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).send("Invalid or missing employee name");
  }

  const newEmployee = addEmployee(name.trim());
  res.status(201).json(newEmployee);
});

export default router;
