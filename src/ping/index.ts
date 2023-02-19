import { ApplicationDetails } from "xumm-sdk/dist/src/types";

import xummSdk from "../xumm-sdk";

export const ping = async (): Promise<ApplicationDetails> => {
  return await xummSdk.ping();
};

export default ping;
