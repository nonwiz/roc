import { getPreferenceValues } from "@raycast/api";
import fetch from "node-fetch";
import { QueryResponse } from "../../types";

const preference = getPreferenceValues<Preferences>();
const apiUrl = preference.apiUrl;
const sessionID = preference.sessionID.trim();

export const sendNewMessage = async (message: string): Promise<QueryResponse> => {
  const attempt = await fetch(apiUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sessionID: sessionID,
      providerID: preference.providerID,
      modelID: preference.modelID,
      parts: [
        {
          type: "text",
          text: message,
        },
      ],
    }),
  });
  return (await attempt.json()) as QueryResponse;
};
