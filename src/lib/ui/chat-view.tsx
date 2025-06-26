import { use$ } from "@legendapp/state/react";
import { Icon, List } from "@raycast/api";
import ActionPanelOptions from "./actions";
import { loading$, query$, threads$ } from "./provider";
import { ThreadMetadata } from "./thread-metadata";

export default function ChatView() {
  const threads = use$(threads$);
  const query = use$(query$);
  const loading = use$(loading$);

  return (
    <List
      isLoading={loading}
      searchText={query}
      onSearchTextChange={query$.set}
      searchBarPlaceholder={threads.length > 0 ? "Continue..." : "Ask a question..."}
      isShowingDetail={threads.length > 0}
      actions={<ActionPanelOptions />}
    >
      <List.EmptyView icon={Icon.Message} title="Ask right away" />
      {threads.map((thread, threadIndex) => (
        <List.Item
          icon={Icon.Message}
          title={thread.query}
          id={`${threadIndex}`}
          key={threadIndex}
          actions={<ActionPanelOptions thread={thread} />}
          detail={
            <List.Item.Detail
              metadata={<ThreadMetadata thread={thread} />}
              markdown={thread.parts.map((i) => i.text).join("\n")}
            />
          }
        />
      ))}
    </List>
  );
}
