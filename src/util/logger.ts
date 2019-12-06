import {configure, getLogger} from 'log4js';

configure({
  appenders : {
    stdout: {
      type  : 'console',
      layout: {
        type   : 'pattern',
        pattern: '%d{yyyy-MM-dd hh:mm:ss,SSS} %5p --- [%x{process}:%5z] %50.50f : %m',
        tokens : {
          process: () => (process.argv[2] || 'main').padStart(10)
        }
      }
    },
    file  : {
      type                : 'dateFile',
      filename            : 'logs/dev',
      pattern             : "yyyy-MM-dd.txt",
      alwaysIncludePattern: true,
      layout              : {
        type   : 'pattern',
        pattern: '%d{yyyy-MM-dd hh:mm:ss,SSS} %5p --- [%x{process}:%5z] %50.50f : %m',
        tokens : {
          process: () => (process.argv[2] || 'main').padStart(10)
        }
      }
    },
    main  : {
      type                : 'dateFile',
      filename            : 'logs/main',
      pattern             : "yyyy-MM-dd.txt",
      alwaysIncludePattern: true,
      layout              : {
        type   : 'pattern',
        pattern: '%d{yyyy-MM-dd hh:mm:ss,SSS} %5p --- [%x{process}:%5z] %50.50f : %m',
        tokens : {
          process: () => (process.argv[2] || 'main').padStart(10)
        }
      }
    }
  },
  categories: {
    default: {
      appenders      : ['stdout', 'file'],
      level          : 'all',
      enableCallStack: true
    },
    main   : {
      appenders      : ['stdout', 'file', 'main'],
      level          : 'all',
      enableCallStack: true
    }
  }
});

const logger = () => getLogger(process.argv[2] || 'main');

export {logger};
