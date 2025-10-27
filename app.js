import express from "express";
import employeesRouter from "./routes/employeeRoutes.js";
const app = express();

function logger(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next();
}

app.use(logger);
app.use(express.json());

// Message for all Employees router 3000 //
app.get("/", (req, res) => {
  res.send("Hello employees!");
});

app.use("/employees", employeesRouter);

// Error 500//

app.use((err, req, res, next) => {
  console.error(err); // keep the stack for debugging
  res.status(500).send("Internal Server Error"); // don’t leak internals
});

// At the Last //
export default app;
