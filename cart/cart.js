module.exports = function Shopbag(cloth) {
    this.items = cloth.items || {};
    this.totalItems = cloth.totalItems || 0;
    this.totalPrice = cloth.totalPrice || 0;

    this.add = function(item, id) {
        var clothItem = this.items[id];
        if (!clothItem) {
            clothItem = this.items[id] = {item: item, quantity: 0, product_price: 0};
        }
        clothItem.quantity++;
        clothItem.product_price = clothItem.item.product_price * clothItem.quantity;
        this.totalItems++;
        this.totalPrice += clothItem.item.product_price;
    };

    this.remove = function(id) {
        this.totalItems -= this.items[id].quantity;
        this.totalPrice -= this.items[id].product_price;
        delete this.items[id];
    };


    this.getItems = function() {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };
};