import { createClient } from "microcms-js-sdk";

const apiKey = process.env.API_KEY;

if (!apiKey) {
    throw new Error("API_KEY is not defined in environment variables.");
}

export const client = createClient({
    serviceDomain: "blog-technikki",
    apiKey
});