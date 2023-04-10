import { create, log, cache } from "@regions-of-indonesia/client";

import { createLocalForageDriver } from "@regions-of-indonesia/localforage";

const driver = createLocalForageDriver();

const client = create({
  middlewares: [
    log({
      key: true,
    }),
    cache({
      driver,
    }),
  ],
  static: false,
});

export { client };
