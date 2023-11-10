import {
    useRef, useState, useEffect, MouseEvent, useMemo,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { setSlideline } from './utils';
import { HeaderProps } from './types';
import styles from './styles.module.scss';

export const Header = ({
    tabs,
    size,
    setActiveTab,
    activeTabIndex,
    dataTestId,
}: HeaderProps) => {
    const [mounted, setMounted] = useState(false);
    const innerRef = useRef<HTMLDivElement>(null);

    const headerDataTestId = `${dataTestId}-header`;

    // Применяем анимацию slideline после монтирования
    useEffect(() => {
        setMounted(() => {
            setSlideline(innerRef.current, activeTabIndex);

            return true;
        });
    }, []);

    // При изменении активной вкладки перемещаем линию
    useEffect(() => {
        setSlideline(innerRef.current, activeTabIndex);
    }, [activeTabIndex]);

    // При изменении размера вкладок адаптируем ширину линии
    useEffect(() => {
        const headerElement = innerRef.current;

        const resizeObserver = new ResizeObserver(() => {
            setSlideline(headerElement, activeTabIndex);
        });

        if (headerElement) {
            resizeObserver.observe(headerElement);
        }

        return () => resizeObserver.disconnect();
    }, [activeTabIndex]);

    const tabItems = useMemo(
        () => tabs.map(
            ({
                title, className, dataTestId = 'tab-item', onClick,
            }, tabIndex) => {
                const isActiveTab = activeTabIndex === tabIndex;

                const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
                    event.preventDefault();

                    setActiveTab(tabIndex);
                    onClick?.(event);
                };

                return (

                    <button
                        key={tabIndex}
                        className={classNames(
                            styles.tab,
                            { [styles.active]: isActiveTab },
                            [className],
                        )}
                        data-test-id={dataTestId}
                        onClick={handleClick}
                    >
                        <p className={styles.title}>{title}</p>
                    </button>

                );
            },
        ),
        [activeTabIndex, size, tabs],
    );

    return (
        <header className={styles.header} data-test-id={headerDataTestId}>
            <div
                ref={innerRef}
                className={classNames(styles.inner, {
                    [styles.transitioned]: mounted,
                })}
                data-test-id={`${headerDataTestId}-inner`}
            >
                {tabItems}
            </div>
        </header>
    );
};
