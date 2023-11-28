import classNames from "classNames";
import LogoIcon from "shared/assets/icons/logo-47-47.svg?react";
import cls from "./MainPageHeader.module.scss";

interface ProfilePageHeaderProps {
  className?: string;
}

export const MainPageHeader = (props: ProfilePageHeaderProps) => {
  const {className} = props;

  return (
    <div className={classNames(cls.MainPageHeader, {}, [className])}>
      <LogoIcon />
      <div className={cls.logoText}>
        <p className={cls.logoTextMain}>Я в агро</p>
        <p className={cls.logoTextMinor}>От Россельхозбанка</p>
      </div>
    </div>
  );
};
