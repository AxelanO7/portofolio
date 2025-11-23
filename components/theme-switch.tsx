"use client";

import { FC } from "react";
import { Switch, SwitchProps } from "@heroui/react";
import { useTheme } from "next-themes";
import { useIsSSR } from "@react-aria/ssr";
import clsx from "clsx";

import { SunFilledIcon, MoonFilledIcon } from "@/components/icons";

export interface ThemeSwitchProps {
  className?: string;
  classNames?: SwitchProps["classNames"];
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({
  className,
  classNames,
}) => {
  const { theme, setTheme } = useTheme();
  const isSSR = useIsSSR();

  const isLight = theme === "light" || isSSR;
  const onChange = () => {
    isLight ? setTheme("dark") : setTheme("light");
  };

  return (
    <Switch
      aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
      isSelected={isLight}
      onValueChange={onChange}
      size="lg"
      color="secondary"
      className={clsx(
        "px-px transition-opacity hover:opacity-80 cursor-pointer",
        className,
        classNames?.base,
      )}
      classNames={{
        wrapper: clsx(
          [
            "w-auto h-auto",
            "bg-transparent",
            "rounded-lg",
            "flex items-center justify-center",
            "group-data-[selected=true]:bg-transparent",
            "!text-default-500",
            "pt-px",
            "px-0",
            "mx-0",
          ],
          classNames?.wrapper,
        ),
        thumb: classNames?.thumb,
        label: classNames?.label,
      }}
      thumbIcon={({ isSelected, className }) =>
        !isSelected || isSSR ? (
          <SunFilledIcon className={className} size={22} />
        ) : (
          <MoonFilledIcon className={className} size={22} />
        )
      }
    />
  );
};
