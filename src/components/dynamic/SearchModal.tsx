import { memo, useMemo, useState } from "react";

import { Box, Modal, Stack, Table, TextInput } from "@mantine/core";
import type { ModalProps } from "@mantine/core";

import type { CodeName } from "@regions-of-indonesia/client";

import { useSearch } from "~/hooks/regions-of-indonesia-swr";

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

export default SearchModal;
