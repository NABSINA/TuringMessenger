<template>
    <div class="form">
        <input type="text" name="username" v-model="username" placeholder="New Username...">
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
    .form {
        display: flex;
    }

    input[type="text"]{
        flex: 15;
        padding: 15px;
    }

    button {
        flex: 2;
    }
</style>
