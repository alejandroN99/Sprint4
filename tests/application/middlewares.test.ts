import { middleware1, middleware2, basicAuth } from '../../src/backend/application/middlewares';
import {Request,Response,NextFunction} from 'express';

describe('Middlewares', () => {
  let req: any;
  let res :any;
  let next: NextFunction;

  beforeEach(() => {
    req = {};
    res = {
      setHeader: jest.fn(),
    };
    next = jest.fn();
  });

    describe('middleware1', () => {
    test('should add Cache-Control header to the response', () => {
      middleware1(req, res, next);

      expect(res.setHeader).toHaveBeenCalledWith('Cache-Control', 'no-cache');
      expect(next).toHaveBeenCalled();
    });
  });

  describe('middleware2', () => {
    test('should add CORS headers to the response', () => {
      middleware2(req, res, next);

      expect(res.setHeader).toHaveBeenCalledWith('Access-Control-Allow-Origin', '*');
      expect(res.setHeader).toHaveBeenCalledWith('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      expect(res.setHeader).toHaveBeenCalledWith('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      expect(next).toHaveBeenCalled();
    });
  });

});

describe('', () => {
    let req: any;
    let res :any;
    let next: NextFunction; 

    beforeEach(() => {
        req = {
          headers: {},
        };
        res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn(),
        };
        next = jest.fn();
      });
    
      test('should return 401 Unauthorized if basic authentication credentials are invalid', () => {
        req.headers = {
          authorization: 'username: user,password: password22', 
        };
    
        basicAuth(req as Request, res as Response, next);
    
        expect(res.status).toBeCalledWith(401);
        expect(res.send).toBeCalledWith('Unauthorized');
      });
})


