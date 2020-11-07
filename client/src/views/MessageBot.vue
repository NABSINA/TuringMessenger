<template>
<div>
    <header class="header">
    <div>
        <div class="message-bot">
            <h1>Message Bot</h1>
        </div>
    </div>
    </header>
    <br>
        <div class="form">
        <input type="text" name="message" v-model="message" placeholder="Enter your message...">
        <button @click="sendMessage" class="btn">Send</button>
    </div>
    </div>
</template>

<script>
import * as api from '../services/api';

export default {
    name: "MessageBot",
    data() {
        return {
            message: '',
            messages: [],
            timeRemaining: '3:00',
        }
    },
    mounted(){
        setInterval(() => {
         api.getMessages(JSON.parse(localStorage.getItem('matchID')))
                .then(response => {
                    console.log(response);
                    this.messages = response.data.messages;
                    this.timeRemaining = response.data.timeRemaining;
        }, 500);
    
     })
    },
    methods: {
        sendMessage() {
            api.postMessage(JSON.parse(localStorage.getItem('matchID')),JSON.parse(localStorage.getItem('userID')), this.message)
                .then(response => {
                    localStorage.setItem('userID', JSON.stringify(response.data.message));
                    console.log(this.$router);
                    this.$router.push('message-bot');
                });
        }
    }
}
</script>

<style scoped>
    .header {
        background: #333;
        color: #fff;
        text-align: center;
        padding: 10px;
    }

    .header a {
        color: #fff;
        padding-right: 5px;
    }
     input[type="text"]{
        padding: 15px;
    }
</style>