import expect, { assert, spyOn } from "expect";

const tryRequire = path => {
  let module, error;
  try { module = require(path).default; }
  catch(e) { error = e; }
  return { module, error };
}

describe("Files", () => {
  it("src/Parse.number.js should be a file", () => {
    const { module, error } = tryRequire('../Parse.number.js');
    assert(!error, `${error}`.replace('../', 'src/'));
  });

  it("src/Parse.string.js should be a file", () => {
    const { module, error } = tryRequire('../Parse.string.js');
    assert(!error, `${error}`.replace('../', 'src/'));
  });

  it("src/createExecutionPlan.js should be a file", () => {
    const { module, error } = tryRequire('../createExecutionPlan.js');
    assert(!error, `${error}`.replace('../', 'src/'));
  });
});
