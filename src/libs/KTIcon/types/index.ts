import { iconNames } from "../icons";

export interface IIcons {
  [key: string]: number
}

export type FontSizeType = "1" | "2" | "3" | "4" | "5" | "6";

export type IconNameType = typeof iconNames[number];

export type IconType = "duotone" | "solid" | "outline"