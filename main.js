Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
    <div class="product">
            <h1>{{ title }}</h1>
            <!-- <p v-show="inStock">In Stock</p> -->
            <p v-if="inStock">In Stock</p>
            <p v-else>Out in Stock</p>
            <p>Shipping: {{shipping}}</p>

            <ul>
                <li v-for="detail in details">{{ detail }}</li>
            </ul>

            <div v-for="(variant, index) in variants" :key="variant.variantId" class="color-box"
                :style="{ backgroundColor: variant.variantColor }" @mouseover="updateProduct(index)">
            </div>

            <div class="product-image">
                <img v-bind:src="image">
            </div>

            <button v-on:click="addToCard" :disabled="!inStock" :class="{ disabledButton: !inStock }">
                Add to Cart
            </button>

            <div class="cart">
                <p>Cart({{cart}})</p>
            </div>
        </div>
    `,
    data() {
        return {
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
        }
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
        },
        shipping() {
            if (this.premium) {
                return "Free"
            }
            return 2.99
        }
    }
})

let app = new Vue({
    el: '#app',
    data: {
        premium: false
    }
})
