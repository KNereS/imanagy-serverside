import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { authMiddleware } from "./middlewares/authMiddleware";

const routes = Router()

routes.get('/', (req, res) => {
    res.json({ message: "Everything's Okay" });
});

routes.post('/register', new UserController().create);

routes.post('/login', new UserController().login);

routes.get('/user', authMiddleware, new UserController().getProfile);

export default routes;