const logger = console.log; // eslint-disable-line no-console
const chalk = require('chalk');

class Logger {
  constructor(log) {
    this.logger = log;
  }

  info(msg) {
    this.logger(chalk.blue(msg));
  }

  warn(msg) {
    this.logger(chalk.yellow(msg));
  }

  error(msg) {
    this.logger(chalk.red(msg));
  }
}

module.exports = new Logger(logger);
