import { domProducts } from '../dom.js';
import {displayProducts} from '../displayProducts.js';
import { arrGetUniqueValues } from '../utils.js'; 


export function setupCompanies(store) {
  let companies = arrGetUniqueValues (store,'company')
  console.log(companies)
}
