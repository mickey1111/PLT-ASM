import { itemTransaction } from './product/product-transaction.type'
export default interface Transcation<T>{
    getTransactionsBySKU(sku: string): T[];
}