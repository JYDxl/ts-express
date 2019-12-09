import * as should from 'should'
import {describe} from 'mocha'
import {fibonacci} from '../src/main'

describe("test/main.test.js", () => {
  it("should equal 0 when n === 0", done => {
    should(fibonacci(0)).eql(0);
    done()
  });

  it('should equal 1 when n === 1', done => {
    should(fibonacci(1)).eql(1);
    done()
  });
});
