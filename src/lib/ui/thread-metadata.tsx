import { Detail } from "@raycast/api";
import { Thread } from "./provider";

// Helper to format timestamps
function formatTimestamp(ts: number) {
  const date = new Date(ts);
  return date.toLocaleString();
}

export function ThreadMetadata({ thread }: { thread: Thread }) {
  const meta = thread.metadata;
  const assistant = meta.assistant;
  const tokens = assistant.tokens;
  const time = meta.time;

  return (
    <Detail.Metadata>
      {thread.parts.map((part, index) => (
        <Detail.Metadata.Label key={`rp-${index}`} title={`P${index + 1} [${part.type}]`} text={part.text} />
      ))}
      <Detail.Metadata.Label title="Provider" text={`${assistant.providerID}/${assistant.modelID}`} />
      <Detail.Metadata.Label title="Cost" text={assistant.cost.toString()} />
      <Detail.Metadata.Label title="Tokens (Input)" text={tokens.input.toString()} />
      <Detail.Metadata.Label title="Tokens (Output)" text={tokens.output.toString()} />
      <Detail.Metadata.Label title="Tokens (Reasoning)" text={tokens.reasoning.toString()} />
      <Detail.Metadata.Label title="Tokens (Cache Write)" text={tokens.cache.write.toString()} />
      <Detail.Metadata.Label title="Tokens (Cache Read)" text={tokens.cache.read.toString()} />
      <Detail.Metadata.Label title="Created" text={formatTimestamp(time.created)} />
      <Detail.Metadata.Label title="Completed" text={formatTimestamp(time.completed)} />
      <Detail.Metadata.Separator />
      <Detail.Metadata.Label title="Thread ID" text={thread.id} />
      <Detail.Metadata.Label title="Session ID" text={meta.sessionID} />
    </Detail.Metadata>
  );
}
