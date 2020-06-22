// import default object with a local camelCase name
import initOutcomes from '../init-outcomes.js';

class nwSyllabusOutcomesList extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = `
    <div class="form-check">
    <ul id="outcomes-list" class="list-group" style="list-style-type: none;">
    </ul>
    </div>
    `;

    const liClassChecked =
      'list-group-item list-group-item-action list-group-item-primary active';
    const liClassUnchecked = 'list-group-item list-group-item-action';
    const cbClassChecked = 'state-icon fa fa-check-square';
    const cbClassUnchecked = 'state-icon far fa-square';

    initOutcomes.outcomesArray.forEach((item, index) => {
      // Start by constructing the list item element

      const newNode = document.createElement('li');
      newNode.id = `outcome-${index + 1}`;
      newNode.innerHTML = item;
      newNode.style = 'cursor: pointer;';
      const isChecked = localStorage.getItem(newNode.id) === 'true';
      newNode.className =
        isChecked === true ? liClassChecked : liClassUnchecked;

      // Then display a nice checkbox icon

      const newCheckBox = document.createElement('span');
      newCheckBox.className =
        isChecked === true ? cbClassChecked : cbClassUnchecked;
      newNode.insertBefore(newCheckBox, newNode.firstChild);
      this.querySelector('#outcomes-list').appendChild(newNode);

      // add click event listener to toggle

      newNode.addEventListener('click', () => {
        const wasChecked = localStorage.getItem(newNode.id) === 'true';
        const isNowChecked = !wasChecked;
        localStorage.setItem(newNode.id, isNowChecked);
        if (isNowChecked === true) {
          newNode.className = liClassChecked;
          newCheckBox.className = cbClassChecked;
        } else {
          newNode.className = liClassUnchecked;
          newCheckBox.className = cbClassUnchecked;
        }
      });
    });
  }
}

window.customElements.define(
  'nw-syllabus-outcomes-list',
  nwSyllabusOutcomesList,
);
