export interface QueryResponse {
  id: string;
  role: string;
  parts: QueryResponsePart[];
  metadata: Metadata;
}

export interface QueryResponsePart {
  type: "step-start" | "text";
  text?: string;
}

export interface Metadata {
  assistant: AssistantMetadata;
  sessionID: string;
  time: TimeMetadata;
}

export interface AssistantMetadata {
  system: string[];
  cost: number;
  tokens: Tokens;
  modelID: string;
  providerID: string;
}

export interface TimeMetadata {
  created: number;
  completed: number;
}

export interface Tokens {
  input: number;
  output: number;
  reasoning: number;
  cache: {
    write: number;
    read: number;
  };
}
