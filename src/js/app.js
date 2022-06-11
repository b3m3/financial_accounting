document.addEventListener('DOMContentLoaded', () => {
  'use strict';
  
  const newBtns = document.querySelectorAll('.category__btn');
  const modal = document.querySelector('.modal');
  const modalBtn = modal.querySelector('.modal__btn');
  const modalName = modal.querySelector('.modal-name');
  const modalNumber = modal.querySelector('.modal-number');

  const createItem = (wrapp, name, value) => {
    const item = document.createElement('div');
    item.classList.add('category__item', 'item-category');

    item.innerHTML = `
      <p class="item-category__name">${name}</p>
      <input class='item-category__input item-input' type="number" value="${value}" />
    `;
    wrapp.append(item);
  };

  const getLStorageData = () => {
    const wrapps = document.querySelectorAll('.category__items');
    const range = document.querySelector('input[type="range"]');

    range.value = localStorage.getItem('range');

    for (const key in localStorage) {
      const create = (className, wrappPosition) => 
        key.split(' ')[0] === className ?
        createItem(
          wrapps[wrappPosition], 
          localStorage[key].split(' ')[0], 
          localStorage[key].split(' ')[1]) :
        null;
      
      create('income', 0);
      create('expenses', 1);
    }
  };

  const addDataToLStorage = () => {
    const items = document.querySelectorAll('.category__item');
    const range = document.querySelector('input[type="range"]');

    range.addEventListener('input', () => {
      localStorage.setItem('range', range.value);
    });

    items.forEach(item => {
      const parent = item.closest('.category');
      const title = item.querySelector('.item-category__name');
      const value = item.querySelector('.item-category__input');

      const getParentClass = parent.className.split(' ')[1];

      localStorage.setItem(`${getParentClass} ${title.textContent}`, `${title.textContent} ${value.value}`);
    });
  };

  const checkModalInput = () => {
    modalBtn.classList.add('ban');
    modalName.value = modalName.value.replace(/[0-9]/g, "");

    if (modalName.value.length > 0 && modalNumber.value.length > 0) {
        modalBtn.classList.remove('ban');
      } else {
        modalBtn.classList.add('ban');
      }
  };

  const calcValues = () => {
    const inputs = document.querySelectorAll('.item-input');
    const range = document.querySelector('input[type="range"]');
    const rangeValue = document.querySelector('.saving__precent span');

    const remainder = document.querySelector('.remainder');
    const save = document.querySelector('.save');
    const free = document.querySelector('.month');
    const year = document.querySelector('.year');

    let income = 0;
    let expenses = 0;

    inputs.forEach(input => {
      if (input.closest('.income')) {
        income += (+input.value);
      } else {
        expenses += (+input.value);
      } 
    });

    remainder.textContent = income - expenses;
    rangeValue.textContent = range.value;
    save.textContent = parseInt(+remainder.textContent / 100 * range.value);
    free.textContent = parseInt(remainder.textContent - save.textContent);
    year.textContent = parseInt(+save.textContent * 12);
  };

  checkModalInput();
  calcValues();
  addDataToLStorage();
  getLStorageData();
  setTimeout(() => modal.click(), 100);

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('category__btn')) {
      const thisBtn = e.target;
      newBtns.forEach(btn => btn.classList.remove('this'));
      thisBtn.classList.add('this');
      modal.classList.add('show-modal');
      modalBtn.classList.add('ban');
    }

    if (e.target === modalBtn) {
      newBtns.forEach(btn => {
        if (btn.classList.contains('this')) {
          const parent = btn.closest('.category');
          const wrapp = parent.querySelector('.category__items');

          createItem(wrapp, modalName.value, modalNumber.value);
          modal.classList.remove('show-modal');
          modalName.value = ''; 
          modalNumber.value = '';
        }
      });
    }

    if (e.target === modal) {
      modal.classList.remove('show-modal');
    }

    if (e.target.classList.contains('item-category__name')) {
      e.target.parentNode.classList.add('del');

      setTimeout(() => {
        e.target.parentNode.remove();
        calcValues();
      }, 350);
    }

    calcValues();
    addDataToLStorage();
  });

  document.addEventListener('input', () => {
    checkModalInput();
    calcValues();
    addDataToLStorage();
  });
});