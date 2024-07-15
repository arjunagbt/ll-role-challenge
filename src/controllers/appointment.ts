import { Router } from 'express'
import Joi from 'joi'
import validator from 'express-joi-validation';

const router = Router();

router.post('app/create')