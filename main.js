/**
 * Copyright © 2017-present Kriasoft. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* ::
export type default = (
  onUpdate: (ips: string[]) => void,
  onError: (err: Error) => void,
  options: ?{ interval: number }
);
export type CLOUDFLARE_IPS_V4_URL = string;
export type CLOUDFLARE_IPS_V6_URL = string;
*/

const fetch = require('./fetch');

const noop = () => {};

const CLOUDFLARE_IPS_V4_URL = 'https://www.cloudflare.com/ips-v4';
const CLOUDFLARE_IPS_V6_URL = 'https://www.cloudflare.com/ips-v6';

let interval;
let ips = require('./ips');

function fetchIPs(onUpdate, onError) {
  let result = [null, null];
  const done = (index, err, data) => {
    if (err) {
      onError(err);
      return;
    }

    result[index] = data;

    if (result.every(x => x !== null)) {
      result = result[0].concat(result[1]);
      if (
        ips.length !== result.length ||
        ips.some((ip, i) => ip !== result[i])
      ) {
        onUpdate((ips = result));
      }
    }
  };

  fetch(CLOUDFLARE_IPS_V4_URL, done.bind(undefined, 0));
  fetch(CLOUDFLARE_IPS_V6_URL, done.bind(undefined, 1));
}

module.exports = function cloudflareIPs(onUpdate, onError, options) {
  if (typeof onError !== 'function') {
    onError = noop; // eslint-disable-line no-param-reassign
    options = onError; // eslint-disable-line no-param-reassign
  }

  if (!options) {
    options = {}; // eslint-disable-line no-param-reassign
  }

  if (interval) {
    clearInterval(interval);
  }

  interval = setInterval(() => {
    fetchIPs(onUpdate, onError);
  }, options.interval || 43200000 /* 12 hours */);

  onUpdate(ips);
  fetchIPs(onUpdate, onError);
};

module.exports.CLOUDFLARE_IPS_V4_URL = CLOUDFLARE_IPS_V4_URL;
module.exports.CLOUDFLARE_IPS_V6_URL = CLOUDFLARE_IPS_V6_URL;
