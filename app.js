/** Simple demo Express app. */

const express = require("express");
const app = express();

// useful error class to throw
const { NotFoundError, BadRequestError } = require("./expressError");
const { convertStrNums } = require("./utils");
const {
  findMean,
  findMedian,
  findMode,
} = require("./stats");

const MISSING = "Expected key `nums` with comma-separated list of numbers.";

app.use(express.urlencoded());

/** Finds mode of nums in qs: returns {operation: "mode", result } */
app.get("/mode", function (req, res) {
  const numsString = req.query["nums"];

  let results = calculateStats("mode", findMode, numsString);
  return res.json(results);
});

/** Finds mean of nums in qs: returns {operation: "mean", result } */
app.get("/mean", function (req, res) {
  const numsString = req.query["nums"];

  let results = calculateStats("mean", findMean, numsString);
  return res.json(results);
});

/** Finds median of nums in qs: returns {operation: "median", result } */
app.get("/median", function (req, res) {
  const numsString = req.query["nums"];

  let results = calculateStats("median", findMedian, numsString);
  return res.json(results);
});

/** Finds mean/median/mode of nums in qs: takes name, averaging function
 * and string of numbers, returns {operation: "median", result } */
function calculateStats(methodName, statsFunc, numsString){
  if (!numsString) {
    throw new BadRequestError(MISSING);
  }

  const nums = convertStrNums(numsString);

  const result = statsFunc(nums);

  return {
    operation: methodName,
    result
  };
}



/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res) {
  throw new NotFoundError();
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});



module.exports = app;