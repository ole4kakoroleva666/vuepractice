let app = new Vue({
   el: '#app',
   data: {
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
        cart: 0
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
        }

    },

    methods:{
        addToCart() {
            this.cart += 1
        },

        deleteToCart() {
            if (this.cart > 0) {
                this.cart -= 1
            }
        },          

        updateProduct (index) {
            this.selectedVariant = index
            console.log(this.variants[index].variantQuantity > 0)   
        }
    }
       
})

