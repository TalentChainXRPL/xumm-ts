# xumm-ts TypeScript Code Samples for XUMM &middot; ![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)

This is an open source, public repository by TalentChain, providing code samples in TypeScript for XRPL community to interact, connect with XUMM, a XRPL supported wallet.

## Setting Up this Repository

+ **[Node.js](https://nodejs.org/)** must be installed on the machine to run the code snippets. 


In the root directory of this project, execute the following command:

```
$ npm install --save
```

### All features are available as typeScript functions in the ```src/index.ts``` file.


# Code Samples

## Import XUMM-SDK

```ts

import { XummSdk } from 'xumm-sdk';

```

## Initialize XUMM-SDK with API Key & Secret

```ts

const xummSdk: XummSdk = new XummSdk('yourA.P.I.Key', 'yourA.P.I.Secret');

```

## Ping

Ping is an async function 

```ts

const pingResponse: Promise<ApplicationDetails> = await xummSdk.ping();


if (pingResponse?.application?.disabled == 0) {
  // This means you've successfully connected to the xumm sdk.
}

```


