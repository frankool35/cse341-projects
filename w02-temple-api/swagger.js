const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "Temple API",
        description: "API documentation for the CSE341 Temple API",
        version: "1.0.0",
    },

    host: "localhost:8080",
    basePath: "/",
    schemes: ["http"],

    securityDefinitions: {
        apiKey: {
            type: "apiKey",
            name: "apiKey",
            in: "header",
            description: "API key required for GET temple requests.",
        },
    },

    definitions: {
        Temple: {
            type: "object",
            properties: {
                temple_id: {
                    type: "string",
                    example: "1",
                },
                name: {
                    type: "string",
                    example: "Aba Nigeria Temple",
                },
                description: {
                    type: "string",
                    example: "A temple in Aba, Nigeria.",
                },
                location: {
                    type: "string",
                    example: "Aba, Abia, Nigeria",
                },
                dedicated: {
                    type: "string",
                    example: "2005",
                },
                additionalInfo: {
                    type: "string",
                    example: "Additional temple information.",
                },
            },
        },
    },
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);