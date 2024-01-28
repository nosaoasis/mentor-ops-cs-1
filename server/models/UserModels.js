const { connection } = require("../db/connection");

const verifyEmailModel = () => {
  return new Promise(function (resolve, reject) {
    connection.query(queryString, [email], function (err, rows) {
      if (rows === undefined) {
        console.log("A database verify email error", err);
        reject(new Error("Error rows is undefined"));
      } else {
        resolve(rows);
      }
    });
  });
};

const regsiterNewUserModel = () => {
  /*
   * Incorrect query
   */
  return new Promise(function (resolve, reject) {
    connection.query(queryString, [email], function (err, rows) {
      if (rows === undefined) {
        console.log("A database verify email error", err);
        reject(new Error("Error rows is undefined"));
      } else {
        resolve(rows);
      }
    });
  });
};

const enterUserEmailConfirmDetails = () => {
  /*
   * Incorrect query
   */
  return new Promise(function (resolve, reject) {
    connection.query(queryString, [email], function (err, rows) {
      if (rows === undefined) {
        console.log("A database verify email error", err);
        reject(new Error("Error rows is undefined"));
      } else {
        resolve(rows);
      }
    });
  });
};

const deleteUserDetailsModel = () => {
  /*
   * Incorrect query
   */
  return new Promise(function (resolve, reject) {
    connection.query(queryString, [email], function (err, rows) {
      if (rows === undefined) {
        console.log("A database verify email error", err);
        reject(new Error("Error rows is undefined"));
      } else {
        resolve(rows);
      }
    });
  });
};

module.exports = {
  verifyEmailModel,
  regsiterNewUserModel,
  enterUserEmailConfirmDetails,
  deleteUserDetailsModel,
};
