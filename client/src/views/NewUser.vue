<template>
    <div>
        <input type="text" name="username" v-model="username" placeholder="New Username..."><br><br>
        <button @click="user" class="btn">Go</button>
    </div>
</template>

<script>
import * as api from '../services/api';

export default {
    name: "NewUser",
    data() {
        return {
            username: ''
        }
    },
    methods: {
        user() {
            api.createAccount(this.username)
                .then(response => {
                    localStorage.setItem('userID', JSON.stringify(response.data.uuid));
                    console.log(this.$router);
                    this.$router.push('matchmaking');
                });
        }
    }
}
</script>

<style scoped>
    input[type="text"]{
        height: 30px;
        width: 400px;
        margin-top: 15%;
        padding: 15px;
    }

    .btn {
        width: 100px;
        height: 30px;
        margin: 0 auto;
        padding: 0;
        display: table-cell;
        vertical-align: middle;
        outline-style: auto;
        outline-color: black;
    }
</style>
