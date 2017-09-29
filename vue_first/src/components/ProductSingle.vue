<template xmlns:v-on="http://www.w3.org/1999/xhtml">
	<div class="container">
      <div class="row formcontrol">
			<div class="page">
				<div class="col-md-6 ">
			<slider class="slider">
					<slider-item v-for="slider in  product.img">
						<div>
						<img :src="slider" alt="">
						</div>
					</slider-item>
			</slider>
			</div>
			<div class="col-md-6 ">
			<h2>{{ product.name }}</h2>
			<p class="price">Price: {{ product.price }} </p>
			<div class="form-group">
				<select id="size" class="form-control" v-model="sizes">
					<option value="">Choose size</option>
					<option v-for="size in  product.size" :value="size">
						{{size}}
					</option>
				</select>
			</div>
			<div class="btn-group">
				<div class="dropdown">
					<div></div>
					<span v-if="btn === 'Add to bag'" type="button" class="btn btn-success" v-on:click="addToCart()">{{ btn }}</span>
					<router-link v-else to="/cart"><span class="btn br1 br2">{{ btn }}</span></router-link>
					<p v-if="msg != ''"  class="alert alert-danger">{{ msg }}</p>
					<p><router-link to='/'><span>Main Page</span></router-link></p>
				</div>
			</div>
				<div class="counter">
					<span v-if="count > 0">{{ count }}</span>
				</div>
			<div :created="created" ></div>
		</div>
		</div>
	</div>
	</div>
</template>

<script>
	import myBackend from '../js/myBackend'
	import { Slider, SliderItem } from 'vue-easy-slider'
	export default {
		name: 'page',
		data () {
			return {
				id: '',
				sizes: '',
				quantity: '',
				btn: 'Add to bag',
				count: '',
				msg: '',
				product: {},
				products: [],
				dataProducts: myBackend.todo
			}
		},
		methods: {
			getProdById: function(products, id){
				let self = this
				products.forEach(function(val){
					if(val.id == id){
						return self.product = val
					}
				})
			},
			getCount: function(){
				let self = this
				if (localStorage['cart']){
					var data = JSON.parse(localStorage['cart'])
					var i = 0
					self.count = 0
					for(var key in data){
						i += data[key].count
					}
					self.count = i
					return self.count
				}
			},
			copyObj: function(obj){
				var copy = {}
				for(var key in obj){
					copy[key] = obj[key]
				}
				return copy
			},
			addToCart: function(){
				if (this.sizes == ''){
					this.msg = 'Select size!'
					return false
				}
				var self = this
				this.msg = ''
				if (localStorage['cart']){
					var cart = JSON.parse(localStorage['cart'])
					if(cart.hasOwnProperty(self.product.id)){
						if (cart[self.product.id].size.indexOf(self.sizes) == -1){
							cart[self.product.id].size.push(self.sizes)
							cart[self.product.id].count++
							localStorage['cart'] = JSON.stringify(cart)
							this.btn = 'Proceed to chekout'
							self.getCount()
						}else{
							self.msg = 'This size is already exist!'
						}
					}else{
						var data = self.copyObj(self.product)
						data.size = []
						data.size.push(self.sizes)
						data.count = 1
						cart[data.id] = data
						localStorage['cart'] = JSON.stringify(cart)
						this.btn = 'Proceed to chekout'
						self.getCount()
					}
					}else{
						var data = self.copyObj(self.product)
						var cart = {}
						data.size = []
						data.size.push(self.sizes)
						data.count = 1
						cart[data.id] = data
						localStorage['cart'] = JSON.stringify(cart)
						this.btn = 'Proceed to chekout'
						self.getCount()
					}
				},

		},
		components: {
			Slider,
			SliderItem
		},
		computed: {
			created(){
				this.products = this.dataProducts,
						this.id = this.$route.params.id
				return this.getProdById(this.products, this.id)

			}
		}
	}
</script>
<style scoped>
.slider {
	background-color: grey;
}
.price {
	font-weight: bold;
	font-size: 18px;
}
</style>


