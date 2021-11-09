let app = new Vue({
    el: '#app',
    data: {
        brand: 'Vue Masterful',
        product: 'Socks!!!',
        selectedVariant: 0,
        details: ["80% cotton", "20% polyester", "Gender-neutral"],
        variants: [
            {
            variantId: 2234,
            variantColor: "green",
            variantImage: 'monkey.jpeg',
            variantQuantity: 10
            },
        {
            variantId: 2235,
            variantColor: "blue",
            variantImage: 'monkey2.png',
            variantQuantity: 0
        }
        ],
        cart: 0
    },
    methods: {
        addToCard: function () {
            this.cart += 1
        },
        updateProduct: function (index) {
            this.selectedVariant = index
            console.log(index)
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock() {
        return this.variants[this.selectedVariant].variantQuantity
        }
    }
})

// app.inStock = false;