export const setSlideline = (
    headerElement: HTMLHeadElement | null,
    activeTabIndex: number,
) => {
    if (activeTabIndex !== undefined && headerElement) {
        const activeTabElement = headerElement.children[activeTabIndex];

        const { left: activeTabLeftCoordinate, width: activeTabWidth } = activeTabElement.getBoundingClientRect();

        const { left: headerLeftCoordinate } = headerElement.getBoundingClientRect();

        const leftOffset = activeTabLeftCoordinate - headerLeftCoordinate;

        headerElement.style.setProperty('--left-offset', `${leftOffset}px`);
        headerElement.style.setProperty('--tab-width', `${activeTabWidth}px`);
    }
};
