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

  const checkModalInput = () => {
    modalBtn.classList.add('ban');
    modalName.value = modalName.value.replace(/[0-9]/g, "");

    if (modalName.value.length > 0 && modalNumber.value.length > 0) {
        modalBtn.classList.remove('ban');
      } else {
        modalBtn.classList.add('ban');
      }
  };

  const checkQuantityItems = () => {
    const categoryes = document.querySelectorAll('.category');

    categoryes.forEach(category => {
      const items = category.querySelectorAll('.item-category__name');
      
      if (items.length < 2) {
        items.forEach(el => el.classList.add('ban'));
      } else {
        items.forEach(el => el.classList.remove('ban'));
      }
    });
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
  checkQuantityItems();

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('category__btn')) {
      const thisBtn = e.target;
      newBtns.forEach(btn => btn.classList.remove('this'));
      thisBtn.classList.add('this');
      modal.classList.add('show-modal');
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
        checkQuantityItems();
      }, 400);
    }

    calcValues();
    checkQuantityItems();
  });

  document.addEventListener('input', () => {
    checkModalInput();
    calcValues();
  });
});