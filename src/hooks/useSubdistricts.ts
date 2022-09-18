import useSWR from "swr";

import { client } from "~/libs/regions-of-indonesia-client";

async function fetcher(_: string, districtCode: string) {
  return await client.subdistrict.findByDistrictCode(districtCode);
}

function useSubdistricts(districtCode: string | null) {
  return useSWR(() => (districtCode !== null ? ["subdistricts", districtCode] : null), fetcher);
}

export default useSubdistricts;
