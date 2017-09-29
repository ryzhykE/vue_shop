import Vue from 'vue'
import Router from 'vue-router'
import ProductList from '@/components/ProductList'
import ProductSingle from '@/components/ProductSingle'
import ProductCart from '@/components/ProductCart'
import Success from '@/components/Success'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ProductList',
      component: ProductList
    },
    {
      path: '/product/:id',
      name: 'singleProduct',
      component: ProductSingle
    },
    {
      path: '/cart',
      name: 'cartProduct',
      component: ProductCart
    },
    {
      path: '/success',
      name: 'successProdct',
      component: Success
    }
  ]
})
