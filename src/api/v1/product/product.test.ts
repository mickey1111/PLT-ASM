import { Request, Response } from 'express';
import ProductCtrl from './product.controller';
import * as inventory from '../../../services/inventory';
import * as transaction from '../../../services/transaction';
import { ApiError } from '../../../error';

const request = {
    query: {sku: "abc"}
} as any as Request;

const response =  {
    send: jest.fn((x) => x),
    status: jest.fn((x) => x)
} as any as Response;

const stock = { sku: 'abc', stock: 1 };
const increaseStock = jest.fn((x) => {
    return stock;
});
const decreaseStock = jest.fn((x) => {
    return stock;
});
jest.spyOn(inventory.ProductInventory.prototype, 'increaseStock').mockImplementation(increaseStock);
jest.spyOn(inventory.ProductInventory.prototype, 'decreaseStock').mockImplementation(decreaseStock);

it('should send a response of 200 when item exist in stock', () => {
    jest.spyOn(transaction.ProductTransaction.prototype, 'getTransactionsBySKU').mockImplementationOnce(() => {
        return [];
    })
    jest.spyOn(inventory.ProductInventory.prototype, 'getItemStockBySKU').mockImplementationOnce(() => {
        return stock
    })
    ProductCtrl.getStockQTYBySKU(request, response);

    expect(response.status).toHaveBeenCalledTimes(0);
    expect(response.send).toHaveBeenCalledWith(stock);
})

it('should throw "Product not found" error when item exist does not exist in stock and transaction', () => {
    jest.spyOn(transaction.ProductTransaction.prototype, 'getTransactionsBySKU').mockImplementationOnce(() => {
        return [];
    })
    jest.spyOn(inventory.ProductInventory.prototype, 'getItemStockBySKU').mockImplementationOnce(() => {
        return null;
    })

    expect(() => {ProductCtrl.getStockQTYBySKU(request, response)}).toThrow(ApiError.notFound("Product not found"));
})

it('should decrease stock when transaction is of type "order', () => {
    jest.spyOn(transaction.ProductTransaction.prototype, 'getTransactionsBySKU').mockImplementationOnce(() => {
        return [{sku: 'abc', type: 'order', qty: 1}];
    });
    jest.spyOn(inventory.ProductInventory.prototype, 'getItemStockBySKU').mockImplementationOnce(() => {
        return stock;
    });

    ProductCtrl.getStockQTYBySKU(request, response);
    expect(decreaseStock).toHaveBeenCalledTimes(1);
})

it('should increase stock when transaction is of type "refund', () => {
    const stock = { sku: 'abc', stock: 2 };

    jest.spyOn(transaction.ProductTransaction.prototype, 'getTransactionsBySKU').mockImplementationOnce(() => {
        return [{sku: 'abc', type: 'refund', qty: 1}];
    });
    jest.spyOn(inventory.ProductInventory.prototype, 'getItemStockBySKU').mockImplementationOnce(() => {
        return stock;
    });

    ProductCtrl.getStockQTYBySKU(request, response);
    expect(increaseStock).toHaveBeenCalledTimes(1);
})