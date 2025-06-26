import { Action, ActionPanel, Icon, showToast, Toast } from "@raycast/api";
import { sendNewMessage } from "./functions";
import { app$, loading$, query$, Thread } from "./provider";

export default function ActionPanelOptions({ thread }: { thread?: Thread }) {
  return (
    <ActionPanel>
      <Action
        title="Get Answer"
        icon={Icon.SpeechBubbleActive}
        onAction={async () => {
          const query = query$.get();
          if (query.trim().length == 0) {
            await showToast({ style: Toast.Style.Failure, title: "Query cannot be empty" });
            return;
          }
          loading$.set(true);
          const toast = await showToast({ style: Toast.Style.Animated, title: "Query..." });
          const response = await sendNewMessage(query);
          await app$.addThread({ query, response });
          loading$.set(false);
          query$.set("");
          toast.hide();
        }}
      />
      {thread && (
        <>
          <Action.CopyToClipboard
            title="Copy Answer"
            content={thread.parts.map((i) => i.text).join("\n")}
            shortcut={{ modifiers: ["cmd", "shift"], key: "c" }}
          />

          <Action
            title="Delete Entry"
            style={Action.Style.Destructive}
            icon={Icon.Trash}
            onAction={() => {
              app$.deleteThread(thread);
              showToast({ style: Toast.Style.Success, title: "Entry deleted" });
            }}
            shortcut={{ modifiers: ["cmd", "shift"], key: "x" }}
          />
        </>
      )}

      <Action
        title="Delete All Entries"
        style={Action.Style.Destructive}
        icon={Icon.Trash}
        onAction={() => app$.deleteAllThreads()}
        shortcut={{ modifiers: ["cmd", "shift"], key: "d" }}
      />
    </ActionPanel>
  );
}
