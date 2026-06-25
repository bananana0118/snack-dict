export const ICON_ASSETS = {
  arrowDown: "/icons/arrow_down.svg",
  arrowLeft: "/icons/arrow_left.svg",
  cancel: "/icons/cancel.svg",
  search: "/icons/search.svg",
} as const;

export type IconAssetKey = keyof typeof ICON_ASSETS;
