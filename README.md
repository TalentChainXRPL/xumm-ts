# xumm-ts TypeScript Code Samples for XUMM &middot; ![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)

This is an open source, public repository by TalentChain, providing code samples in TypeScript for XRPL community to interact, connect with XUMM, a XRPL supported wallet.

## Setting Up this Repository

- **[Node.js](https://nodejs.org/)** must be installed on the machine to run the code snippets.

In the root directory of this project, execute the following command:

```
$ npm install --save
```

### All features are available as typeScript functions in the `src/index.ts` file, as well as code samples below.

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

If ping is successful, we can interact with xumm.

### Following is a complete example of sign-in transactoin for XUMM using Node.js with TypeScript

## Sign In XUMM

```ts
import { XummSdk } from 'xumm-sdk';
import { verifySignature } from 'verify-xrpl-signature';
import { ApplicationDetails } from "xumm-sdk/dist/src/types";

class Wallet {
  // Method to get user's uuid for sign-in transaction
	private signinListener = async (event) => {
		if (event.data.signed === true) {
			return event.data;
		} else {
			return false;
		}
	};

  // Method to listen for "payload_uuidv4"
  private listenToSigninEvent = (payload_uuid) => {
    const url = `wss://xumm.app/sign/${payload_uuid}`;
    const connection = new WebSocket(url);

    connection.onopen = () => {
      connection.send('Message From Client');
    };

    connection.onerror = (error) => {
      // An error occurred!
    };

    connection.onmessage = (e) => {
      const object: any = JSON.parse(e.data.toString());
      if ('payload_uuidv4' in object) {
        this.getUserToken(object.payload_uuidv4);
        connection.close();
      }
    };
  };

  // Method to check if transaction was signed or not
  private getUserToken = async (uuid: string) => {
    const result = await xummSdk.payload.get(uuid);

    try {
      if (
        result.meta.signed &&
        result.meta.resolved &&
        !!result.response.hex &&
        !!result.response.account
      ) {
        if (
          this.verifySigninTransaction(
            result.response.hex,
            result.response.account,
          )
        ) {
          // User logged in successfully 

          /*
          Following are key values to take from "result" object

          1) result.response.account (XRPL wallet address that signed the transaction on XUMM)
          2) result.application.issued_user_token, (XUMM token for signing user)
          3) result.payload.expires_at, (XUMM token expiry)

          */

        } else {
          // Sign-in attempt falied because transaction signature didn't validate
        }
      } else {
        // Sign-in attempt falied because user cancelled or declined the transaction
      }
    } catch (error) {
      // Handle error
    }
  };

  // Method to verify transaction signature
  private verifySigninTransaction = (tx: string, address: string): boolean => {
    const response = verifySignature(tx);
    return true
      ? response.signedBy === address && response.signatureValid
      : false;
  };

  // Main "Sign In" method
	public signIn = () => {
		const pingResponse: Promise<ApplicationDetails> = await xummSdk.ping();

		if (pingResponse?.application?.disabled == 0) {
			// Let's prepare a transaction and add the listener above to it.
			const subscription = await xummSdk.payload.createAndSubscribe(
				{
					TransactionType: 'SignIn', // Transaction Type
				},
				this.signinListener // Event listener above
			);

      if (!subscription) {
        return {
        success: false,
        qrCode: '',
      }
      } else {

      }
		} else {
      return {
        success: false,
        qrCode: '',
      }
    }
	};
}
```
