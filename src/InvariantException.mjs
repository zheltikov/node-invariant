
export class InvariantException extends Error {
	constructor(message, fileName, lineNumber) {
		// Pass remaining arguments (including vendor specific ones) to parent constructor
		super(message, fileName, lineNumber)

		// Maintains proper stack trace for where our error was thrown (only available on V8)
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, InvariantException)
		}

		this.name = 'InvariantException'
	}
}
