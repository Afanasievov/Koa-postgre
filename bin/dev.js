const application = require('../src/server/index.js');
const logger = require('../src/server/services/logger');
const config = require('../src/server/config/server.config.js');

application.listen(config.port, config.host, () =>
  logger.info(`Server is listening on ${config.host}:${config.port}`));

