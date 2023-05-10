const { BadRequestError } = require("./expressError");


/** Convert strNums like ["1","2","3"] to [1, 2, 3].
 *
 * if the conversion isn't successful, throws a BadRequestError
 *
*/
function convertStrNums(strNums) {
  // if the conversion isn't successful, throw a BadRequestError and will
  // be handled in your route

  const numStrs = strNums.split(",")

  const nums = numStrs.map((s) => Number(s));

  if (nums.some((n) => isNaN(n))) {
    throw new BadRequestError(`all arguments must be numbers.`);
  }

  return nums;
}


module.exports = { convertStrNums };