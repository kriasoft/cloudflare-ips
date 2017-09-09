/**
 * Copyright © 2017-present Kriasoft. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-env jest */

const cloudflareIPs = require('./main');

test('Calls the provided callback with the list of IPs', done => {
  expect.assertions(2);
  cloudflareIPs((err, list) => {
    expect(err).toBeFalsy();
    expect(list).toMatchSnapshot();
    done();
  });
});
