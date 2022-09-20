import { useEffect, useMemo, useState } from "react";

import { Box, Container, Grid, Group, List, Notification, Select, Stack, Table, Text, TextInput, Title } from "@mantine/core";
import type { SelectItem } from "@mantine/core";

import type { CodeName } from "@regions-of-indonesia/client";

import useProvinces from "~/hooks/useProvinces";
import useDistricts from "~/hooks/useDistricts";
import useSubdistricts from "~/hooks/useSubdistricts";
import useVillages from "~/hooks/useVillages";
import useSearch from "~/hooks/useSearch";

function codenameToData(codenames: CodeName[]): SelectItem[] {
  return codenames.map(({ code, name }) => {
    return {
      value: code,
      label: name,
    };
  });
}

function transposeSearch(search: { provinces: CodeName[]; districts: CodeName[]; subdistricts: CodeName[]; villages: CodeName[] }) {
  const length = Math.max(search.provinces.length, search.districts.length, search.subdistricts.length, search.villages.length);

  const array: { key: string; province?: CodeName; district?: CodeName; subdistrict?: CodeName; village?: CodeName }[] = [];

  for (let i = 0; i < length; i++) {
    const province = search.provinces[i];
    const district = search.districts[i];
    const subdistrict = search.subdistricts[i];
    const village = search.villages[i];

    array.push({
      key: `${province?.code ?? "null"}-${district?.code ?? "null"}-${subdistrict?.code ?? "null"}-${village?.code ?? "null"}`,
      province,
      district,
      subdistrict,
      village,
    });
  }

  return array;
}

function IndexPage() {
  const [provinceCode, setProvinceCode] = useState<string>("");
  const [districtCode, setDistrictCode] = useState<string>("");
  const [subdistrictCode, setSubdistrictCode] = useState<string>("");
  const [villageCode, setVillageCode] = useState<string>("");

  const [text, setText] = useState<string>("");

  const { data: provinces } = useProvinces();
  const { data: districts } = useDistricts(provinceCode);
  const { data: subdistricts } = useSubdistricts(districtCode);
  const { data: villages } = useVillages(subdistrictCode);

  const { data: search } = useSearch(text);

  useEffect(() => {
    setDistrictCode("");
  }, [provinceCode]);

  useEffect(() => {
    setSubdistrictCode("");
  }, [districtCode]);

  useEffect(() => {
    setVillageCode("");
  }, [subdistrictCode]);

  const provincesData = useMemo(() => (provinces ? codenameToData(provinces) : []), [JSON.stringify(provinces)]);
  const districtsData = useMemo(() => (districts ? codenameToData(districts) : []), [JSON.stringify(districts)]);
  const subdistrictsData = useMemo(() => (subdistricts ? codenameToData(subdistricts) : []), [JSON.stringify(subdistricts)]);
  const villagesData = useMemo(() => (villages ? codenameToData(villages) : []), [JSON.stringify(villages)]);

  const transposedSearch = useMemo(() => (search ? transposeSearch(search) : []), [JSON.stringify(search)]);

  return (
    <Container size="xl">
      <Stack spacing="xl">
        <Title>Regions of Indonesia</Title>

        <Notification title="Under Development" my="xl" color="yellow" disallowClose>
          Documented Soon
        </Notification>

        <Stack spacing="xl">
          <Text>Features</Text>

          <List withPadding>
            <List.Item>Dynamic API & Static API</List.Item>
            <List.Item>Search API</List.Item>
            <List.Item>Javascript Client SDK with automatic caching</List.Item>
          </List>
        </Stack>

        <Stack spacing="xl">
          <Grid p="xl" gutter="xl">
            <Grid.Col span={12} md={6} xl={3}>
              <Select
                sx={{ flexGrow: 1 }}
                label="Province"
                placeholder="Pick province..."
                data={provincesData}
                value={provinceCode}
                onChange={setProvinceCode}
              />
            </Grid.Col>
            <Grid.Col span={12} md={6} xl={3}>
              <Select
                sx={{ flexGrow: 1 }}
                label="District"
                placeholder="Pick district..."
                data={districtsData}
                value={districtCode}
                onChange={setDistrictCode}
              />
            </Grid.Col>
            <Grid.Col span={12} md={6} xl={3}>
              <Select
                sx={{ flexGrow: 1 }}
                label="Subdistrict"
                placeholder="Pick subdistrict..."
                data={subdistrictsData}
                value={subdistrictCode}
                onChange={setSubdistrictCode}
              />
            </Grid.Col>
            <Grid.Col span={12} md={6} xl={3}>
              <Select
                sx={{ flexGrow: 1 }}
                label="Village"
                placeholder="Pick village..."
                data={villagesData}
                value={villageCode}
                onChange={setVillageCode}
              />
            </Grid.Col>
          </Grid>

          <Box p="xl">
            <Stack>
              <TextInput
                label="Search"
                placeholder="Search..."
                value={text}
                onChange={(event) => {
                  setText(event.target.value);
                }}
              />

              <Table>
                <thead>
                  <tr>
                    <th>Provinces</th>
                    <th>Districts</th>
                    <th>Subdistricts</th>
                    <th>Villages</th>
                  </tr>
                </thead>
                <tbody>
                  {transposedSearch.map(({ key, province, district, subdistrict, village }) => (
                    <tr key={key}>
                      <td>{province && province.name}</td>
                      <td>{district && district.name}</td>
                      <td>{subdistrict && subdistrict.name}</td>
                      <td>{village && village.name}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </Container>
  );
}

export default IndexPage;
