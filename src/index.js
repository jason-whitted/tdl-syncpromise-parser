export { default as SyncPromise } from './SyncPromise';
export { default as createExecutionPlan } from './createExecutionPlan';

import number from './Parse.number';
import string from './Parse.string';

export const Parse = { number, string };
