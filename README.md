[![](./public/Cover.png)](https://regions-of-indonesia.netlify.app)

<p align="center">
  <a href="https://indonesia-api.netlify.app/regions-of-indonesia"><img src="https://raw.githubusercontent.com/indonesia-api/indonesia-api/main/public/Badge.svg?sanitize=true" /></a>
</p>

# Regions of Indonesia

Regions of Indonesia

## Features

- Support both [Dynamic API](https://github.com/regions-of-indonesia/api) & [Static API](https://github.com/regions-of-indonesia/static-api)
- Search API for Dynamic API
- [Javascript client SDK](https://github.com/regions-of-indonesia/client)
- Documented with in-app [DEMO](https://regions-of-indonesia.netlify.app)

## Roadmap

- [x] Plain data
- [x] Dynamic API & Static API
- [x] Javascript Client SDK
- [ ] Documentation
- [ ] PHP Client SDK
- [ ] Dart Client SDK
- [ ] Python Client SDK

## Types

```typescript
type CodeName = {
  code: string;
  name: string;
};

type SearchResult = {
  provinces: CodeName[];
  districts: CodeName[];
  subdistricts: CodeName[];
  villages: CodeName[];
};
```

## Endpoints

### Dynamic API

| Endpoint                                                                                                         | Return type  |
| ---------------------------------------------------------------------------------------------------------------- | ------------ |
| [/provinces](https://regions-of-indonesia-flamrdevs.koyeb.app/provinces)                                         | CodeName[]   |
| [/province/11](https://regions-of-indonesia-flamrdevs.koyeb.app/province/11)                                     | CodeName     |
| [/province/11/districts](https://regions-of-indonesia-flamrdevs.koyeb.app/province/11/districts)                 | CodeName     |
| [/districts/11](https://regions-of-indonesia-flamrdevs.koyeb.app/districts/11)                                   | CodeName[]   |
| [/district/11.01](https://regions-of-indonesia-flamrdevs.koyeb.app/district/11.01)                               | CodeName     |
| [/district/11.01/subdistricts](https://regions-of-indonesia-flamrdevs.koyeb.app/district/11.01/subdistricts)     | CodeName     |
| [/subdistricts/11.01](https://regions-of-indonesia-flamrdevs.koyeb.app/subdistricts/11.01)                       | CodeName[]   |
| [/subdistrict/11.01.01](https://regions-of-indonesia-flamrdevs.koyeb.app/subdistrict/11.01.01)                   | CodeName     |
| [/subdistrict/11.01.01/villages](https://regions-of-indonesia-flamrdevs.koyeb.app/subdistrict/11.01.01/villages) | CodeName     |
| [/villages/11.01.01](https://regions-of-indonesia-flamrdevs.koyeb.app/villages/11.01.01)                         | CodeName[]   |
| [/village/11.01.01.2001](https://regions-of-indonesia-flamrdevs.koyeb.app/village/11.01.01.2001)                 | CodeName     |
| [/search?text=aceh](https://regions-of-indonesia-flamrdevs.koyeb.app/search?text=aceh)                           | SearchResult |
| [/search/provinces?text=aceh](https://regions-of-indonesia-flamrdevs.koyeb.app/search/provinces?text=aceh)       | CodeName[]   |
| [/search/districts?text=aceh](https://regions-of-indonesia-flamrdevs.koyeb.app/search/districts?text=aceh)       | CodeName[]   |
| [/search/subdistricts?text=aceh](https://regions-of-indonesia-flamrdevs.koyeb.app/search/subdistricts?text=aceh) | CodeName[]   |
| [/search/villages?text=aceh](https://regions-of-indonesia-flamrdevs.koyeb.app/search/villages?text=aceh)         | CodeName[]   |

### Static API

| Endpoint                                                                                                                    | Return type |
| --------------------------------------------------------------------------------------------------------------------------- | ----------- |
| [/provinces.json](https://regions-of-indonesia.github.io/static-api/provinces.json)                                         | CodeName[]  |
| [/province/11.json](https://regions-of-indonesia.github.io/static-api/province/11.json)                                     | CodeName    |
| [/province/11/districts.json](https://regions-of-indonesia.github.io/static-api/province/11/districts.json)                 | CodeName[]  |
| [/districts/11.json](https://regions-of-indonesia.github.io/static-api/districts/11.json)                                   | CodeName[]  |
| [/district/11.01.json](https://regions-of-indonesia.github.io/static-api/district/11.01.json)                               | CodeName    |
| [/district/11.01/subdistricts.json](https://regions-of-indonesia.github.io/static-api/district/11.01/subdistricts.json)     | CodeName[]  |
| [/subdistricts/11.01.json](https://regions-of-indonesia.github.io/static-api/subdistricts/11.01.json)                       | CodeName[]  |
| [/subdistrict/11.01.01.json](https://regions-of-indonesia.github.io/static-api/subdistrict/11.01.01.json)                   | CodeName    |
| [/subdistrict/11.01.01/villages.json](https://regions-of-indonesia.github.io/static-api/subdistrict/11.01.01/villages.json) | CodeName[]  |
| [/villages/11.01.01.json](https://regions-of-indonesia.github.io/static-api/villages/11.01.01.json)                         | CodeName[]  |
| [/village/11.01.01.2001.json](https://regions-of-indonesia.github.io/static-api/village/11.01.01.2001.json)                 | CodeName    |

## Javascript Client SDK

Install

```bash
npm install @regions-of-indonesia/client
```

Usage

```typescript
// src/libs/client.ts

import { RegionsOfIndonesia } from "@regions-of-indonesia/client";

const client = new RegionsOfIndonesia({
  // baseURL: string, // optional, default is "https://regions-of-indonesia-flamrdevs.koyeb.app"
  // middlewares: Middleware[] // optional, default is log and (in-memory) cache
  // static: boolean, optional, default is false, only set to true if use static API
});

// Async Await
async function getProvinces() {
  const provinces = await client.province.find(/**options?: { signal?: AbortSignal }*/);
}
// Promise
await client.province.findByCode("11" /**options?: { signal?: AbortSignal }*/).then((province) => {
  console.log(province);
});

await client.search("some-text").then((result) => {
  console.log(result); /** result is SearchResult */
});
```

Other usage

```typescript
import { RegionsOfIndonesia, log, cache } from "@regions-of-indonesia/client";

const localStorageDriver /** or any */ = {
  async get(key: string) {
    return JSON.parse(localStorage.getItem(key));
  },
  async set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  async delete(key: string) {
    localStorage.removeItem(key);
  },
};

const client = new RegionsOfIndonesia({
  baseURL: "https://regions-of-indonesia.github.io/static-api",
  middlewares: [log(), cache(localStorageDriver)]
  static: true
});

// then use as dynamic API or static API rules
```

## Raw data

Install

```bash
npm install @regions-of-indonesia/data
```

Usage

```typescript
import { Provinces, Districts, Subdistricts, Villages } from "@regions-of-indonesia/data";

// Each data is object with type {[key: string]: string}, which is object key as code, and object value as name
```

## Credit

- [cahyadsn](https://github.com/cahyadsn/wilayah) - (raw) database provider

## Support

- Donate [Ko-Fi](https://ko-fi.com/flamrdevs) or [Trakteer](https://trakteer.id/flamrdevs)

_Currently latency of Dynamic API is between 400ms - 1000ms, caused by server location. Support this project means, help to upgrade current server environment._

## LICENSE

GPL-3.0
