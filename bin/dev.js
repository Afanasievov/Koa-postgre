const application = require('../src/server/index.js');
const logger = require('../src/services/logger');
const config = require('../src/config/server.config.js');

application.listen(config.port, config.host, () =>
  logger.info(`Server is listening on ${config.host}:${config.port}`));

