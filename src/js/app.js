document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const createItem = (wrapp, name, value) => {
    const item = document.createElement('div');
    item.classList.add('category__item', 'item-category');

    item.innerHTML = `
      <p class="item-category__name">${name}</p>
      <input class='item-category__input item-input' type="number" value="${value}" />
    `;
    wrapp.append(item);
  };
});