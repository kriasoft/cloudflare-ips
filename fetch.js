/**
 * Copyright © 2017-present Kriasoft. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

const https = require('https');

module.exports = function fetch(url, cb) {
  let chunks = '';
  https
    .get(url, res => {
      if (res.statusCode !== 200) {
        cb(
          new Error(['HTTP ', res.statusCode, ': ', res.statusMessage].join(''))
        );
        res.resume();
        return;
      }

      const contentType = res.headers['content-type'];

      if (!/^text\/plain/.test(contentType)) {
        cb(
          new Error(
            `Content type is invalid. Expected "text/plain" but got "${contentType}".`
          )
        );
        res.resume();
        return;
      }

      res.setEncoding('utf8');
      res.on('data', chunk => {
        chunks += chunk;
      });
      res.on('end', () => cb(null, chunks.trim().split('\n')));
    })
    .on('error', cb);
};
