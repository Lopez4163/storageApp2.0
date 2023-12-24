const express = require("express")
const app = express()
const fs = require("fs")
const mysql = require("mysql")
const cors = require("cors")

//localhost DB configuration
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "MyNewPass1!",
  port: 3306,
  database: "Mushroom-inventory-DB", // Set the database name here
})

// //AWS DB Configuration
// const express = require("express")
// const app = express()
// const mysql = require("mysql")
// const cors = require("cors")

// // AWS DB Configuration
// const db = mysql.createPool({
//   host: "ec2-3-84-236-160.compute-1.amazonaws.com",
//   user: "ec2-user",
//   password: "MyNewPass1!",
//   port: 3306,
//   database: "Mush-DB", // Set the database name here
// })

app.use(cors())
app.use(express.json())

// Function to create the table if it doesn't exist
const createTableIfNotExists = () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS item_inv (
      id INT AUTO_INCREMENT PRIMARY KEY,
      itemName VARCHAR(255) NOT NULL,
      quantity INT NOT NULL,
      location VARCHAR(255) NOT NULL,
      pricePerUnit DECIMAL(10, 2) NOT NULL
    );
  `

  db.query(createTableQuery, err => {
    if (err) {
      console.log("Error creating table:", err)
    } else {
      console.log("Table 'item_inv' is ready!")
    }
  })
}

// Call the function to create the table
createTableIfNotExists()

app.post("/api/insert", (req, res) => {
  const { itemName, quantity, location, pricePerUnit } = req.body

  const sqlInsert =
    "INSERT INTO item_inv (itemName, quantity, location, pricePerUnit) VALUES (?,?,?,?);"
  db.query(
    sqlInsert,
    [itemName, quantity, location, pricePerUnit],
    (err, result) => {
      if (err) {
        console.log(err)
        res.status(500).send("Error inserting data into the database")
      } else {
        res.status(201).send("Data inserted into the database")
      }
    }
  )
})

app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM item_inv"
  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send("Error retrieving data from the database")
    } else {
      res.send(result)
    }
  })
})

app.delete("/api/delete/:id", (req, res) => {
  const itemId = req.params.id

  const sqlDelete = "DELETE FROM item_inv WHERE id=?"
  db.query(sqlDelete, [itemId], (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send({ error: "Error deleting item" })
    } else {
      res.send({ message: "Item deleted successfully" })
    }
  })
})

app.put("/api/update/:id", (req, res) => {
  const itemId = req.params.id
  const updatedItem = req.body

  const sqlUpdate =
    "UPDATE item_inv SET itemName=?, quantity=?, location=?, pricePerUnit=? WHERE id=?"
  db.query(
    sqlUpdate,
    [
      updatedItem.itemName,
      updatedItem.quantity,
      updatedItem.location,
      updatedItem.pricePerUnit,
      itemId,
    ],
    (err, result) => {
      if (err) {
        console.log(err)
        res.status(500).send({ error: "Error updating item" })
      } else {
        res.send(updatedItem)
      }
    }
  )
})

app.listen(8080, () => {
  console.log("Server listening on port 8080")
})

// const express = require("express")
// const app = express()
// const mysql = require("mysql")
// const cors = require("cors")
// const { Client } = require("ssh2")
// const { resolve } = require("path")

// // SSH tunnel configuration
// const sshConfig = {
//   host: "ec2-3-84-236-160.compute-1.amazonaws.com", // EC2 instance public IP or DNS
//   username: "ec2-user",
//   privateKey: require("fs").readFileSync(
//     "/Users/nico/Desktop/ssh/storageDB.pem"
//   ), // Path to your private key file
//   port: 22, // SSH port (default is 22)
//   dstHost: "ip-172-31-89-237.ec2.internal",
//   dstPort: 3306, // MySQL port on the remote EC2 instance
//   localHost: "127.0.0.1",
//   localPort: 3308, // Local port to establish the SSH tunnel
// }

// //MySQL DB configuration
// const dbConfig = {
//   host: "127.0.0.1",
//   user: "nick",
//   password: "MyNewPass1!",
//   port: 3308, // Local port used for the SSH tunnel
//   database: "Mush-DB",
// }

// app.use(cors())
// app.use(express.json())

// // Create an SSH tunnel
// const sshTunnel = new Client()

// sshTunnel.on("ready", () => {
//   // Start the MySQL connection
//   const db = mysql.createPool(dbConfig)

//   // Function to create the table if it doesn't exist
//   const createTableIfNotExists = () => {
//     const createTableQuery = `
//       CREATE TABLE IF NOT EXISTS item_inv (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         itemName VARCHAR(255) NOT NULL,
//         quantity INT NOT NULL,
//         location VARCHAR(255) NOT NULL,
//         pricePerUnit DECIMAL(10, 2) NOT NULL
//       );
//     `

//     db.query(createTableQuery, err => {
//       if (err) {
//         console.log("Error creating table:", err)
//       } else {
//         console.log("Table 'item_inv' is ready!")
//       }
//     })
//   }

//   // Call the function to create the table
//   createTableIfNotExists()

//   // ... REST of your code ...

//   // Start the Express server
//   app.listen(8080, () => {
//     console.log("Server listening on port 8080")
//   })
// })

// sshTunnel.on("error", error => {
//   console.error("Error establishing SSH tunnel:", error)
// })

// sshTunnel.connect(sshConfig)
