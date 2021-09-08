
import { vsprintf } from 'sprintf-js';

import { InvariantCallback } from './InvariantCallback.mjs';
import { InvariantException } from './InvariantException.mjs';

/**
 * When objects are passed as an argument, without a __toString() defined,
 * causes a fatal error. Handle these objects gracefully by displaying their
 * class name.
 *
 * @param {any} arg
 * @return {any|string}
 */
function invariant_violation_helper(arg)
{
    if (typeof arg !== 'object') {
        return arg;
    }

    return arg.toString();
}

/**
 * Pass a callable that will be called when any `invariant` fails. The callback
 * will be called with all the `invariant` parameters after the condition.
 *
 * @param {Function} callback The function that will be called when an invariant fails.
 * @returns {void}
 * @throws InvariantException
 */
export function invariant_callback_register(callback)
{
    invariant(
        typeof callback === 'function',
        'Callback is not a function: %s',
        callback,
    );

    invariant(
        InvariantCallback.get() === null,
        'Callback already registered: %s',
        InvariantCallback.get(),
    );

    InvariantCallback.set(callback);
}

/**
 * Ensure that an invariant is satisfied. If it fails, it calls
 * `invariant_violation`
 *
 * @param {any} test
 * @param {String} format_str The string that will be displayed when your
 *                           invariant fails, with possible placeholders.
 * @param {...any} args
 * @returns {void}
 * @throws InvariantException
 */
export function invariant(test, format_str, ...args)
{
    if (!test) {
        invariant_violation(format_str, ...args);
    }
}

/**
 * Call this when one of your `invariant`s has been violated. It calls the
 * function you registered with `invariant_callback_register` and then throws an
 * `InvariantException`
 *
 * @param {String} format_str The string that will be displayed when your
 *                           invariant fails.
 * @param {...any} args
 * @returns {void}
 * @throws InvariantException
 */
export function invariant_violation(format_str, ...args)
{
    const callback = InvariantCallback.get();
    if (callback !== null) {
        callback(format_str, ...args);
    }

	args.forEach((value, index) => {
		if (typeof value === 'object') {
			args[index] = invariant_violation_helper(value);
		}
	});

    const message = vsprintf(format_str, args);

    throw new InvariantException(message);
}
