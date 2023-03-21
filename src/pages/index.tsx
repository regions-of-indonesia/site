import { useCallback, useEffect, useMemo, useState } from "react";

import {
  ActionIcon,
  Anchor,
  Badge,
  Box,
  Button,
  Container,
  Grid,
  Group,
  ScrollArea,
  Select,
  Stack,
  Table,
  Text,
  TextInput,
  Tooltip,
  useMantineColorScheme,
} from "@mantine/core";
import type { MantineColor, SelectItem } from "@mantine/core";
import { Prism } from "@mantine/prism";

import { IconArrowRight, IconBrandGithub, IconMoon, IconSun } from "@tabler/icons-react";

import type { CodeName } from "@regions-of-indonesia/client";

import { APP } from "~/const/app";
import { useProvinces, useDistricts, useSubdistricts, useVillages, useSearch } from "~/hooks/regions-of-indonesia-swr";

function codenameToData(codenames: CodeName[]): SelectItem[] {
  return codenames.map(({ code, name }) => {
    return { value: code, label: name };
  });
}

function transposeSearch(search: { provinces: CodeName[]; districts: CodeName[]; subdistricts: CodeName[]; villages: CodeName[] }) {
  const length = Math.max(search.provinces.length, search.districts.length, search.subdistricts.length, search.villages.length),
    array: { key: string; province?: CodeName; district?: CodeName; subdistrict?: CodeName; village?: CodeName }[] = [];

  for (let i = 0; i < length; i++) {
    const province = search.provinces[i],
      district = search.districts[i],
      subdistrict = search.subdistricts[i],
      village = search.villages[i],
      key = `${province?.code ?? "null"}-${district?.code ?? "null"}-${subdistrict?.code ?? "null"}-${village?.code ?? "null"}`;

    array.push({ key, province, district, subdistrict, village });
  }

  return array;
}

function GithubLink() {
  return (
    <Tooltip label="Github" withinPortal>
      <ActionIcon component="a" href={APP.link.github} aria-label="Github">
        <IconBrandGithub />
      </ActionIcon>
    </Tooltip>
  );
}

function ColorSchemeToggler() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Tooltip label="Color scheme" withinPortal>
      <ActionIcon onClick={() => toggleColorScheme()} aria-label="Color scheme">
        {colorScheme === "dark" ? <IconSun /> : <IconMoon />}
      </ActionIcon>
    </Tooltip>
  );
}

function IndexPage() {
  const [provinceCode, setProvinceCode] = useState<string>(""),
    [districtCode, setDistrictCode] = useState<string>(""),
    [subdistrictCode, setSubdistrictCode] = useState<string>(""),
    [villageCode, setVillageCode] = useState<string>("");

  const [name, setName] = useState<string>("");

  const { data: provinces } = useProvinces(),
    { data: districts } = useDistricts(provinceCode),
    { data: subdistricts } = useSubdistricts(districtCode),
    { data: villages } = useVillages(subdistrictCode);

  const { data: search } = useSearch(name);

  useEffect(() => {
    setDistrictCode("");
  }, [provinceCode]);

  useEffect(() => {
    setSubdistrictCode("");
  }, [districtCode]);

  useEffect(() => {
    setVillageCode("");
  }, [subdistrictCode]);

  const provincesData = useMemo(() => (provinces ? codenameToData(provinces) : []), [JSON.stringify(provinces)]),
    districtsData = useMemo(() => (districts ? codenameToData(districts) : []), [JSON.stringify(districts)]),
    subdistrictsData = useMemo(() => (subdistricts ? codenameToData(subdistricts) : []), [JSON.stringify(subdistricts)]),
    villagesData = useMemo(() => (villages ? codenameToData(villages) : []), [JSON.stringify(villages)]);

  const transposedSearch = useMemo(() => (search ? transposeSearch(search) : []), [JSON.stringify(search)]);

  const prismStringify = useCallback((value: any) => JSON.stringify(value, null, 2), []),
    getHighlightLines = useCallback((codenames: CodeName[], selectedCode: string) => {
      type Result = Record<string, { color: MantineColor; label?: string }>;

      if (codenames.length === 0 || !selectedCode) return {} as Result;

      const index = codenames.findIndex(({ code }) => code === selectedCode);

      if (index < 0) return {} as Result;

      const value = 1 + (1 + index * 4);

      const lines = Array(4)
        .fill(null)
        .map((_, i) => i + value);

      const property: Result[string] = { color: "primary", label: "|" };

      return lines.reduce(
        (obj, line) => {
          obj[line] = property;
          return obj;
        },
        { [`${value}`]: { color: "green" } } as Result
      );
    }, []);

  const getPrismProperties = useCallback((codenames: CodeName[], selectedCode: string) => {
      return { children: prismStringify(codenames), highlightLines: getHighlightLines(codenames, selectedCode) };
    }, []),
    prismProvinces = useMemo(() => getPrismProperties(provinces || [], provinceCode), [JSON.stringify(provinces), provinceCode]),
    prismDistricts = useMemo(() => getPrismProperties(districts || [], districtCode), [JSON.stringify(districts), districtCode]),
    prismSubdistricts = useMemo(
      () => getPrismProperties(subdistricts || [], subdistrictCode),
      [JSON.stringify(subdistricts), subdistrictCode]
    ),
    prismVillages = useMemo(() => getPrismProperties(villages || [], villageCode), [JSON.stringify(villages), villageCode]);

  return (
    <>
      <Container size="xl">
        <Group position="apart" py="xs">
          <Group>
            <Anchor href="/" size="xl" variant="text" weight={700}>
              Regions of Indonesia
            </Anchor>

            <Badge variant="outline">Beta</Badge>
          </Group>

          <Group>
            <Tooltip label="Documentation" withinPortal>
              <Button component="a" href={APP.link.docs} rightIcon={<IconArrowRight />} variant="outline">
                Docs
              </Button>
            </Tooltip>

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
                    onChange={(value) => {
                      if (value != null) setProvinceCode(value);
                    }}
                  />

                  <ScrollArea mt="md" sx={{ height: 400 }}>
                    <Prism language="json" noCopy withLineNumbers highlightLines={prismProvinces.highlightLines}>
                      {prismProvinces.children}
                    </Prism>
                  </ScrollArea>
                </Grid.Col>
                <Grid.Col span={12} md={6} xl={3}>
                  <Select
                    sx={{ flexGrow: 1 }}
                    label="District"
                    placeholder="Pick district..."
                    nothingFound="Nothing found"
                    data={districtsData}
                    value={districtCode}
                    onChange={(value) => {
                      if (value != null) setDistrictCode(value);
                    }}
                  />

                  <ScrollArea mt="md" sx={{ height: 400 }}>
                    <Prism language="json" noCopy withLineNumbers highlightLines={prismDistricts.highlightLines}>
                      {prismDistricts.children}
                    </Prism>
                  </ScrollArea>
                </Grid.Col>
                <Grid.Col span={12} md={6} xl={3}>
                  <Select
                    sx={{ flexGrow: 1 }}
                    label="Subdistrict"
                    placeholder="Pick subdistrict..."
                    nothingFound="Nothing found"
                    data={subdistrictsData}
                    value={subdistrictCode}
                    onChange={(value) => {
                      if (value != null) setSubdistrictCode(value);
                    }}
                  />

                  <ScrollArea mt="md" sx={{ height: 400 }}>
                    <Prism language="json" noCopy withLineNumbers highlightLines={prismSubdistricts.highlightLines}>
                      {prismSubdistricts.children}
                    </Prism>
                  </ScrollArea>
                </Grid.Col>
                <Grid.Col span={12} md={6} xl={3}>
                  <Select
                    sx={{ flexGrow: 1 }}
                    label="Village"
                    placeholder="Pick village..."
                    nothingFound="Nothing found"
                    data={villagesData}
                    value={villageCode}
                    onChange={(value) => {
                      if (value != null) setVillageCode(value);
                    }}
                  />

                  <ScrollArea mt="md" sx={{ height: 400 }}>
                    <Prism language="json" noCopy withLineNumbers highlightLines={prismVillages.highlightLines}>
                      {prismVillages.children}
                    </Prism>
                  </ScrollArea>
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
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
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
