"use strict";

let textarea = document.getElementById(`page-input`);
let removeButton = document.getElementById(`remove-entry`);
let addButton = document.getElementById(`add-entry`);
let initialTab = document.querySelector(`li`);

initialTab.addEventListener(`click`, function () {
  let tabs = document.querySelectorAll(`li`);
  tabs.forEach((tab) => tab.classList.remove(`active`));

  this.classList.add(`active`);
  textarea.value = localStorage.getItem(`Entry_${this.dataset.entry}`);
});

// localStorage.clear()
(function getStartingTab() {
  let getStartingTab = localStorage.key(0);

  if (getStartingTab === null) {
    const greetingText = `
        Welcome to Ebin's Notepad!

        Type anything you want in the text area, and it will be saved in the notepad.

        You can add and remove tabs using the buttons in the corner. Switch between tabs using the buttons to the right.

        Good luck, have fun!
        `;
    textarea.value = greetingText;
    localStorage.setItem(`Entry_1`, greetingText);
  }
})();

// Selecting the first item from LocalStorage
let activeTab = localStorage.key(0);

textarea.addEventListener(`input`, function () {
  let activeEntry = document.querySelector(`.active`);
  let text = textarea.value;
  localStorage.setItem(`Entry_${activeEntry.dataset.entry}`, text);
});

addButton.addEventListener(`click`, addTab);
function addTab() {
  // SOME FUCKERY IS HAPPENING HERE LEADING TO ISSUES (IT HAS TO DO WITH CREATING NEW LOCALSTORAGE KEY THAT ALREADY EXISTS)
  // Fuckery was fixed by updating the counter in this manner. Seems to work.
  let entryNumber = localStorage.length + 1;
  while (localStorage.getItem(`Entry_${entryNumber}`) !== null) {
    entryNumber++;
  }

  localStorage.setItem(`Entry_${entryNumber}`, ``);

  let newEntry = document.createElement(`li`);

  newEntry.classList.add(`tab-item`);
  newEntry.dataset.entry = entryNumber;
  newEntry.classList.add(`Entry_${entryNumber}`);

  newEntry.addEventListener(`click`, function () {
    let tabs = document.querySelectorAll(`li`);
    tabs.forEach((tab) => tab.classList.remove(`active`));

    this.classList.add(`active`);

    console.log(this.dataset.entry);
    textarea.value = localStorage.getItem(`Entry_${this.dataset.entry}`);
  });

  document.querySelector(`.tabs-list`).appendChild(newEntry);
}

removeButton.addEventListener(`click`, removeEntry);

function removeEntry() {
  removeFromList();
  // removeFromLocalStorage();

  function removeFromList() {
    let tabs = document.querySelectorAll(`li`);
    let activeEntry = document.querySelector(`.tab-item.active`);
    if (tabs.length === 1) {
      textarea.value = "";
      localStorage.setItem(`Entry_${activeEntry.dataset.entry}`, ``);
      return;
    } else {
      localStorage.removeItem(`Entry_${activeEntry.dataset.entry}`);
      activeEntry.remove();

      activeEntry = document.querySelector(`.tab-item`);
      activeEntry.classList.add(`active`);
      textarea.value = localStorage.getItem(
        `Entry_${activeEntry.dataset.entry}`
      );
    }
  }
}
