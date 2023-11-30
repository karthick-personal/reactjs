const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require("./models/Employees");
const TicketModel = require("./models/TicketForm");
const AdminModel = require("./models/AdminForm");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to your MongoDB database. Ensure MongoDB is running and the database "employee" exists.
mongoose.connect("mongodb://127.0.0.1:27017/employee", {
  useNewUrlParser: true, // Use new URL parser
  useUnifiedTopology: true, // Use new Server Discovery and Monitoring engine
});

// User login route
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  EmployeeModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("Success");
      } else {
        res.json("The Password is incorrect");
      }
    } else {
      res.json("No record existed");
    }
  });
});
// Fetch all registered users
app.get("/users", (req, res) => {
  EmployeeModel.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json("Failed to fetch registered users");
    });
});
// User registration route
app.post("/register", (req, res) => {
  EmployeeModel.create(req.body)
    .then((employee) => {
      res.json(employee);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json("Registration failed");
    });
});

// Create a new support ticket route
app.post("/ticket", (req, res) => {
  TicketModel.create(req.body)
    .then((ticket) => {
      res.json(ticket);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json("Ticket creation failed");
    });
});
// Update a support ticket route using PUT method
app.put("/ticket/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, status, comments, starttime, endtime, ticketid, category, assigned } = req.body;

    const updatedTicket = await TicketModel.findByIdAndUpdate(
      id,
      { name, status, comments, starttime, endtime, ticketid, category, assigned },
      { new: true }
    );

    if (!updatedTicket) {
      return res.status(404).json("Ticket not found");
    }

    res.json(updatedTicket);
  } catch (err) {
    console.error(err);
    res.status(500).json("Ticket update failed");
  }
});



// image Add
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/Images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
const adminforms = multer({
  storage: storage,
});
app.post("/adminforms", adminforms.single("file"), (req, res) => {
  const { comments, statusbutton } = req.body;
  const image = req.file.filename;

  AdminModel.create({ comments, statusbutton, image })
    .then((adminform) => {
      res.json(adminform);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json("Admin form creation failed");
    });
});

// Fetch all support tickets
app.get("/ticket", (req, res) => {
  TicketModel.find()
    .then((tickets) => {
      res.json(tickets);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json("Failed to fetch tickets");
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
