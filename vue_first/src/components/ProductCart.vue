<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8">
                <h3>Checkout</h3>
                <div v-if="products != ''">
                    <div class="col-md-12 product" v-for="prod in prodCart" >
                        <div class="row">
                            <div class="col-sm-3">
                                <h6>{{prod.name}}</h6>
                                <p class="left_p" > Size<br> <span> {{prod.size}}</span></p>
                                <p class="left_p"> Color<br> <span> {{prod.color}}</span></p>
                            </div>
                            <div class="col-sm-2">
                                <button class="del_butt" v-on:click="delBtn(prod)">X</button>
                                <p class="price"><span> {{prod.price}} EUR</span></p>
                                <button v-on:click="getBtnCountMinus(prod)">-</button>
                                {{ prod.count }}
                                <button v-on:click="getBtnCountPlus(prod)">+</button>
                            </div>
                            <div class="col-sm-7"> <img :src="prod.img" alt=""></div>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <p class="alert alert-danger">no item</p>
                </div>
            </div>
            <div class="col-md-3 right_sidebar">
                <div class="voucher">
                    <h4>Voucher code</h4>
                    <p><input type="text" v-model="vaucher" placeholder="Input vaucher"></p>
                    <p class="button"><span class="btn btn-warning" type="button" v-on:click="getVaucher">Submit</span></p>
                </div>
                <div>
                    <ul class="list-group">
                        <li class="list-group-item">
                            <p>Basket:</p> {{basket}} EUR
                        </li>
                        <li class="list-group-item">
                            <p> Vaucher: </p>{{ vaucherCount }} EUR
                        </li>
                        <li class="list-group-item">
                            <p> Shipping:</p> {{ shipping }} EUR
                        </li>
                        <li class="list-group-item">
                            <p> Grand Total</p> {{ total }} EUR
                        </li>
                    </ul>
                </div>
                <cartform></cartform>
            </div>
        </div>

    </div>
</template>

<script>
    import Cartform from './Cartform'
    export default {
        data() {
            return {
                products: '',
                basket: 0,
                prodCart: [],
                count: 1,
                shipping: 10,
                vaucherCount: 0,
                total: 0,
                vaucher: '',

            }
        },
        created(){
            this.getProducts()
            this.getParseProducts()
            this.getBasketPrice()
            this.getTotalprice()
        },
        methods: {
            getProducts: function(){
                if(localStorage['cart']){
                    this.products = JSON.parse(localStorage['cart'])
                }
            },
            getTotalprice: function(){
                this.total = this.basket + this.shipping - this.vaucherCount
                this.total = this.total.toFixed(2)
                localStorage['order'] = JSON.stringify(this.prodCart)
                localStorage['total'] = JSON.stringify(this.total)
                return this.total
            },
            getVaucher: function(){
                var self = this
                if (self.vaucher == 'disck10'){
                    self.vaucherCount = self.basket * 0.1
                    self.vaucherCount = self.vaucherCount.toFixed(2)
                    this.getTotalprice()
                } else if (self.vaucher == 'disck5eur'){
                    self.vaucherCount = 5
                    this.getTotalprice()
                } else {
                    self.vaucherCount = 0
                    this.getTotalprice()
                }
            },
            getParseProducts: function(){
                var self = this
                for(var key in self.products){
                    if (self.products[key].size.length > 1){
                        for(var i=0; i<self.products[key].size.length; i++){
                            var copy = {}
                            copy.id = self.products[key].id
                            copy.color = self.products[key].color
                            copy.price = self.products[key].price
                            copy.name = self.products[key].name
                            copy.img = self.products[key].img[0]
                            copy.size = self.products[key].size[i]
                            copy.count = 1
                            self.prodCart.push(copy)
                        }
                    }else{
                        var copy = {}
                        copy.id = self.products[key].id
                        copy.color = self.products[key].color
                        copy.price = self.products[key].price
                        copy.name = self.products[key].name
                        copy.img = self.products[key].img[0]
                        copy.size = self.products[key].size[0]
                        copy.count = 1
                        self.prodCart.push(copy)
                    }
                }
            },
            getBasketPrice: function(){
                var self = this
                self.basket = 0
                if(self.prodCart){
                    for(var key in self.prodCart){
                        self.basket += +self.prodCart[key].price * +self.prodCart[key].count
                    }
                    self.basket = self.basket.toFixed(2)
            }
            },

            getBtnCountPlus: function(obj){
                var self = this
                for(var key in self.prodCart){
                    if (self.prodCart[key].id == obj.id){
                        self.prodCart[key].count +=1
                    }
                }
                self.getBasketPrice()
            },
            getBtnCountMinus: function(obj){
                if (obj.count < 2) {
                    this.cont = 1
                } else {
                    this.cont =   obj.count--
                    this.getBasketPrice()
                }

            },
            delBtn: function(obj){
                var self = this
                for (var key in self.prodCart){
                    if(self.prodCart[key].id == obj.id ){
                        self.prodCart.splice(key, 1)
                    }
                }
                self.getBasketPrice()
                self.refreshLocalStorage()
            },
            refreshLocalStorage: function(){
                var self = this
                var data = {}
                var copyProd = JSON.parse(JSON.stringify(self.prodCart))
                for (var key in copyProd){
                    var arrSize = []
                    var arrImg = []
                    arrSize.push(copyProd[key].size)
                    arrImg.push(copyProd[key].img)
                    copyProd[key].size = arrSize
                    copyProd[key].img = arrImg
                    if(data[copyProd[key].id]){
                        data[copyProd[key].id].size.push(copyProd[key].size[0])
                        data[copyProd[key].id].count +=1
                    }else{
                        data[copyProd[key].id] = copyProd[key]
                    }
                }
                localStorage['cart'] = JSON.stringify(data)
                if(localStorage['cart'].length === 2){
                    delete localStorage['cart']
                    self.products = ''
                }
            }
        },
        components: {
            'Cartform': Cartform
        }
    }
</script>

<style scoped>
    h3 {
        text-align: left;
        padding-bottom: 10px;
    }
    h6 {
        font-weight: bold;
        text-align: left;
        font-size: 19px;
    }
    .voucher_{
        width: 100%;
        border-bottom: 1px solid #000;
    }
    .voucher h4 {
        text-align: left;
    }
    .button {
        text-align: left;
    }

    .voucher input {
        width: 100%;
    }
    .del_butt {
        float:right;
    }
    p span {
        font-weight: bold;
        font-size: 16px;
    }
    .product {
        border-bottom: 1px solid #000;
        border-top: 1px solid #000;
        padding-top: 20px;
        padding-bottom: 20px;
    }
    .left_p {
        text-align: left;
        padding-top: 30px;
    }
    .price {
        padding-top: 100px;
        padding-bottom: 20px;
    }
    .list-group-item p {
        text-align: left;
    }
    .col-sm-7 img{
        width: 200px;
    }
</style>