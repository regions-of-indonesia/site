import { createEffect, createMemo, createResource, createSignal, on } from "solid-js";

import { Select } from "@kobalte/core";

import { CheckIcon, ChevronsUpDownIcon } from "lucide-solid";

import type { Region } from "@regions-of-indonesia/types";
import { createDynamic } from "@regions-of-indonesia/client/lite";

import style from "./Demo.module.css";

const client = createDynamic();

type SelectItem = Region & { disabled?: boolean };

const RegionsSelect = (props: {
  label: string;
  options: SelectItem[];
  value?: SelectItem;
  onChange: (value?: SelectItem) => void;
  placeholder?: string;
  disabled?: boolean;
}) => {
  return (
    <Select.Root
      value={props.value}
      onChange={props.onChange}
      options={props.options}
      optionValue="code"
      optionTextValue="name"
      optionDisabled="disabled"
      placeholder={props.placeholder}
      disallowEmptySelection
      itemComponent={(props) => (
        <Select.Item item={props.item} class={style["select__item"]}>
          <Select.ItemIndicator class="absolute left-2 flex items-center justify-center w-4 h-4">
            <CheckIcon />
          </Select.ItemIndicator>
          <Select.ItemLabel class="pl-6">{props.item.rawValue.name}</Select.ItemLabel>
        </Select.Item>
      )}
    >
      <Select.Trigger class={style["select__trigger"]} aria-label={props.label} disabled={props.disabled}>
        <Select.Value<(typeof props.options)[number]> class={style["select__value"]}>{(state) => state.selectedOption().name}</Select.Value>
        <Select.Icon class="flex items-center justify-center w-4 h-4">
          <ChevronsUpDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content class={style["select__content"]}>
          <Select.Listbox class="overflow-y-auto max-h-64 p-1" />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

const Demo = () => {
  const [provincesResource] = createResource(
    () => "provinces",
    () => client.province.find()
  );
  const [selectedProvinceSelectItem, setSelectedProvinceSelectItem] = createSignal<SelectItem | undefined>();

  const [districtsResource] = createResource(
    () => {
      const item = selectedProvinceSelectItem();
      return item ? `districts/${item.code}` : null;
    },
    (source) => client.district.find(source.split("/")[1])
  );
  const [selectedDistrictSelectItem, setSelectedDistrictSelectItem] = createSignal<SelectItem | undefined>();

  const [subdistrictsResource] = createResource(
    () => {
      const item = selectedDistrictSelectItem();
      return item ? `subdistricts/${item.code}` : null;
    },
    (source) => client.subdistrict.find(source.split("/")[1])
  );
  const [selectedSubdistrictSelectItem, setSelectedSubdistrictSelectItem] = createSignal<SelectItem | undefined>();

  const [villagesResource] = createResource(
    () => {
      const item = selectedSubdistrictSelectItem();
      return item ? `villages/${item.code}` : null;
    },
    (source) => client.village.find(source.split("/")[1])
  );
  const [selectedVillageSelectItem, setSelectedVillageSelectItem] = createSignal<SelectItem | undefined>();

  const provincesOptions = createMemo(() => provincesResource() ?? []);
  const districtsOptions = createMemo(() => districtsResource() ?? []);
  const subdistrictsOptions = createMemo(() => subdistrictsResource() ?? []);
  const villagesOptions = createMemo(() => villagesResource() ?? []);

  createEffect(on(selectedProvinceSelectItem, () => setSelectedDistrictSelectItem(undefined)));
  createEffect(on(selectedDistrictSelectItem, () => setSelectedSubdistrictSelectItem(undefined)));
  createEffect(on(selectedSubdistrictSelectItem, () => setSelectedVillageSelectItem(undefined)));

  return (
    <div class="relative container mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-1 md:gap-3 xl:gap-5">
        <RegionsSelect
          label="Provinces"
          placeholder="Select a province..."
          value={selectedProvinceSelectItem()}
          options={provincesOptions()}
          onChange={setSelectedProvinceSelectItem}
        />
        <RegionsSelect
          label="Districts"
          placeholder="Select a district..."
          value={selectedDistrictSelectItem()}
          options={districtsOptions()}
          onChange={setSelectedDistrictSelectItem}
          disabled={!selectedProvinceSelectItem()}
        />
        <RegionsSelect
          label="Subdistricts"
          placeholder="Select a subdistrict..."
          value={selectedSubdistrictSelectItem()}
          options={subdistrictsOptions()}
          onChange={setSelectedSubdistrictSelectItem}
          disabled={!selectedDistrictSelectItem()}
        />
        <RegionsSelect
          label="Villages"
          placeholder="Select a village..."
          value={selectedVillageSelectItem()}
          options={villagesOptions()}
          onChange={setSelectedVillageSelectItem}
          disabled={!selectedSubdistrictSelectItem()}
        />
      </div>
    </div>
  );
};

export default Demo;
