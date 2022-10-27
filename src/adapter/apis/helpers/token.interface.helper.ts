import express from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface IToken extends express.Request {
    token: string | JwtPayload;
}