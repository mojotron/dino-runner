import dinoView from './views/dino-view';

function SecretMode() {
  const secret = 'evolution';
  const code = [];

  const spliceCode = () => {
    code.splice(-secret.length - 1, code.length - secret.length);
  };

  const checkCode = () => secret === code.join('');

  const addValue = value => {
    code.push(value);
    spliceCode();
    if (checkCode()) dinoView.fly();
  };

  return { addValue };
}

export default SecretMode();
