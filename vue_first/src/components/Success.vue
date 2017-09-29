<template>
        <div class="col-md-offset-4 col-md-4">
            <h2>Thank you</h2>
            <router-link to='/'><span>Main Page</span></router-link>
            <ul v-for="prod in products" class="list-group">
                <li class="list-group-item">
                    <p>Product: {{ prod.name }}</p>
                </li>
                <li class="list-group-item">
                    <p> size: {{prod.size}}</p>
                </li>
                <li class="list-group-item">
                    <p> color: {{ prod.color }}</p>
                </li>
                <li class="list-group-item">
                    <p> price: {{prod.price}} EUR</p>
                </li>
                <li class="list-group-item">
                    <p> count:  {{ prod.count }}</p>
                </li>
            </ul>
            <p>Total price: {{ total }} EUR</p>
        </div>
</template>

<script>
    export default {
        name: 'SuccessPage',
        data() {
            return {
                total: JSON.parse(localStorage['total']),
                products: JSON.parse(localStorage['order']),
            }
        },
        created(){
            this.clearCart()
        },
        methods: {
            clearCart: function(){
                window.localStorage.clear();
            },
        }
    }
</script>

<style scoped>
    li{
        height: 30px;
    }
</style>
