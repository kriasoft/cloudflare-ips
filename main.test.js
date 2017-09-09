/**
 * Copyright © 2017-present Kriasoft. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-env jest */
/* eslint-disable global-require */

beforeEach(() => {
  jest.resetModules();
});

test('cloudfalreIPs(done) returns the list if IPs from cache', () => {
  jest.doMock('./ips', () => ['one', 'two']);
  jest.doMock('./fetch', () =>
    jest
      .fn()
      .mockImplementationOnce((err, cb) => cb(null, ['one']))
      .mockImplementationOnce((err, cb) => cb(null, ['two']))
  );
  const cloudflareIPs = require('./main');
  const onUpdate = jest.fn();
  const onError = jest.fn();
  cloudflareIPs(onUpdate, onError);
  expect(onUpdate.mock.calls.length).toBe(1);
  expect(onUpdate.mock.calls[0][0]).toEqual(['one', 'two']);
  expect(onError.mock.calls.length).toBe(0);
});

test('cloudfalreIPs(done) returns the list if IPs from CloudFlare.com (1)', () => {
  jest.doMock('./ips', () => ['one', 'two']);
  jest.doMock('./fetch', () =>
    jest
      .fn()
      .mockImplementationOnce((err, cb) => cb(null, ['one']))
      .mockImplementationOnce((err, cb) => cb(null, ['two', 'three']))
  );
  const cloudflareIPs = require('./main');
  const onUpdate = jest.fn();
  const onError = jest.fn();
  cloudflareIPs(onUpdate, onError);
  expect(onUpdate.mock.calls.length).toBe(2);
  expect(onUpdate.mock.calls[0][0]).toEqual(['one', 'two']);
  expect(onUpdate.mock.calls[1][0]).toEqual(['one', 'two', 'three']);
  expect(onError.mock.calls.length).toBe(0);
});

test('cloudfalreIPs(done) returns the list if IPs from CloudFlare.com (2)', () => {
  jest.doMock('./ips', () => ['one', 'two']);
  jest.doMock('./fetch', () =>
    jest
      .fn()
      .mockImplementationOnce((err, cb) => cb(null, ['one']))
      .mockImplementationOnce((err, cb) => cb(null, ['three']))
  );
  const cloudflareIPs = require('./main');
  const onUpdate = jest.fn();
  const onError = jest.fn();
  cloudflareIPs(onUpdate, onError);
  expect(onUpdate.mock.calls.length).toBe(2);
  expect(onUpdate.mock.calls[0][0]).toEqual(['one', 'two']);
  expect(onUpdate.mock.calls[1][0]).toEqual(['one', 'three']);
  expect(onError.mock.calls.length).toBe(0);
});
