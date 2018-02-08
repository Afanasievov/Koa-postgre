const path = require('path');
const fs = require('fs');
const { paths } = require('../../config/routes');

/**
 * Bootstrap & auto load the routes
 * @type {posix|exports|module.exports}
 */
module.exports = (app) => {
  const baseUrl = paths.api;
  const bootstrap = (dir) => {
    const readDirRecursive = (folder) => {
      if (fs.statSync(folder).isDirectory()) {
        return Array.prototype
          .concat(...fs.readdirSync(folder)
            .map(f => readDirRecursive(path.join(folder, f))));
      }
      return folder;
    };
    const isNotIndexFile = file => path.basename(file).toLowerCase() !== 'index.js';

    const isJsFile = file => path.extname(file).toLowerCase() === '.js';

    const files = readDirRecursive(dir)
      .filter(isJsFile)
      .filter(isNotIndexFile);

    return files;
  };

  const load = (file) => {
    const router = require(file); // eslint-disable-line

    router.prefix(baseUrl);

    app.use(router.routes());
  };

  bootstrap(__dirname).forEach(load);
};
