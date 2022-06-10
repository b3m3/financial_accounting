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
  });

  document.addEventListener('input', () => {
    checkModalInput();
  });
});