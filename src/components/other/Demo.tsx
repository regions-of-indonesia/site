import { createEffect, createMemo, createResource, createSignal, on } from "solid-js";

import { Select } from "@kobalte/core";

import { ArrowUpDownIcon, CheckIcon } from "lucide-solid";

import type { Region } from "@regions-of-indonesia/types";
import { createStatic } from "@regions-of-indonesia/client/lite";

import clsx from "clsx";

import style from "./Demo.module.css";

const client = createStatic();

type SelectItem = Region & { disabled?: boolean };

const RegionsSelect = (props: {
  label: string;
  options: SelectItem[];
  value?: SelectItem;
  onChange: (value?: SelectItem) => void;
  placeholder?: string;
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
      itemComponent={(props) => (
        <Select.Item
          item={props.item}
          class={clsx(
            "relative flex items-center justify-between px-2 h-7 text-neutral-12 outline-none select-none rounded-lg",
            style["select__item"]
          )}
        >
          <Select.ItemLabel>{props.item.rawValue.name}</Select.ItemLabel>
          <Select.ItemIndicator class="flex items-center justify-center w-5 h-5">
            <CheckIcon />
          </Select.ItemIndicator>
        </Select.Item>
      )}
    >
      <Select.Trigger
        class={clsx(
          "flex items-center justify-between px-4 py-0.5 w-full h-8 bg-neutral-1 text-neutral-11 border border-neutral-6 hover:border-neutral-7 outline-none rounded-xl focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:ring-offset-neutral-2 focus-visible:ring-neutral-10",
          style["select__trigger"]
        )}
        aria-label={props.label}
      >
        <Select.Value<(typeof props.options)[number]>
          class={clsx("overflow-ellipsis whitespace-nowrap overflow-hidden", style["select__value"])}
        >
          {(state) => state.selectedOption().name}
        </Select.Value>
        <Select.Icon class="flex items-center justify-center w-5 h-5">
          <ArrowUpDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          class={clsx(
            "bg-neutral-1 border-2 border-neutral-3 rounded-xl outline-none shadow overflow-hidden z-10",
            style["select__content"]
          )}
        >
          <Select.Listbox class="overflow-y-auto max-h-64 p-2" />
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
    (source) => {
      const [, code] = source.split("/");
      return client.district.find(code);
    }
  );
  const [selectedDistrictSelectItem, setSelectedDistrictSelectItem] = createSignal<SelectItem | undefined>();

  const [subdistrictsResource] = createResource(
    () => {
      const item = selectedDistrictSelectItem();
      return item ? `subdistricts/${item.code}` : null;
    },
    (source) => {
      const [, code] = source.split("/");
      return client.subdistrict.find(code);
    }
  );
  const [selectedSubdistrictSelectItem, setSelectedSubdistrictSelectItem] = createSignal<SelectItem | undefined>();

  const [villagesResource] = createResource(
    () => {
      const item = selectedSubdistrictSelectItem();
      return item ? `villages/${item.code}` : null;
    },
    (source) => {
      const [, code] = source.split("/");
      return client.village.find(code);
    }
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
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2 md:gap-4 xl:gap-6">
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
        />
        <RegionsSelect
          label="Subdistricts"
          placeholder="Select a subdistrict..."
          value={selectedSubdistrictSelectItem()}
          options={subdistrictsOptions()}
          onChange={setSelectedSubdistrictSelectItem}
        />
        <RegionsSelect
          label="Villages"
          placeholder="Select a village..."
          value={selectedVillageSelectItem()}
          options={villagesOptions()}
          onChange={setSelectedVillageSelectItem}
        />
      </div>
    </div>
  );
};

export default Demo;
