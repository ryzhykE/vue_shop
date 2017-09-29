<template>
  <div class="product_section" >
    <div class="col-md-4 product">
		  <img :src="product.img[0]" alt="">
        <p class="title">
          <router-link :to="{ name: 'singleProduct', params: { id:product.id }}">
            {{product.name}}
          </router-link>
          - <span class="price">{{product.price}} EUR</span>
          </p>
		</div>
  </div>

</template>

<script>
export default {
  name: 'product',
  props: ["product"],
}
</script>

<style scoped>
  .price {
    font-weight: bold;
  }
  img {
    width: 250px;
    height: 300px;
  }
</style>
