// Simple in-memory outbox (IndexedDB via Dexie would be wired here for production)
// For v1 demo: tracks count of queued actions

let queue: Array<{ id: string; action: string; payload: unknown; ts: number }> = [];

export const outbox = {
  enqueue(action: string, payload: unknown) {
    queue.push({ id: `q-${Date.now()}`, action, payload, ts: Date.now() });
  },
  count: () => queue.length,
  flush() {
    const items = [...queue];
    queue = [];
    return items;
  },
};
