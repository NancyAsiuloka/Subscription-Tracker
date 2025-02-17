import { Router } from "express";

const userRouter = Router();

userRouter.get('/', (req, res) => res.send('Fetch all users'));
userRouter.get('/:id', (req, res) => res.send('Fetch user by id'));
userRouter.post('/', (req, res) => res.send('Create user'));
userRouter.put('/:id', (req, res) => res.send('Update user by id'));
userRouter.delete('/:id', (req, res) => res.send('Delete user by id'));


export default userRouter;