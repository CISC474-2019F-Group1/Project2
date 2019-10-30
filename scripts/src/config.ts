export namespace Config {
    // Secret key for JWT signing and encryption
    export const secret = process.env.secret || "super secret passphrase";
    // Database connection information
    export const database = process.env.database || "mongodb://localhost:27017";
    // Setting port for server
    export const port = +process.env.serverPort || 3000;
}
