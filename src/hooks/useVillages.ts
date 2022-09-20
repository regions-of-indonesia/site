import useSWR from "swr";

import { client } from "~/libs/regions-of-indonesia-client";

async function fetcher(_: string, subdistrictCode: string) {
  return await client.village.findBySubdistrictCode(subdistrictCode);
}

function useVillages(subdistrictCode: string) {
  return useSWR(() => (subdistrictCode !== "" ? ["villages", subdistrictCode] : null), fetcher);
}

export default useVillages;
