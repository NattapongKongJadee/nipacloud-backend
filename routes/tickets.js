const express = require("express");
const fs = require("fs");
const router = express.Router();
const path = require("path");
const DATA_TICKETS = path.join(__dirname, "../data/tickets.json");

const getTickets = () => {
  const data = fs.readFileSync(DATA_TICKETS);
  return JSON.parse(data);
};

const writeTickets = (tickets) => {
  fs.writeFileSync(DATA_TICKETS, JSON.stringify(tickets, null, 2));
};

// Routes
// 1. Create a new ticket
router.post("/", (req, res) => {
  const { title, description, contact } = req.body;

  //validate data
  if (!title || !description || !contact) {
    return res
      .status(400)
      .json({ error: "Title, description, and contact are required." });
  }

  try {
    const tickets = getTickets();
    const newTicket = {
      id: String(tickets.length + 1),
      title,
      description,
      contact,
      createdTimestamp: new Date().toISOString(),
      latestUpdateTimestamp: new Date().toISOString(),
      status: "pending",
    };

    tickets.push(newTicket);
    writeTickets(tickets);
    console.log("Created New Ticket Successfully !");

    res.status(201).json(newTicket);
  } catch (e) {
    console.log("Error to created new tciket", e);
  }
});

// 2. Update a ticket
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, description, contact, status } = req.body;

  const tickets = getTickets();
  const ticket = tickets.find((t) => t.id === id);

  // validate tickets
  if (!ticket) {
    return res.status(404).json({ error: "Ticket not found." });
  }

  if (title) ticket.title = title;
  if (description) ticket.description = description;
  if (contact) ticket.contact = contact;
  if (status) ticket.status = status;

  ticket.latestUpdateTimestamp = new Date().toISOString();

  writeTickets(tickets);
  console.log("Updated Ticket Successfully");
  res.json(ticket);
});

// 3. List and sort/filter tickets
router.get("/", (req, res) => {
  const { sortBy, filterByStatus } = req.query;

  let tickets = getTickets();

  if (filterByStatus) {
    tickets = tickets.filter((ticket) => ticket.status === filterByStatus);
  }

  if (sortBy) {
    if (sortBy === "latestUpdate") {
      tickets.sort(
        (a, b) =>
          new Date(b.latestUpdateTimestamp) - new Date(a.latestUpdateTimestamp)
      );
    } else if (sortBy === "status") {
      tickets.sort((a, b) => a.status.localeCompare(b.status));
    }
  }

  res.json(tickets);
});

// 4. Get ticket by ID
router.get("/:id", (req, res) => {
  const { id } = req.params;

  const tickets = getTickets();
  const ticket = tickets.find((t) => t.id === id);

  if (!ticket) {
    return res.status(404).json({ error: "Ticket not found." });
  }

  res.json(ticket);
});

// 5.Deelte not allowed
router.delete("/:id", (req, res) => {
  res.status(403).json({ error: "Deleting tickets is not allowed." });
});

module.exports = router;
