const USERS = [
  {
    name: "Karan Bhatia",
    email: "karan.bhatia02@nagarro.com",
    phone: "+91-9876543210",
    empId: "EMP001",
  },
  {
    name: "John Doe",
    email: "john@doe.com",
    phone: "+1-234-567-8901",
    empId: "EMP002",
  },
  {
    name: "Jane Smith",
    email: "Jane@smith.com",
    phone: "+44-123-456-7890",
    empId: "EMP003",
  },
  {
    name: "Alice Johnson",
    email: "alice@johnson.com",
    phone: "+61-987-654-3210",
    empId: "EMP004",
  },
  {
    name: "Bob Brown",
    email: "bob@brown.com",
    phone: "+49-123-456-7890",
    empId: "EMP005",
  },
];

function insertUsers() {
  const { getDB } = require("./db");
  const db = getDB();
  const collection = db.collection("nagp-users-collection-1");

  collection
    .insertMany(USERS)
    .then((result) => {
      console.log(`${result.insertedCount} users inserted`);
    })
    .catch((err) => {
      console.error("Error inserting users:", err);
    });
}

module.exports = { insertUsers };
