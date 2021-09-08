
import { invariant } from './src/functions.mjs';

const obj = new Date();
invariant(obj instanceof Date, 'Object must have type Date');

const p = 123;
invariant(p !== null, 'Value can\'t be null');

const max = 100;
invariant(p !== null && p <= max, 'p\'s value %d must be <= %d', p, max);
