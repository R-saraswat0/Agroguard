export const PORT = 5557;

// Use local MongoDB if Atlas connection fails
export const mongoDBURL = process.env.MONGODB_URL || "mongodb://localhost:27017/agpro";
export const JWT_SECRET = "your_jwt_secret_here";
export const JWT_EXPIRE = "1h";
