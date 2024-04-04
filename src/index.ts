import express from "express";
import { AppDataSource } from "./data-source";
import routes from "./routes";

AppDataSource.initialize().then(() => {

    console.log("DB Connected.")

    const app = express();

    app.use(express.json());

    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });

    app.use(routes);

    return app.listen({ port: process.env.PORT }, () => console.log(`Server Listening to Port ${process.env.PORT}`));

});