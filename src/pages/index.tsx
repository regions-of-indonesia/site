import { useEffect, useMemo, useState } from "react";

import {
  ActionIcon,
  Box,
  Button,
  Container,
  Grid,
  Group,
  Select,
  Stack,
  Table,
  Text,
  TextInput,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import type { SelectItem } from "@mantine/core";

import { IconArrowRight, IconBrandGithub, IconMoon, IconSun } from "@tabler/icons";

import type { CodeName } from "@regions-of-indonesia/client";

import { APP } from "~/const/app";
import { useProvinces, useDistricts, useSubdistricts, useVillages, useSearch } from "~/hooks/regions-of-indonesia-swr";

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

    const key = `${province?.code ?? "null"}-${district?.code ?? "null"}-${subdistrict?.code ?? "null"}-${village?.code ?? "null"}`;

    array.push({ key, province, district, subdistrict, village });
  }

  return array;
}

function GithubLink() {
  return (
    <ActionIcon component="a" href={APP.link.github}>
      <IconBrandGithub />
    </ActionIcon>
  );
}

function ColorSchemeToggler() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return <ActionIcon onClick={() => toggleColorScheme()}>{colorScheme === "dark" ? <IconSun /> : <IconMoon />}</ActionIcon>;
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
    <>
      <Container size="xl">
        <Group position="apart" py="xs">
          <Title>Regions of Indonesia</Title>

          <Group>
            <Button component="a" href={APP.link.docs} rightIcon={<IconArrowRight />} variant="outline">
              Docs
            </Button>

            <GithubLink />

            <ColorSchemeToggler />
          </Group>
        </Group>
      </Container>

      <Container size="xl">
        <Stack p="md" spacing="xl">
          <Stack my="md">
            <Text align="center" size="xl">
              Basic
            </Text>

            <Box>
              <Grid gutter="xl">
                <Grid.Col span={12} md={6} xl={3}>
                  <Select
                    sx={{ flexGrow: 1 }}
                    label="Province"
                    placeholder="Pick province..."
                    nothingFound="Nothing found"
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
                    nothingFound="Nothing found"
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
                    nothingFound="Nothing found"
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
                    nothingFound="Nothing found"
                    data={villagesData}
                    value={villageCode}
                    onChange={setVillageCode}
                  />
                </Grid.Col>
              </Grid>
            </Box>
          </Stack>

          <Stack my="md">
            <Text align="center" size="xl">
              Search
            </Text>

            <Box>
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
    </>
  );
}

export default IndexPage;
