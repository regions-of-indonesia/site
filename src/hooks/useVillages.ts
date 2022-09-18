import useSWR from "swr";

import { client } from "~/libs/regions-of-indonesia-client";

async function fetcher(_: string, subdistrictCode: string) {
  return await client.village.findBySubdistrictCode(subdistrictCode);
}

function useVillages(subdistrictCode: string | null) {
  return useSWR(() => (subdistrictCode !== null ? ["villages", subdistrictCode] : null), fetcher);
}

export default useVillages;
