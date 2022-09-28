import { createSWR } from "@regions-of-indonesia/swr";

import { client } from "~/libs/regions-of-indonesia-client";

export const { useProvinces, useDistricts, useSubdistricts, useVillages, useSearch } = createSWR(client);
