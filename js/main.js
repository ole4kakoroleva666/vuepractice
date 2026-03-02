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
