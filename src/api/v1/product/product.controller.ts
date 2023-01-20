import { Request, Response } from 'express';
import {ProductInventory} from '../../../services/inventory'
import {ProductTransaction} from '../../../services/transaction'
import * as trxConstants from '../../../constants/transaction.constant';
import { ApiError } from '../../../error';

export default class ProductCtrl {
    public static getStockQTYBySKU(req: Request, res: Response) {
        const skuId = req.query.sku as string;
        const inventory = new ProductInventory();
        const transcation = new ProductTransaction();
        const transcations = transcation.getTransactionsBySKU(skuId);

        for(const trx of transcations){
            const itemStock = {sku: trx.sku, stock: trx.qty};
            switch (trx.type){
                case trxConstants.TYPE.ORDER:
                    inventory.decreaseStock(itemStock);
                    break;
                case trxConstants.TYPE.REFUND:
                    inventory.increaseStock(itemStock);
                    break;
            }
        }
        
        const stock = inventory.getItemStockBySKU(skuId); 
        if(!stock){
            throw ApiError.notFound("Product not found");
        }

        res.send(stock);
    }
}