# Combell JS

- API Doc: https://api.combell.com/

## Install

```
yarn add combell-js
```

## Usage

### Using "raw client"

```js
import { Client } from 'combell-js';

const client = new Client({
  endpoint: 'https://api.combell.com',
  key: 'KEY',
  secret: 'SECRET',
});

console.log(await client.get('/v2/dns/example.com/records'));
```

### Using a specific library

```js
import { DNS } from 'combell-js';

const dns = new DNS({
  endpoint: 'https://api.combell.com',
  key: 'KEY',
  secret: 'SECRET',
});

console.log(await dns.getRecords('example.com'));
```
