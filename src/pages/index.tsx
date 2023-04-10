import { useState } from "react";

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
  Paper,
  Text,
  ThemeIcon,
  Tooltip,
  useMantineColorScheme,
} from "@mantine/core";
import type { CSSObject, MantineTheme } from "@mantine/core";

import { IconBooks, IconBrandGithub, IconCircleCheck, IconMoon, IconSearch, IconSelect, IconSun } from "@tabler/icons-react";

import { APP } from "~/const/app";

import dynamic from "next/dynamic";

const DynamicRenderPixels = dynamic(() => import("~/components/dynamic/RenderPixels"), { ssr: false });
const DynamicSelectModal = dynamic(() => import("~/components/dynamic/SelectModal"), { ssr: false });
const DynamicSearchModal = dynamic(() => import("~/components/dynamic/SearchModal"), { ssr: false });

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

const sxActionHeader = (theme: MantineTheme): CSSObject => ({ [theme.fn.smallerThan("sm")]: { display: "none" } });
const sxActionMain = (theme: MantineTheme): CSSObject => ({ [theme.fn.largerThan("sm")]: { display: "none" } });

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
        <DynamicRenderPixels />
      </Box>

      <Container size="xl" sx={{ position: "relative", zIndex: 100 }}>
        <Group position="apart" py="xs">
          <Group>
            <Anchor href="/" size="xl" variant="text" weight={700}>
              Regions of Indonesia
            </Anchor>

            <Badge variant="outline">Beta</Badge>
          </Group>

          <Group sx={sxActionHeader}>
            <Badge variant="outline">v4.0.0</Badge>

            <GithubLink />

            <ColorSchemeToggler />
          </Group>
        </Group>
      </Container>

      <Container size="md" sx={{ position: "relative", zIndex: 200 }}>
        <Box p="xl">
          <Text
            sx={(theme) => ({
              fontSize: "4rem",
              textAlign: "center",
              [theme.fn.smallerThan("lg")]: { fontSize: "3rem" },
              [theme.fn.smallerThan("sm")]: { fontSize: "2rem" },
            })}
          >
            Regions of Indonesia
          </Text>

          <Center mt="md">
            <Group sx={sxActionMain}>
              <Badge variant="outline">v4.0.0</Badge>

              <GithubLink />

              <ColorSchemeToggler />
            </Group>
          </Center>
        </Box>

        <Box p={{ xs: "sm", md: "md", xl: "lg" }}>
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

      <DynamicSelectModal opened={open === "select"} onClose={handleClose} />

      <DynamicSearchModal opened={open === "search"} onClose={handleClose} />
    </>
  );
}

export default IndexPage;
