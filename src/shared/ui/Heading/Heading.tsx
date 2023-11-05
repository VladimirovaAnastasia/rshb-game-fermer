import { classNames } from 'shared/lib/classNames/classNames';
import { ReactNode } from 'react';
import cls from './Heading.module.scss';

export type HeadingTag = keyof Pick<
    JSX.IntrinsicElements,
    'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
>;
export type Level = 1 | 2 | 3 | 4 | 5 | 6;

export type HeadingProps = {
    level: Level;
    children: ReactNode;
    id?: string;
    className?: string;
    dataTestId?: string;
};

export const Heading = ({
    level,
    children,
    id,
    className,
    dataTestId = 'heading',
}: HeadingProps) => {
    const HeadingTag = `h${level}` as HeadingTag;

    return (
        <HeadingTag
            id={id}
            className={classNames(cls.Heading, {}, [cls[`level-${level}`], className])}
            data-test-id={dataTestId}
        >
            {children}
        </HeadingTag>
    );
};
