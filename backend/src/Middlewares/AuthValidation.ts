import joi from 'joi';
// import { Request, Response, NextFunction } from 'express';

const signupValidation = (req, res, next) => {
    const schema = joi.object({
        name: joi.string().min(3).required(),
        email: joi.string().email().required(),
        password: joi.string().min(6).required(),
        //   confirmPassword: joi.string().valid(joi.ref('password')).required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.message });
    }
    next();
}
const loginValidation = (req, res, next) => {
    const schema = joi.object({
        // name: joi.string().min(3).required(),
        email: joi.string().email().required(),
        password: joi.string().min(6).required(),
        //   confirmPassword: joi.string().valid(joi.ref('password')).required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.message });
    }
    next();
}
export { loginValidation, signupValidation };
