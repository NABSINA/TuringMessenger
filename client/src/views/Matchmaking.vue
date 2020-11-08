<template>
    <div>
        <div class="matchmaking">
            <h1>Matchmaking</h1>
        </div>
        <br>
        <div class="search"><h1>Searching For Opponent . . .</h1></div><br><br><br><br>
        <div v-if="isFooling === true"><p class="role">You are an <strong>imposter</strong></p></div>
        <div v-if="isFooling === false"><p class="role">You are a <strong>guesser</strong></p></div>
    </div>
</template>

<script>
import * as api from '../services/api';

export default {
    name: "Matchmaking",
    data() {
        return {
            isFooling: undefined
        }
    },

    mounted() {
        const interval = setInterval(() => {
            api.getMatch(JSON.parse(localStorage.getItem('userID')))
                .then(response => {
                    console.log(response);
                    if (response.data.matchID) {
                        api.getAccount(JSON.parse(localStorage.getItem('userID')))
                            .then(account => {
                                this.isFooling = account.data.isFooling;
                                setTimeout(() => {
                                    clearInterval(interval);
                                    localStorage.setItem('matchID', JSON.stringify(response.data.matchID));
                                    this.$router.push('message-bot');
                                }, 3000);
                            })
                    }
                });
        }, 500);
        console.log(interval);
    }
}
</script>

<style scoped>
    .matchmaking {
        background: #333;
        color: #fff;
        text-align: center;
        padding: 10px;
    }

    .search {
        font-size: 15px;
    }

    .role {
        font-size: 35px;
    }
</style>