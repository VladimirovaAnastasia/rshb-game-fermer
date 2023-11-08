import { classNames } from 'shared/lib/classNames/classNames';
import { HintProps } from './types';
import styles from './styles.module.scss';

export const Hint = ({ className, error, children }: HintProps) => (
    <p
        className={classNames(styles.hint, { [styles.error]: error }, [className])}
    >
        {children}
    </p>
);
