import {configure, getLogger} from "log4js";

configure({
  appenders : {
    file  : {
      alwaysIncludePattern: true,
      filename            : "logs/dev",
      layout              : {
        pattern: "%d{yyyy-MM-dd hh:mm:ss,SSS} %5p --- [%x{process}:%5z] %50.50f : %m",
        tokens : {
          process: () => (process.argv[2] || "main").padStart(10),
        },
        type   : "pattern",
      },
      pattern             : "yyyy-MM-dd.txt",
      type                : "dateFile",
    },
    main  : {
      alwaysIncludePattern: true,
      filename            : "logs/main",
      layout              : {
        pattern: "%d{yyyy-MM-dd hh:mm:ss,SSS} %5p --- [%x{process}:%5z] %50.50f : %m",
        tokens : {
          process: () => (process.argv[2] || "main").padStart(10),
        },
        type   : "pattern",
      },
      pattern             : "yyyy-MM-dd.txt",
      type                : "dateFile",
    },
    stdout: {
      layout: {
        pattern: "%d{yyyy-MM-dd hh:mm:ss,SSS} %5p --- [%x{process}:%5z] %50.50f : %m",
        tokens : {
          process: () => (process.argv[2] || "main").padStart(10),
        },
        type   : "pattern",
      },
      type  : "console",
    },
  },
  categories: {
    default: {
      appenders      : ["stdout", "file"],
      enableCallStack: true,
      level          : "all",
    },
    main   : {
      appenders      : ["stdout", "file", "main"],
      enableCallStack: true,
      level          : "all",
    },
  },
});

const logger = () => getLogger(process.argv[2] || "main");

export {logger};
