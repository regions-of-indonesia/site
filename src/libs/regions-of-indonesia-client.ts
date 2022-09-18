import { RegionsOfIndonesiaClient, log, cache } from "@regions-of-indonesia/client";
// import type { Middleware } from "@regions-of-indonesia/client";

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

// const delay = () =>
//   new Promise<void>((resolve) => {
//     setTimeout(resolve, 2000);
//   });

// const wait: Middleware = async (context, next) => {
//   await delay();
//   const data = await next();
//   await delay();
//   return data;
// };

const client = new RegionsOfIndonesiaClient({
  middlewares: [log(), cache(driver)],
});

export { client };
