<template>
  <div class="filter_section">
    <div class="container">
      <div class="col-sm-12  well">
        <div class="form-group col-sm-2" id="select1">
          <select id="category"  class="form-control" v-model="category" >
            <option value="">Category</option>
            <option v-for="category in  options.categories" :value="category.value">
              {{category.title}}
            </option>
          </select>
        </div>
        <div class="form-group col-sm-2">
          <select id="color" class="form-control" v-model="color">
            <option value="">Color</option>
            <option v-for="color in  options.colors" :value="color.value">
              {{color.title}}
            </option>
          </select>
        </div>
        <div class="form-group col-sm-2">
          <select id="size" class="form-control" v-model="size">
            <option value="">Size</option>
            <option v-for="size in  options.sizes" :value="size.value">
              {{size.title}}
            </option>
          </select>
        </div>
        <div class="form-group col-sm-2">
          <select id="sort" class="form-control" v-model="sort">
            <option value="">Sort</option>
            <option v-for="sort in  options.sorts" :value="sort.value" >
              {{sort.title}}
            </option>
          </select>
        </div>
        <button class="btn btn-primary col-sm-2 pull-right" id="clear" type="submit" v-on:click="greet()">X Clear</button>

      </div>
    </div>
    <div class="container">
      <div class="row formcontrol">
        <one-product v-for="product in filteredProducts" :product="product" ></one-product>
      </div>
    </div>

    
  </div>
  
</template>

<script>
import myBackend from '../js/myBackend'
import Product from './ProductPart'
export default {
  name: 'product_list',
  data () {
    return {
      selected: "selected",
      category: '',
      size: '',
      color: '',
      sort: '',
      options: {
        categories: [
          {
            value:'T-shirt',
            title:'T-shirt'
          },
          {
            value:'Pullover',
            title:'Pullover'
          },
          {
            value:'Blazer',
            title:'Blazer'
          },
        ],
        sizes: [
          {
            value:'S',
            title:'S'

          },
          {
            value:'M',
            title:'M'
          },
          {
            value:'L',
            title:'L'
          }
        ],
        colors: [
          {
            value:'black',
            title:'Black color'
          },
          {
            value:'white',
            title:'White color'
          },
          {
            value:'pink',
            title:'Pink color'
          },
          {
            value:'green',
            title:'Green Color'
          },
        ],
        sorts:[
          {
            value:'Up',
            title:'UP'
          },
          {
            value:'DOWN',
            title:'DOWN'
          }
        ]
      },
      dataProducts: myBackend.todo,
    }
  },
  components:{
    'one-product': Product
  },
  methods: {
    greet: function () {
      if(this.category != '')
       {
         this.category = ''
       }
        if(this.size != '')
       {
         this.size = ''
       }
        if(this.color != '')
       {
         this.color = ''
       }
         if(this.sort != '')
       {
         this.sort = ''
       }
    }
  },
  computed: {
    filteredProducts () {
      var self = this
    
      var checkSize = (el) => {
        if (self.size == "") return true
        if (el.size.indexOf(self.size) != -1) return true
        return false
      }
      var checkCategory = (el) => {
        if (self.category == "") return true
        if (el.category == self.category) return true
        return false
      }
      var checkColor = (el) => {
        if (self.color == "") return true
        if (el.color == self.color) return true
        return false
      }

      if(self.sort == 'up') {
        return result.sort(function(a, b){return b.price - a.price})
      }

      var ressultArr = [];
      this.ressultArr = this.dataProducts

      var result = this.dataProducts.filter((el,k) => {
        el.key = k;
      return checkSize(el) && checkCategory(el) && checkColor(el)
      })

      if(self.sort == 'Up') {
        return result.sort(function(a, b){return b.price - a.price})
      }
      else if (self.sort == 'DOWN') {
        return result.sort(function(a, b){return a.price - b.price})
      }
       else {
        return result;
      }
    }
  },
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
