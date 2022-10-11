import { RegionsOfIndonesiaClient, log, cache } from "@regions-of-indonesia/client";

import { createLocalForageDriver } from "@regions-of-indonesia/localforage";

const driver = createLocalForageDriver();

const client = new RegionsOfIndonesiaClient({
  middlewares: [
    //
    log({ key: true }),
    cache({ driver }),
  ],
});

export { client };
