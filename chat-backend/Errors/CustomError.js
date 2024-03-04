class CustomError extends Error {
    constructor(name, message, status) {
        super();
        this.name = "AuthError";
        this.message = message || "Authentication failed";
        this.status = status || 500;
    }
}

export default CustomError;
