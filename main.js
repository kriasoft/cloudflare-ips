/**
 * Copyright © 2017-present Kriasoft. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* ::
export type default = (err: ?Error, ips: ?Array<string>) => void;
export type CLOUDFLARE_IPS_V4_URL = string;
export type CLOUDFLARE_IPS_V6_URL = string;
*/

const fetch = require('./fetch');

const CLOUDFLARE_IPS_V4_URL = 'https://www.cloudflare.com/ips-v4';
const CLOUDFLARE_IPS_V6_URL = 'https://www.cloudflare.com/ips-v6';

let interval;
let ips = require('./ips');

function fetchIPs(cb) {
  const errors = [];
  let result = [null, null];
  let count = 0;

  const done = (index, err, data) => {
    if (err) {
      errors.push(err);
    } else {
      result[index] = data;
    }

    count += 1;

    if (count === result.length) {
      if (errors.length) {
        cb(errors[0]);
      } else {
        result = result[0].concat(result[1]);
        if (
          ips.length !== result.length ||
          ips.some((ip, i) => ip !== result[i])
        ) {
          cb(null, (ips = result));
        }
      }
    }
  };

  fetch(CLOUDFLARE_IPS_V4_URL, done.bind(this, 0));
  fetch(CLOUDFLARE_IPS_V6_URL, done.bind(this, 1));
}

module.exports = function cloudflareIPs(done, options = {}) {
  if (interval) {
    clearInterval(interval);
  }

  interval = setInterval(() => {
    fetchIPs(done);
  }, options.interval || 43200000 /* 12 hours */);

  done(null, ips);
  fetchIPs(done);
};

module.exports.CLOUDFLARE_IPS_V4_URL = CLOUDFLARE_IPS_V4_URL;
module.exports.CLOUDFLARE_IPS_V6_URL = CLOUDFLARE_IPS_V6_URL;
