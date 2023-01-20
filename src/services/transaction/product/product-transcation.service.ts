import Transaction from "../transcation.interface"
import transactions from "../../../data/transactions.json"
import { itemTransaction } from "./product-transaction.type";

export default class ProductTransaction implements Transaction<itemTransaction>{
    private productTranscations: itemTransaction[];
    constructor(){
        this.productTranscations = [...transactions];
    }
    public getTransactionsBySKU(sku: string): itemTransaction[] {
        return this.productTranscations.filter(trx => trx.sku === sku);
    }
}