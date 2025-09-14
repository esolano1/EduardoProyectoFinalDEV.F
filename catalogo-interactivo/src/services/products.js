// src/services/products.js
import { api } from './api';

export function getProducts() {
  return api('/products');
}

export function getCategories() {
  return api('/products/categories');
}
