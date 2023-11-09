import { reportControl } from './controlReport.js';
import { financeControl } from './financeControl.js';

const init = () => {
  financeControl();
  reportControl();
};

init();
