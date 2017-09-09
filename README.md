# CloudFlare IP Ranges

[![build status](https://img.shields.io/travis/kriasoft/cloudflare-ips/master.svg?style=flat-square)](https://travis-ci.org/kriasoft/cloudflare-ips)
[![npm version](https://img.shields.io/npm/v/cloudflare-ips.svg?style=flat-square)](https://www.npmjs.com/package/cloudflare-ips)
[![npm downloads](https://img.shields.io/npm/dm/cloudflare-ips.svg?style=flat-square)](https://www.npmjs.com/package/cloudflare-ips)

The list of **[CloudFlare][cloudflare]** IPs (IP ranges) to be used in the *[trust proxy][proxy]*
configurations.


## How to Use

```bash
$ npm install cloudflare-ips    # or, `yarn add cloudflare-ips`
```

```js
const express = require('express');
const cloudflareIPs = require('cloudflare-ips');

const app = express();

cloudflareIPs(
  ips => app.set('trust proxy', ['loopback', ...ips]),
  err => console.error(err.stack),
);

cloudflareIPs((err, ips) => {
  app.set('trust proxy', ['loopback', ...ips]);
});

app.listen(8080);
```

## API

#### `cloudFlareIPs(onUpdate, onError, options)`

* `onUpdate`: `(ips: string[]) => void` — a callback function accepting the list of IPs
* `onError`: `(err: Error) => void` — a callback that is triggered on error (optional)
* `options`: `{ inteval: number }` — allows to tweak the default settings (optional)


## Related Projects

* [Node.js API Starter Kit][nsk] — Boilerplate and tooling for building data APIs with Docker,
  Node.js and GraphQL


## License

Copyright © 2017-present [Kriasoft][kriasoft]. This source code is licensed under the MIT license
found in the [LICENSE.txt][license] file.

---
Made with ♥ by Konstantin Tarkus ([@koistya](https://twitter.com/koistya), [blog](https://medium.com/@tarkus))

[cloudflare]: https://www.cloudflare.com/
[proxy]: https://expressjs.com/en/guide/behind-proxies.html
[nsk]: https://github.com/kriasoft/nodejs-api-starter
[kriasoft]: https://www.kriasoft.com/
[license]: https://github.com/kriasoft/cloudflare-ips/blob/master/LICENSE.txt
