export class StandardError extends Error {
    public error_code: string;
    public lastError: Error;
    public context;
    constructor(errorCode: string, message: string, lastError: Error, context) {
        super(message);

        this.error_code = errorCode;
        this.message = message;
        this.stack = Error().stack;
        this.lastError = lastError;
        this.context = context;

        if(this.lastError) {
            this.stack += '\n-\n' + lastError.stack;
        }
    }
}
