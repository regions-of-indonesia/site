import { memo, useEffect, useMemo, useState } from "react";

import { Box, Center, Grid, Loader, Modal, Select } from "@mantine/core";
import type { ModalProps, SelectItem } from "@mantine/core";

import type { CodeName } from "@regions-of-indonesia/client";

import { useProvinces, useDistricts, useSubdistricts, useVillages } from "~/hooks/regions-of-indonesia-swr";

function codenameToData(codenames: CodeName[]): SelectItem[] {
  return codenames.map(({ code, name }) => {
    return { value: code, label: name };
  });
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

export default SelectModal;
