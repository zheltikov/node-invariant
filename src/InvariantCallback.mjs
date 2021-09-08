
/**
 * @var {Function|null} __callback
 */
let __callback = null;

export class InvariantCallback {
    constructor() {
    }

	/**
	 * @returns {Function|null}
	 */
    static get()
    {
        return __callback;
    }

	/**
	 * @param {Function|null} callback
	 * @returns {void}
	 */
    static set(callback)
    {
        __callback = callback;
    }
}
