<template>
    <div>
    <header class="header">
    <div>
        <div class="message-bot">
            <span style="float:left;">{{timeRemaining}}</span>
            <h1>Message Bot</h1>
            <span style="position:absolute; top:4px; right: 4px;">
                <router-link to="voterfraud">
                    Vote
                </router-link>
            </span>
        </div>
    </div>
    </header>
    <br>
    <div>
        <h2><strong>Messages</strong></h2>
        <br>
            <div id="" class="scroll-view" style="overflow:scroll; height:400px;">
                <div class="message" v-for="(message, index) in messages" :key="index">
                    <div v-if="message.userID ===currentUserID" class="box1 user1">
                        <h4 class="message-title">{{message.message}}</h4>
                        <small class="text-muted float-right">@{{message.username}}</small>
                    </div>    
                    <div v-else class="box2 user2">
                        <h4 class="message-title">{{message.message}}</h4>
                        <small class="text-muted float-right">@{{message.username}}</small>
                    </div>    
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
            timeRemaining: '',
            usernames: {},
            currentUserID: '',
        }
    },
    created(){
        this.currentUserID = JSON.parse(localStorage.getItem('userID'));
        api.getMatch(this.currentUserID)
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
                            userID: x.userID,
                            username: this.usernames[x.userID],
                        }
                    });
            this.timeRemaining = response.data.timeRemaining;
            if (this.timeRemaining && this.timeRemaining.includes('-')) {
                this.$router.push('voterfraud');
            }
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

    .box1 {
        width: 300px;
        margin: 5px auto;
        border-radius: 15px;
        background: #07447c;
        color: #fff;
        padding: 20px;
        text-align: center;
        font-weight: 900;
        font-family: arial;
        position: relative;
        }
    
    .box2 {
        width: 300px;
        margin: 5px auto;
        border-radius: 15px;
        background: #a4acab;
        color: #fff;
        padding: 20px;
        text-align: center;
        font-weight: 900;
        font-family: arial;
        position: relative;
        }

    .user1:before {
        content: "";
        width: 0px;
        height: 0px;
        position: absolute;
        border-left: 15px solid #07447c;
        border-right: 15px solid transparent;
        border-top: 15px solid #07447c;
        border-bottom: 15px solid transparent;
        right: -16px;
        top: 0px;
        }

    .user2:before {
        content: "";
        width: 0px;
        height: 0px;
        position: absolute;
        border-left: 15px solid transparent;
        border-right: 15px solid #a4acab;
        border-top: 15px solid #a4acab;
        border-bottom: 15px solid transparent;
        left: -16px;
        top: 0px;
        }

    .scroll-view{
        padding-left: 5px;
    }
    
    input[type="text"]{
        height: 45px;
        width: 300px;
        padding: 15px;
    }

    .btn {
        padding: 15px;
        outline-style: auto;
        outline-color: black;
    }
</style>