[![cover]][site]

<img src="https://hiiits.deno.dev/hit/regions-of-indonesia/site?" width="100%" heigth="10px" />

# Regions of Indonesia

Regions of Indonesia [site][site]

## Features

- Support both [Dynamic API][github:api] & [Static API][github:static-api]
- Search API for Dynamic API
- [Javascript client][github:client]
- [Documented][docs] with in-app [demo][site]

## Packages

- [@regions-of-indonesia/data][github:data]
- [@regions-of-indonesia/client][github:client]
- [@regions-of-indonesia/localforage][github:localforage]
- [@regions-of-indonesia/swr][github:swr]
- [@regions-of-indonesia/react-query][github:react-query]
- [@regions-of-indonesia/solid-query][github:solid-query]
- [@regions-of-indonesia/vue-query][github:vue-query]
- [@regions-of-indonesia/svelte-query][github:svelte-query]

## Roadmap

- [x] Plain data
- [x] Dynamic API & Static API
- [x] Javascript client
- [ ] Documentation
- [ ] PHP client
- [ ] Dart client
- [ ] Python client

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

## Client

Install

```bash
npm install @regions-of-indonesia/client
# or
yarn add @regions-of-indonesia/client
# or
pnpm add @regions-of-indonesia/client
```

Usage

```typescript
// src/libs/client.ts

import { RegionsOfIndonesia } from "@regions-of-indonesia/client";

const client = new RegionsOfIndonesia({
  baseURL: string, // [OPTIONAL] default is "https://regions-of-indonesia.deno.dev" or "https://regions-of-indonesia.github.io/static-api" if static is true
  middlewares: Middleware[] // [OPTIONAL] default is log() and cache()
  static: boolean, // [OPTIONAL] default is false
});

// Async Await
async function getProvinces() {
  const provinces = await client.province.find(); /** provinces is CodeName[] */
}
// Promise
client.province.findByCode("11").then((province) => {
  console.log(province); /** province is CodeName */
});
client.search("some-name").then((result) => {
  console.log(result); /** result is SearchResult */
});
```

## Data

Install

```bash
npm install @regions-of-indonesia/data
# or
yarn add @regions-of-indonesia/data
# or
pnpm add @regions-of-indonesia/data
```

Usage

```typescript
import { PROVINCE, DISTRICT, SUBDISTRICT, VILLAGE } from "@regions-of-indonesia/data";

// PROVINCE is {[key: string]: string}
// DISTRICT is {[key: string]: string}
// SUBDISTRICT is {[key: string]: string}
// VILLAGE is {[key: string]: string}
```

## Dynamic Endpoints

| Endpoint                                                                                              | Return type  |
| ----------------------------------------------------------------------------------------------------- | ------------ |
| [/provinces](https://regions-of-indonesia.deno.dev/provinces)                                         | CodeName[]   |
| [/province/11](https://regions-of-indonesia.deno.dev/province/11)                                     | CodeName     |
| [/province/11/districts](https://regions-of-indonesia.deno.dev/province/11/districts)                 | CodeName[]   |
| [/districts/11](https://regions-of-indonesia.deno.dev/districts/11)                                   | CodeName[]   |
| [/district/11.01](https://regions-of-indonesia.deno.dev/district/11.01)                               | CodeName     |
| [/district/11.01/subdistricts](https://regions-of-indonesia.deno.dev/district/11.01/subdistricts)     | CodeName[]   |
| [/subdistricts/11.01](https://regions-of-indonesia.deno.dev/subdistricts/11.01)                       | CodeName[]   |
| [/subdistrict/11.01.01](https://regions-of-indonesia.deno.dev/subdistrict/11.01.01)                   | CodeName     |
| [/subdistrict/11.01.01/villages](https://regions-of-indonesia.deno.dev/subdistrict/11.01.01/villages) | CodeName[]   |
| [/villages/11.01.01](https://regions-of-indonesia.deno.dev/villages/11.01.01)                         | CodeName[]   |
| [/village/11.01.01.2001](https://regions-of-indonesia.deno.dev/village/11.01.01.2001)                 | CodeName     |
| [/search?name=aceh](https://regions-of-indonesia.deno.dev/search?name=aceh)                           | SearchResult |
| [/search/provinces?name=aceh](https://regions-of-indonesia.deno.dev/search/provinces?name=aceh)       | CodeName[]   |
| [/search/districts?name=aceh](https://regions-of-indonesia.deno.dev/search/districts?name=aceh)       | CodeName[]   |
| [/search/subdistricts?name=aceh](https://regions-of-indonesia.deno.dev/search/subdistricts?name=aceh) | CodeName[]   |
| [/search/villages?name=aceh](https://regions-of-indonesia.deno.dev/search/villages?name=aceh)         | CodeName[]   |

## Static Endpoints

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

## Examples

- [react typescript][github:example-react-ts]
- [react typescript swr][github:example-react-ts-swr]
- [react typescript query][github:example-react-ts-query]
- [solid typescript][github:example-solid-ts]
- [solid typescript query][github:example-solid-ts-query]

## Credit

- [cahyadsn - wilayah](https://github.com/cahyadsn/wilayah) - SQL database

## Support

[![][support:ko-fi-button]][support:ko-fi]

[![][support:trakteer-button]][support:trakteer]

## LICENSE

GPL-3.0

<!--  -->

[cover]: https://raw.githubusercontent.com/regions-of-indonesia/regions-of-indonesia/main/public/cover@2.png?sanitize=true
[logo]: https://raw.githubusercontent.com/regions-of-indonesia/regions-of-indonesia/main/public/logo@2.png?sanitize=true
[site]: https://regions-of-indonesia.netlify.app
[docs]: https://docs-regions-of-indonesia.netlify.app

<!--  -->

[github:api]: https://github.com/regions-of-indonesia/api
[github:static-api]: https://github.com/regions-of-indonesia/static-api
[github:site]: https://github.com/regions-of-indonesia/site
[github:docs]: https://github.com/regions-of-indonesia/docs

<!--  -->

[github:client]: https://github.com/regions-of-indonesia/client
[github:data]: https://github.com/regions-of-indonesia/data
[github:php-client]: https://github.com/regions-of-indonesia/php-client
[github:dart-client]: https://github.com/regions-of-indonesia/dart-client
[github:python-client]: https://github.com/regions-of-indonesia/python-client

<!--  -->

[github:localforage]: https://github.com/regions-of-indonesia/localforage
[github:swr]: https://github.com/regions-of-indonesia/swr
[github:react-query]: https://github.com/regions-of-indonesia/react-query
[github:solid-query]: https://github.com/regions-of-indonesia/solid-query
[github:vue-query]: https://github.com/regions-of-indonesia/vue-query
[github:svelte-query]: https://github.com/regions-of-indonesia/svelte-query

<!--  -->

[github:example-react-ts]: https://github.com/regions-of-indonesia/example-react-ts
[github:example-react-ts-swr]: https://github.com/regions-of-indonesia/example-react-ts-swr
[github:example-react-ts-query]: https://github.com/regions-of-indonesia/example-react-ts-query
[github:example-solid-ts]: https://github.com/regions-of-indonesia/example-solid-ts
[github:example-solid-ts-query]: https://github.com/regions-of-indonesia/example-solid-ts-query
[github:example-vue-ts]: https://github.com/regions-of-indonesia/example-vue-ts
[github:example-vue-ts-query]: https://github.com/regions-of-indonesia/example-vue-ts-query
[github:example-svelte-ts]: https://github.com/regions-of-indonesia/example-svelte-ts
[github:example-svelte-ts-query]: https://github.com/regions-of-indonesia/example-svelte-ts-query

<!--  -->

[support:ko-fi]: https://ko-fi.com/flamrdevs
[support:ko-fi-button]: https://flamrdevs.vercel.app/ko-fi.png
[support:trakteer]: https://trakteer.id/flamrdevs
[support:trakteer-button]: https://flamrdevs.vercel.app/trakteer.png
