import stockData from '../../../data/stock.json'
import { ApiError } from '../../../error';
import Inventory from '../inventory.interface'
import { ProductStock } from './product-inventory.type';

export default class ProductInventory implements Inventory<ProductStock>{
    private itemsStock: ProductStock[];
    constructor(){
        this.itemsStock = [...stockData];
    }

    public getItemStockBySKU(sku: string): ProductStock {
        const itemStock = this.itemsStock.find(item => item.sku === sku);

        return itemStock? {...itemStock} : null;
    }
    public increaseStock(itemStock: ProductStock): ProductStock {
        const currentStock = this.getItemStockBySKU(itemStock.sku);
        if(!currentStock){
            this.addStock(itemStock);
            return itemStock;
        }
        const newQty = currentStock.stock + itemStock.stock;
        const updatedStock = {sku: itemStock.sku, stock: newQty};

        this.updateStock(updatedStock);

        return updatedStock;
    }
    public decreaseStock(itemStock: ProductStock): ProductStock {
        const currentStock = this.getItemStockBySKU(itemStock.sku);
        if(!currentStock || currentStock.stock < itemStock.stock){
            throw ApiError.badRequest('out of stock');
        }
        const newQty = currentStock.stock - itemStock.stock;
        const updatedStock = {sku: itemStock.sku, stock: newQty};

        this.updateStock(updatedStock);

        return updatedStock;
    }
    private addStock(itemStock: ProductStock) {
        const currentItemStock = this.getItemStockBySKU(itemStock.sku);
        if(currentItemStock){
            throw new Error('Error adding stock: Stock already exist');
        }

        this.itemsStock.push(itemStock);        
    }
    private updateStock(itemStock: ProductStock) {
        const itemIndex = this.itemsStock.findIndex(item => item.sku === itemStock.sku);
        if(itemIndex < 0){
            throw new Error('Error updating stock: Stock does not exist');
        }
        this.itemsStock[itemIndex] = itemStock;
    }
}