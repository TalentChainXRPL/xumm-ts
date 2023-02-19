import { ApplicationDetails } from "xumm-sdk/dist/src/types";

import ping from "./ping";

export const getPingResponse = async (): Promise<boolean> => {
  const pingResponse: ApplicationDetails = await ping();

  if (!!pingResponse?.application?.name && pingResponse.application.disabled == 0) {
    return true;
  }

  return false;
};
