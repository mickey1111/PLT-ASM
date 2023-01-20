import { ApiError } from '../../../error';
import ProductInventory from './product-inventory.service'
jest.mock('../../../data/stock.json', () => [{sku: 'abc1', stock: 5}, {sku: 'abc2', stock: 0}])

const inventory = new ProductInventory();
it('Retrieve stock when item exist in stock', () => {
    const stock = inventory.getItemStockBySKU('abc2');
    expect(stock).toEqual({sku: 'abc2', stock: 0});
})

it('Retrieve null when item does not exist in stock', () => {
    const stock = inventory.getItemStockBySKU('abc3');
    expect(stock).toEqual(null);
})

it('Item quantity should increase when stock increase', () => {
    const updatedStock = inventory.increaseStock({sku: 'abc2', stock: 2});
    expect(updatedStock).toEqual({sku: 'abc2', stock: 2});
})

it('Item stock should be added if does not exist', () => {
    const updatedStock = inventory.increaseStock({sku: 'abc3', stock: 10});
    expect(updatedStock).toEqual({sku: 'abc3', stock: 10});
})

it('Item quantity should decrease when stock decrease', () => {
    const updatedStock = inventory.decreaseStock({sku: 'abc1', stock: 2});
    expect(updatedStock).toEqual({sku: 'abc1', stock: 3});
})

it('It should throw "out of stock" error, if stock is less than required stock, ', () => {
    expect(() => {inventory.decreaseStock({sku: 'abc1', stock: 7})}).toThrow(ApiError.badRequest('out of stock'));
})