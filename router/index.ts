export { Route, Routes } from './Route';
export { Router, callRouter } from './Router';
export { createBrowserRouter, createRouteBoundary } from './creatRoute';
export { handleLocation } from './handleLoc';
export { Link } from './Link';
import * as ParseRoute from './parseRoute';

console.log(ParseRoute.parseRoute('/products', '/products/check/'));
