import * as should from 'should'
import {describe} from 'mocha'
import {fibonacci} from '../src/main'

describe("test/main.test.js", () => {
  it("should equal 0 when n === 0", () => {
    should(fibonacci(0)).equal(0)
  });

  it('should equal 1 when n === 1', () => {
    should(fibonacci(1)).equal(1);
  });
});
