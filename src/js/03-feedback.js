import throttle from 'lodash.throttle';
import { save } from './localstorage-api';
import { load } from './localstorage-api';
const refs = {
  form: document.querySelector('.feedback-form'),
};

const STORAGE_KEY = 'feedback-form-state';
savedTextarea();

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormImput, 500));

function onFormImput(evt) {
  const { name, value } = evt.target;
  const userData = load(STORAGE_KEY) || {};

  userData[name] = value;
  save(STORAGE_KEY, userData);
}

function onFormSubmit(event) {
  event.preventDefault();

  const { email, message } = event.target;

  console.log({ email: email.value, message: message.value });

  localStorage.removeItem(STORAGE_KEY);
  event.target.reset();
}

function savedTextarea() {
  let saveData = load(STORAGE_KEY);
  if (saveData) {
    Object.entries(saveData).forEach(([key, value]) => {
      refs.form.elements[key].value = value;
    });
  }
}
