const express = require("express");
const fs = require("fs");
const path = require("path");

var cors = require("cors");

const app = express();
const { connection } = require("./db/connection");

const UserRoutes = require("./routes/userRoutes");

const whitelist = ["http://localhost:3000"]; 
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.use("/api/v1/users", UserRoutes);

const readFile = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, { encoding: "utf-8" }, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
};


app.get("/dbreset", (req, res) => {
  /*
    * Write a feature to ensure that only a user with proper authentication can access this API and proceed to reset a database
  ============================================================================================================
    * This task is set to test both your design and code skills
    * You may work with the assumption that there is no admin data to work with
    * An AUTHENTICATION CODE is required
    * A PASSWORD is required to reset the database
  */
  Promise.all([
    readFile(path.resolve(__dirname, `./db/migrations/tables.sql`)),
    readFile(path.resolve(__dirname, `./db/seeds/users.sql`)),
  ])
    .then(([tables, seeds]) => {
      connection.query(tables, (tableErr, tableResult) => {
        if (!tableErr) {
          connection.query(seeds, (seedErr, seedResult) => {
            if (!seedErr) {
              console.log("Database successfully reset.");
              res.send("Database has been successfully recreated.");
            } else {
              console.log("a seed creation error occurred...", seedErr);
              res.send("Sorry, an error occrred. Please try again");
            }
          });
        } else {
          console.log("Database creation error occurred...", tableErr);
          res.send("Sorry, an error occrred. Please try again");
        }
      });
    })
    .catch((error) => {
      console.log(`Error setting up the reset route: ${error}`);
    });
});

app.get("*", (req, res) => res.send("Api not found"));

module.exports = app;
