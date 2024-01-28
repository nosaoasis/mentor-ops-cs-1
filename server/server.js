require("dotenv").config();

const { PORT } = process.env;

const http = require("http");
const { connectDatabase } = require("./db/connection");

const app = require("./index");
const server = http.createServer(app);

const startApp = async () => {
  try {
    await connectDatabase();
    server.listen(PORT, () =>
      console.log(
        `Database successfully connected and app started on port ${PORT}`
      )
    );
  } catch (error) {
    console.error(`An error occured. This is the error ${error}`);
  }
};
startApp();

