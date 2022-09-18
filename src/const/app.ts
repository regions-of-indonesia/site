function getTitle(prefix?: string, suffix?: string) {
  let title = "Regions of Indonesia";
  if (typeof prefix === "string") title = `${prefix} | ${title}`;
  if (typeof suffix === "string") title = `${title} | ${suffix}`;
  return title.trim();
}

export { getTitle };
