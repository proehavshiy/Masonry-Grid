import React from 'react';

function MasonryGrid({ children, displayStatus }) {

  // реф для доступа к грид-сетке
  const gridRef = React.useRef(null);

  // ресайз грид-карточки
  function resizeGridItem(item) {
    const grid = gridRef.current;

    // получаем все вычесленные стили грид-сетки
    if (grid !== null) {
      const gridStyles = window.getComputedStyle(grid);
      // забираем высоту строки и гэпа из грид-сетки
      const rowHeight = parseInt(gridStyles.getPropertyValue('grid-auto-rows'));
      const rowGap = parseInt(gridStyles.getPropertyValue('grid-row-gap'));

      // вычисляем нужную высоту контентной части карточки
      const rowSpan = Math.ceil((item.firstChild.offsetHeight + rowGap) / (rowHeight + rowGap));

      //растягиваем карточку на нужное кол-во грид-строк
      // устанавливаем в стили карточки конечную грид-строку, до которой должна растянуться карточка
      item.style.setProperty('grid-row-end', 'span ' + rowSpan);
    }
  }

  // ресайзим все карточки в гриде
  function resizeAllGridItems() {

    // получаем всех карточки грида через реф
    if (null !== gridRef.current) {
      const allItems = gridRef.current.children;

      for (let i = 0; i < allItems.length; i++) {
        resizeGridItem(allItems[i]);

        // после вычисления позиции всех карточек, плавно отображаем сетку,
        // чтобы не было видно, как сетка перестраивается
        if (i === allItems.length - 1) {
          gridRef.current.style.setProperty('opacity', '1');
        }
      }
    }
  }

  // отображение сетки после того, как все карточки загрузились
  React.useEffect(() => {
    if (displayStatus) {
      resizeAllGridItems()
    }
  }, [displayStatus])

  // вызываем ресайз карточек при рендере компонентов
  React.useLayoutEffect(() => {
    // ставим слушатель на загрузку дом-дерева и всех стилей, картинок и скриптов
    window.addEventListener('load', resizeAllGridItems);
    // на ресайз
    window.addEventListener('resize', resizeAllGridItems);
    return () => {
      window.removeEventListener('load', resizeAllGridItems);
      window.removeEventListener('resize', resizeAllGridItems);
    };
  }, []);

  return (
    <section className='masonryGridSection'>
      <ul className='masonryGrid'
        ref={gridRef}>
        {children}
      </ul>
    </section>
  );
};

export default MasonryGrid;