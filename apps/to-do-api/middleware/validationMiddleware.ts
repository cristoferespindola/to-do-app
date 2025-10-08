import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';
import { StatusCodes } from 'http-status-codes';

type ValidationTarget = 'body' | 'params' | 'query';

interface ValidationOptions {
  target?: ValidationTarget;
  schema: z.ZodSchema;
}

export function validate(schema: z.ZodSchema, target: ValidationTarget = 'body') {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      let dataToValidate: any;
      
      switch (target) {
        case 'params':
          dataToValidate = req.params;
          break;
        case 'query':
          dataToValidate = req.query;
          break;
        case 'body':
        default:
          dataToValidate = req.body;
          break;
      }

      const validatedData = schema.parse(dataToValidate);

      req.validated = {
        ...req.validated,
        [target]: validatedData,
      };
      
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
          code: issue.code,
        }));

        res.status(StatusCodes.BAD_REQUEST).json({
          error: 'Validation failed',
          message: 'Invalid data provided',
          details: errorMessages,
          target,
        });
      } else {
        console.error('Validation middleware error:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          error: 'Internal server error',
          message: 'An unexpected error occurred during validation',
        });
      }
    }
  };
}

export function validateData(schema: z.ZodSchema) {
  return validate(schema, 'body');
}
    
export function validateParams(schema: z.ZodSchema) {
  return validate(schema, 'params');
}

export function validateQuery(schema: z.ZodSchema) {
  return validate(schema, 'query');
}

export function validateMultiple(validations: ValidationOptions[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.validated = req.validated || {};
      
      for (const { schema, target = 'body' } of validations) {
        let dataToValidate: any;
        
        switch (target) {
          case 'params':
            dataToValidate = req.params;
            break;
          case 'query':
            dataToValidate = req.query;
            break;
          case 'body':
          default:
            dataToValidate = req.body;
            break;
        }

        const validatedData = schema.parse(dataToValidate);
        req.validated[target] = validatedData;
      }
      
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
          code: issue.code,
        }));

        res.status(StatusCodes.BAD_REQUEST).json({
          error: 'Validation failed',
          message: 'Invalid data provided',
          details: errorMessages,
        });
      } else {
        console.error('Validation middleware error:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          error: 'Internal server error',
          message: 'An unexpected error occurred during validation',
        });
      }
    }
  };
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      validated?: {
        body?: any;
        params?: any;
        query?: any;
      };
    }
  }
}