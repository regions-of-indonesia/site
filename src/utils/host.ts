import * as HOST from "~/const/host";

export const SITE = (...paths: string[]) => [import.meta.env.MODE === "development" ? HOST.SITE_DEV : HOST.SITE_PROD, ...paths].join("/");

export const DOCS = (...paths: string[]) => [import.meta.env.MODE === "development" ? HOST.DOCS_DEV : HOST.DOCS_PROD, ...paths].join("/");
