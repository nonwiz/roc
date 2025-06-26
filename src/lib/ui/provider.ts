import { internal, observable } from "@legendapp/state";
import { syncObservable } from "@legendapp/state/sync";
import { LocalStorage } from "@raycast/api";
import { Metadata, QueryResponse, QueryResponsePart } from "../../types";
const { safeParse, safeStringify } = internal;

export const THREADS_KEY = "roc-threads";

export interface Thread {
  id: string;
  query: string;
  parts: Array<QueryResponsePart>;
  metadata: Metadata;
}

export interface AddThreadProps {
  query: string;
  response: QueryResponse;
}

export const threads$ = observable<Array<Thread>>([]);
export const query$ = observable<string>("");
export const loading$ = observable<boolean>(false);

export const app$ = observable({
  addThread: async (props: AddThreadProps) => {
    const { metadata } = props.response;
    const thread = {
      id: props.response.id,
      query: props.query,
      parts: props.response.parts.filter((i) => i.type != "step-start"),
      metadata: metadata,
    };
    threads$.unshift(thread);
    await LocalStorage.setItem(THREADS_KEY, safeStringify(threads$.get()));
  },
  deleteThread: async (thread: Thread) => {
    const currentThreads = threads$.get();
    const updatedThreads = currentThreads.filter((t) => t.id !== thread.id);
    threads$.set(updatedThreads);
    await LocalStorage.setItem(THREADS_KEY, safeStringify(updatedThreads));
  },
  deleteAllThreads: async () => {
    threads$.set([]);
    await LocalStorage.removeItem(THREADS_KEY);
  },
});

syncObservable(threads$, {
  get: async () => {
    const data = await LocalStorage.getItem(THREADS_KEY);
    return safeParse(data) || [];
  },
});
