import { RegionsOfIndonesiaClient, log, cache } from "@regions-of-indonesia/client";

import { createInstance } from "localforage";

const storage = createInstance({ name: "regions-of-indonesia" });

const driver = {
  async get(key: string) {
    return await storage.getItem(key);
  },
  async set(key: string, value: any) {
    await storage.setItem(key, value);
  },
  async delete(key: string) {
    await storage.removeItem(key);
  },
};

const client = new RegionsOfIndonesiaClient({
  middlewares: [log({ key: true }), cache({ driver })],
});

export { client };
