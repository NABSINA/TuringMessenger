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
    <div>
        <h2><strong>Messages</strong></h2>
        <br>
            <div class="message" v-for="(message, index) in messages" :key="index">
                <div class="clearfix">
                    <h4 class="message-title">{{message.message}}</h4>
                    <small class="text-muted float-right">@{{message.username}}</small>
                </div>
            </div>
    </div>
    <br>
        <div class="form">
        <input type="text" name="message" v-on:keyup.enter="sendMessage" v-model="message" placeholder="Enter your message...">
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
            usernames: {},
        }
    },
    created(){
        api.getMatch(JSON.parse(localStorage.getItem('userID')))
                .then(response => {
                    response.data.userIDs.forEach(userID => {
                        api.getAccount(userID)
                            .then(resp => {
                                this.usernames[userID] = resp.data.username;
                            });
                    });
                });
        setInterval(() => {
            api.getMessages(JSON.parse(localStorage.getItem('matchID')))
                .then(response => {
                    this.messages = response.data.messages.map(x => {
                        return {
                            message: x.message,
                            username: this.usernames[x.userID],
                        }
                    });
                    this.timeRemaining = response.data.timeRemaining;
        });
     }, 1000)
    },
    methods: {
        sendMessage() {
            api.postMessage(JSON.parse(localStorage.getItem('matchID')),JSON.parse(localStorage.getItem('userID')), this.message)
                .then(() => {
                    console.log(this.$router);
                    this.$router.push('message-bot');
                    this.message = '';
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
    .message-group {
        height: 65vh !important;
        overflow-y: scroll;
    }
    .message {
        border: 1px solid lightblue;
        border-radius: 4px;
        padding: 10px;
        margin-bottom: 15px;
    }
    .message-text {
        color: gray;
        margin-bottom: 0;
    }
</style>