import { convertStringToNumber } from './helpers.js';
import { getData, postData } from './service.js';

const financeForm = document.querySelector('.finance__form');
const financeAmount = document.querySelector('.finance__amount');

let amount = 0;
financeAmount.textContent = amount;

const addNewOperation = async (e) => {
  e.preventDefault();

  const typeOperation = e.submitter.dataset.typeOperation;

  const financeFormDate = Object.fromEntries(new FormData(financeForm));
  financeFormDate.type = typeOperation;

  const newOperation = await postData('/finance', financeFormDate);

  const changeAmount = Math.abs(convertStringToNumber(newOperation.amount));

  if (typeOperation === 'income') {
    amount += changeAmount;
  }

  if (typeOperation === 'expenses') {
    amount -= changeAmount;
  }

  financeAmount.textContent = `${amount.toLocaleString('RU-ru')} ₽`;
  financeForm.reset();
};

export const financeControl = async () => {
  const operations = await getData('/finance');

  amount = operations.reduce((acc, item) => {
    if (item.type === 'income') {
      acc += convertStringToNumber(item.amount);
    }

    if (item.type === 'expenses') {
      acc -= convertStringToNumber(item.amount);
    }

    return acc;
  }, 0);

  financeAmount.textContent = `${amount.toLocaleString('RU-ru')} ₽`;
  financeForm.addEventListener('submit', addNewOperation);
};
