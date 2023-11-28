import classNames from "classNames";
import {useEffect, useState} from "react";
import cls from "./NotFoundPage.module.scss";

interface NotFoundPageProps {
  className?: string;
}

export const NotFoundPage = ({className}: NotFoundPageProps) => {
  const [text, setText] = useState<string | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setText("Страница не найдена");
    }, 1_500);
  }, []);

  return (
    <div className={classNames(cls.NotFoundPage, {}, [className])}>{text}</div>
  );
};
