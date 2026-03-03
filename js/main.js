Vue.component('product-details', {

    props: {
        details: {
            type: Array,
            required: true
        }
    },

    template:`
    <ul>
        <li v-for ="detail in details"> {{ detail }} </li>
    </ul>

    `
})

Vue.component('product-review', {
    template:`
        <form class="review-form" @submit.prevent="onSubmit">
            <p v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul>
                    <li v-for="error in errors">{{ error }}</li>
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
            </p>

            <fieldset>
                <legend> Would you recommend this product? </legend>
                <div>
                    <input type="radio" id="recommend-yes" value="yes" v-model="recommend" />
                    <label for="recommend-yes">Yes</label>

                    <input type="radio" id="recommend-no" value="no" v-model="recommend" />
                    <label for="recommend-no">No</label>

                </div>
            </fieldset>

            <p>
                <input type="submit" value="Submit"> 
            </p>



        </form>

    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            recommend: null,
            errors: []
        }
    },

    methods:{
        onSubmit() {
            this.errors = []
            if(this.name && this.review && this.rating && this.recommend) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recommend: this.recommend
                }
                this.$emit('review-submitted', productReview)
                this.name = null
                this.review = null
                this.rating = null
                this.recommend = null
            } else {
                if(!this.name) this.errors.push("Name required.")
                if(!this.review) this.errors.push("Review required.")
                if(!this.rating) this.errors.push("Rating required.")
                if(!this.recommend) this.errors.push("Tell if you recommend this product")    
            }
        }

    }

})

Vue.component('product', {

    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },

    template: `
        <div class="product">

        <div class="product-image">
            <img :src="image" :alt="product"/>
        </div>

        <div class="product-info">

            <h1>{{ title }}</h1>

            <p class="sale-message">{{ sale }}</p>

            <span v-if="onSale" class="sale"> On sale </span>

            <p> {{ description }} </p>

            <a v-bind:href="link"> More products like this </a>

            <p v-if="inStock">In stock</p>
            <p v-else class="outOfStock" :style="{ textDecoration: 'line-through' }">Out of Stock </p>

            <product-details :details="details"></product-details>

            <p>Shipping: {{ shipping }}</p> 

            <div class="color-box" v-for="(variant, index) in variants" 
                :key="variant.variantId" 
                :style="{ backgroundColor:variant.variantColor }"
                @mouseover="updateProduct(index)">

            </div>    
                
            <h2>choose size</h2>
            <ul> 
                <li v-for="size in sizes" :key="size">{{ size }}</li>
            </ul>

                <button
                v-on:click="addToCart"
                :disabled="!inStock"
                :class="{ disabledButton: !inStock }">
                Add to cart
                </button>

                <button
                v-on:click="deleteToCart"
                :disabled="!inStock"
                class="delete-button">
                Remove from cart
                </button> 
            
        </div>

        <div>
            <h2>Reviews</h2>
            <p v-if="!reviews.length">There are no reviews yet.</p>
        <ul v-else>
            <li v-for="review in reviews" :key="review.name">
            <p>{{ review.name }}</p>
            <p>Rating: {{ review.rating }}</p>
            <p>{{ review.review }}</p>
            <p>Recommend: {{ review.recommend === 'yes' ? 'Yes' : 'No' }}</p>
            </li>
        </ul>
        </div>


        <product-review @review-submitted="addReview"></product-review>
    </div>
   `,

   data () {
    return {
       product: "Socks",
       brand: 'Vue Mastery',
       description: "A pair of warm, fuzzy socks",
       selectedVariant: 0,
       link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords",
       inventory: 100,
       onSale: false,
       details: ['80% cotton', '20% polyester', 'Gender-neutral'],
       variants: [
        {
            variantId: 2234,
            variantColor: 'green',
            variantImage: "./assets/vmSocks-green-onWhite.jpg",
            variantQuantity: 10
        },
        {
            variantId: 2235,
            variantColor: 'blue',
            variantImage: "./assets/vmSocks-blue-onWhite.jpg",
            variantQuantity: 0
        }
        ],

        sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
        reviews: []
    }
    },

    computed: {

        image() {
            return this.variants[this.selectedVariant].variantImage
        },

        inStock() {
            return this.variants[this.selectedVariant].variantQuantity > 0
        },

        title() {
            return this.brand + ' ' + this.product;
        },

        sale() {
            if(this.onSale) {
                return this.brand + ' ' + this.product + ' is on sale ^_^'
            } else {
                return this.brand + ' ' + this.product + ' is not on sale -_-'
            }
        },

        shipping() {
            if(this.premium) {
                return "Free"
            } else {
                return 2.99
            }
        }

    },

    methods:{
        addToCart() {
            this.$emit('add-to-cart',
            this.variants[this.selectedVariant].variantId);
        },

        deleteToCart() {
            this.$emit('delete-to-cart', this.variants[this.selectedVariant].variantId)
        },

        updateProduct (index) {
            this.selectedVariant = index
            console.log(this.variants[index].variantQuantity > 0)   
        },

        addReview(productReview) {
            this.reviews.push(productReview)
        }
    }
       
})

    let app = new Vue({
        el: '#app',
        data: {
            premium: true,
            cart: []
        },
        methods: {
            updateCart(id) {
                this.cart.push(id);
            },

            deleteToCart(id) {
                const index = this.cart.indexOf(id)
                if (index !== -1) {
                    this.cart.splice(index, 1)
                }
            }
        }
    })
