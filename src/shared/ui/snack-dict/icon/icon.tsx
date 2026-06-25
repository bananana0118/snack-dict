import type { IconAssetKey } from "@/shared/constants";
import { ICON_ASSETS } from "@/shared/constants";

type SnackDictIconProps = {
  className?: string;
  "data-slot"?: string;
  name: IconAssetKey;
};

function SnackDictIcon({ className, "data-slot": dataSlot, name }: SnackDictIconProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- Small decorative SVG icons use the asset registry directly.
    <img
      data-slot={dataSlot}
      src={ICON_ASSETS[name]}
      alt=""
      className={className}
      aria-hidden="true"
    />
  );
}

export { SnackDictIcon };
export type { SnackDictIconProps };
