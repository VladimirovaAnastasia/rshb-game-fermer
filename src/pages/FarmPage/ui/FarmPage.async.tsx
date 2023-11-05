import { lazy } from 'react';

export const FarmPageAsync = lazy(
    () => new Promise((resolve) => {
        // @ts-ignore
        // ТАК В РЕАЛЬНЫХ ПРОЕКТАХ НЕ ДЕЛАТЬ!!!!! ДЕЛАЕМ ДЛЯ КУРСА!
        setTimeout(() => resolve(import('./FarmPage')), 1500);
    }),
);
