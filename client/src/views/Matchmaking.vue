<template>
    <div>
        <div class="matchmaking">
            <h1>Matchmaking</h1>
        </div>
        <br>
        <div>Loading . . .</div>
    </div>
</template>

<script>
import * as api from '../services/api';

export default {
    name: "Matchmaking",
    mounted() {
        const interval = setInterval(() => {
            api.getMatch(JSON.parse(localStorage.getItem('userID')))
                .then(response => {
                    console.log(response);
                    if (response.data.matchID) {
                        clearInterval(interval);
                        localStorage.setItem('matchID', JSON.stringify(response.data.matchID));
                        this.$router.push('');
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
</style>