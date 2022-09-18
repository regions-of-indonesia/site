import useSWR from "swr";

import { client } from "~/libs/regions-of-indonesia-client";

async function fetcher(key: string, text: string) {
  return await client.search(text);
}

function useSearch(text: string) {
  return useSWR(["search:", text], fetcher);
}

export default useSearch;
