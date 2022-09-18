import useSWR from "swr";

import { client } from "~/libs/regions-of-indonesia-client";

async function fetcher() {
  return await client.province.find();
}

function useProvinces() {
  return useSWR(`provinces`, fetcher);
}

export default useProvinces;
