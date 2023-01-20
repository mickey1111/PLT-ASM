export default interface Inventory<T>{
    getItemStockBySKU(sku: string): T | null;
    increaseStock(itemStock: T): T;
    decreaseStock(itemStock: T): T;
}