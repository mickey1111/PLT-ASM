import ProductTransaction from './product-transcation.service';
jest.mock('../../../data/transactions.json',
    () => [
        { sku: 'abc1', type: 'refund', qty: 2 },
        { sku: 'abc2', type: 'order', qty: 4 },
        { sku: 'abc1', type: 'order', qty: 1 },
    ])

const transaction = new ProductTransaction();

it('It should fetch all transcations related to a item', () => {
    const transactions = transaction.getTransactionsBySKU('abc1');
    expect(transactions).toEqual([{ sku: 'abc1', type: 'refund', qty: 2 }, { sku: 'abc1', type: 'order', qty: 1 }]);
})

it('It should return no transcation, if item transaction does not exist', () => {
    const transactions = transaction.getTransactionsBySKU('abc3');
    expect(transactions).toEqual([]);    
})