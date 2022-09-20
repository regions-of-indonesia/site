import useSWR from "swr";

import { client } from "~/libs/regions-of-indonesia-client";

async function fetcher(_: string, provinceCode: string) {
  return await client.district.findByProvinceCode(provinceCode);
}

function useDistricts(provinceCode: string) {
  return useSWR(() => (provinceCode !== "" ? ["districts", provinceCode] : null), fetcher);
}

export default useDistricts;
