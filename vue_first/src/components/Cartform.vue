<template>
    <div class="row">
            <div class="col-md-12 right_sidebar">
                <div class="form">
                    <h4>Your Details</h4>
                    <form @submit.prevent="validForm">
                        <p><input v-model="firstName" type="text" name="firstName" placeholder="First name"></p>
                        <p><input v-model="lastName" type="text" name="lastName" placeholder="Last name"></p>
                        <p><input v-model="email" type="text" name="email" placeholder="Email"></p>
                        <button type="submit">Complete purchase</button>
                    </form>
                    <ul class="errors">
                        <li  v-show="!validation.firstName">First name cannot be empty</li>
                        <li v-show="!validation.lastName">Last name cannot be empty</li>
                        <li v-show="!validation.email">Email cannot be empty</li>
                    </ul>
                </div>
            </div>

    </div>


</template>

<script>
    var emailREG = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    export default {
        name: 'Cartform',
        data() {
            return {
                firstName: '',
                lastName: '',
                email: '',
            }
        },
        methods: {
            validForm: function() {
                if (this.isValid) {
                    window.location.href = '#/success';
                }
            }
        },
        computed: {
            validation: function () {
                return {
                    firstName: this.firstName.trim(),
                    lastName: !!this.lastName.trim(),
                    email: emailREG.test(this.email)
                }
            },
            isValid: function () {
                var validation = this.validation
                return Object.keys(validation).every(function (key) {
                    console.log(validation[key]);
                    return validation[key]

                })
            }

        }
    }

</script>

<style scoped>
    .voucher_block {
        padding-bottom: 20px;
        border-bottom: 1px solid #000;
    }

    .voucher_block input {
        width: 100%;
    }

    .center {
        text-align: center;
    }

    .form button {
        background: #222;
        width: 100%;
        color: #fff;
        border: none;
        padding: 10px;
    }
    .total {
        padding-top:20px;
        padding-bottom: 20px;
        border-bottom: 1px solid #000;
    }

    .errors li {
        color: red;
    }

    .list-group-item {
        border-color: #222;
    }

    input {
        border: 1px solid #222;
        padding:5px;
        width: 100%;
    }

</style>