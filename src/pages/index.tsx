import { memo, useEffect, useMemo, useState } from "react";

import {
  ActionIcon,
  Anchor,
  Badge,
  Box,
  Button,
  Center,
  Container,
  Grid,
  Group,
  List,
  Loader,
  Modal,
  Paper,
  Select,
  Stack,
  Table,
  Text,
  TextInput,
  ThemeIcon,
  Tooltip,
  useMantineColorScheme,
} from "@mantine/core";
import type { CSSObject, MantineTheme, ModalProps } from "@mantine/core";
import type { SelectItem } from "@mantine/core";

import { IconBooks, IconBrandGithub, IconCircleCheck, IconMoon, IconSearch, IconSelect, IconSun } from "@tabler/icons-react";

import type { CodeName } from "@regions-of-indonesia/client";

import { APP } from "~/const/app";
import { useProvinces, useDistricts, useSubdistricts, useVillages, useSearch } from "~/hooks/regions-of-indonesia-swr";
import { RenderPixels } from "~/components/core";

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

function DocsButtoLink() {
  return (
    <Tooltip label="Docs" withinPortal>
      <Button component="a" href={APP.link.docs} variant="filled" leftIcon={<IconBooks />} aria-label="Docs">
        Docs
      </Button>
    </Tooltip>
  );
}

function GithubButtoLink() {
  return (
    <Tooltip label="Github" withinPortal>
      <Button component="a" href={APP.link.github} variant="outline" leftIcon={<IconBrandGithub />} aria-label="Github">
        Github
      </Button>
    </Tooltip>
  );
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

const SelectModal = memo((props: ModalProps) => {
  const [provinceCode, setProvinceCode] = useState<string>(""),
    [districtCode, setDistrictCode] = useState<string>(""),
    [subdistrictCode, setSubdistrictCode] = useState<string>(""),
    [villageCode, setVillageCode] = useState<string>("");

  const { data: provinces, isLoading: isProvincesLoading } = useProvinces(),
    { data: districts, isLoading: isDistrictsLoading } = useDistricts(provinceCode),
    { data: subdistricts, isLoading: isSubdistrictsLoading } = useSubdistricts(districtCode),
    { data: villages, isLoading: isVillagesLoading } = useVillages(subdistrictCode);

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

  const getNothingFound = (loading: boolean) => <Center> {loading ? <Loader /> : "Nothing Found"}</Center>;

  return (
    <Modal title="Select" size="clamp(20rem, 90vw, 70rem)" {...props}>
      <Box p="sm">
        <Grid gutter="xl">
          <Grid.Col span={12} md={6} xl={3}>
            <Select
              sx={{ flexGrow: 1 }}
              label="Province"
              placeholder="Pick province..."
              nothingFound={getNothingFound(isProvincesLoading)}
              data={provincesData}
              value={provinceCode}
              onChange={(value) => {
                if (value != null) setProvinceCode(value);
              }}
              withinPortal
              data-autofocus
            />
          </Grid.Col>

          <Grid.Col span={12} md={6} xl={3}>
            <Select
              sx={{ flexGrow: 1 }}
              label="District"
              placeholder="Pick district..."
              nothingFound={getNothingFound(isDistrictsLoading)}
              data={districtsData}
              value={districtCode}
              onChange={(value) => {
                if (value != null) setDistrictCode(value);
              }}
              withinPortal
            />
          </Grid.Col>

          <Grid.Col span={12} md={6} xl={3}>
            <Select
              sx={{ flexGrow: 1 }}
              label="Subdistrict"
              placeholder="Pick subdistrict..."
              nothingFound={getNothingFound(isSubdistrictsLoading)}
              data={subdistrictsData}
              value={subdistrictCode}
              onChange={(value) => {
                if (value != null) setSubdistrictCode(value);
              }}
              withinPortal
            />
          </Grid.Col>

          <Grid.Col span={12} md={6} xl={3}>
            <Select
              sx={{ flexGrow: 1 }}
              label="Village"
              placeholder="Pick village..."
              nothingFound={getNothingFound(isVillagesLoading)}
              data={villagesData}
              value={villageCode}
              onChange={(value) => {
                if (value != null) setVillageCode(value);
              }}
              withinPortal
            />
          </Grid.Col>
        </Grid>
      </Box>
    </Modal>
  );
});

const SearchModal = memo((props: ModalProps) => {
  const [name, setName] = useState<string>("");

  const { data: search } = useSearch(name);

  const transposedSearch = useMemo(() => (search ? transposeSearch(search) : []), [JSON.stringify(search)]);

  return (
    <Modal title="Search" size="clamp(20rem, 90vw, 70rem)" {...props}>
      <Box p="sm">
        <Stack>
          <TextInput
            label="Search"
            placeholder="Name..."
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
            data-autofocus
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
    </Modal>
  );
});

const sxPaperButton = (theme: MantineTheme): CSSObject => ({
  width: "100%",
  cursor: "pointer",

  ":hover": {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
  },
});

function IndexPage() {
  const [open, setOpen] = useState<"select" | "region" | "search" | null>(null);

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <Box pos="fixed" top={0} left={0} w="100vw" h="100vh" sx={{ zIndex: 0 }}>
        <RenderPixels />
      </Box>

      <Container size="xl" sx={{ position: "relative", zIndex: 100 }}>
        <Group position="apart" py="xs">
          <Group>
            <Anchor href="/" size="xl" variant="text" weight={700}>
              Regions of Indonesia
            </Anchor>

            <Badge variant="outline">Beta</Badge>
          </Group>

          <Group>
            <Badge variant="outline">v4.0.0</Badge>

            <GithubLink />

            <ColorSchemeToggler />
          </Group>
        </Group>
      </Container>

      <Container size="md" sx={{ position: "relative", zIndex: 200 }}>
        <Box p="xl">
          <Grid p="xl" gutter="xl">
            <Grid.Col span={12} md={6}>
              <Paper
                p="xl"
                component="button"
                withBorder
                onClick={() => {
                  setOpen("select");
                }}
                sx={sxPaperButton}
              >
                <Group position="apart">
                  <Text size="xl">Select</Text>
                  <IconSelect size={32} />
                </Group>
              </Paper>
            </Grid.Col>

            {/* <Grid.Col span={12} md={6}>
              <Paper
                p="xl"
                component="button"
                
                withBorder
                onClick={() => {
                  setOpen("region");
                }}
                sx={sxPaperButton}
              >
                <Group position="apart">
                  <Text size="xl">Region</Text>
                  <IconBinaryTree size={32} />
                </Group>
              </Paper>
            </Grid.Col> */}

            <Grid.Col span={12} md={6}>
              <Paper
                p="xl"
                component="button"
                withBorder
                onClick={() => {
                  setOpen("search");
                }}
                sx={sxPaperButton}
              >
                <Group position="apart">
                  <Text size="xl">Search</Text>
                  <IconSearch size={32} />
                </Group>
              </Paper>
            </Grid.Col>
          </Grid>
        </Box>

        <Box p="xl">
          <Container size="xs">
            <Paper p="xl" withBorder>
              <List
                spacing="sm"
                size="sm"
                center
                icon={
                  <ThemeIcon size={24}>
                    <IconCircleCheck size="1.25rem" />
                  </ThemeIcon>
                }
              >
                <List.Item>First class Typescript support</List.Item>
                <List.Item>Framework Agnostic</List.Item>
                <List.Item>Out of box integration libraries.</List.Item>
                <List.Item>Open Source under GPL-3.0</List.Item>
              </List>
            </Paper>
          </Container>
        </Box>

        <Box p="xl">
          <Group position="center" spacing="md">
            <DocsButtoLink />

            <GithubButtoLink />
          </Group>
        </Box>
      </Container>

      <SelectModal opened={open === "select"} onClose={handleClose} />

      <SearchModal opened={open === "search"} onClose={handleClose} />
    </>
  );
}

export default IndexPage;
