import {logger} from "./util/logger";

const log = logger();

function fibonacci(n: number): number {
  if (n < 0 || n > 10) { throw new Error("n should in [0,10]"); }
  if (n === 0) { return 0; }
  if (n === 1) { return 1; }
  return fibonacci(n - 1) + fibonacci(n - 2);
}

export {fibonacci};

if (require.main === module) {
  const n: number = Number(process.argv[2]);
  log.info(`fibonacci(${n})=${fibonacci(n)}`);
}
