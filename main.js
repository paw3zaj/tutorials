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
            </b>

            <div>
        <h2>Reviews</h2>
        <p v-if="!reviews.length">There are no reviews yet.</p>
        <ul>
          <li v-for="review in reviews">
          <p>{{ review.name }}</p>
          <p>Rating: {{ review.rating }}</p>
          <p>{{ review.review }}</p>
          </li>
        </ul>
       </div>

            <product-review @review-submitted="addReview" ></product - review >
          
        </div >
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
            reviews: []
        }
    },
    methods: {
        addToCard: function () {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
        },
        updateProduct: function (index) {
            this.selectedVariant = index
            console.log(index)
        },
        addReview(productReview) {
            this.reviews.push(productReview)
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

Vue.component('product-review', {
    template: `
    <div>
    <form class="review-form" @submit.prevent="onSubmit">

        <p v-if="errors.length">
            <b>Please correct the following error(s):</b>
            <ul>
            <li v-for="error in errors"> {{ error }}</li>
            </ul>
            </p>

      <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name" placeholder="name">
      </p>
      <p>
        <label for="review">Review:</label>      
        <textarea id="review" v-model="review"></textarea>
      </p>
      
      <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p >

    <p>
        <input type="submit" value="Submit">
    </p>    
    
    </form >
    </div>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            errors: []
        }
    },
    methods: {
        onSubmit() {
            if(this.name && this.review && this.rating) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating
                }
                this.$emit('review-submitted', productReview)
                this.name = null
                this.review = null
                this.reting = null
            } else {
                if(!this.name) this.errors.push("Name Required.")
                if(!this.review) this.errors.push("Review Required.")
                if(!this.rating) this.errors.push("Rating Required.")
            }
            
        }
    }
})

let app = new Vue({
    el: '#app',
    data: {
        premium: false,
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        }
    }
})
