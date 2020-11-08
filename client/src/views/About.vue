<template>
    <div>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
        <div class="header">
            <h1>About</h1>
            <button @click="goHome" style="position:absolute; top:5px; right: 5px; color:white;background:rgba(0,0,0,0)">
                Home
            </button>
        </div>
        <div style="text-align:left;" class="container">
            <h1>Turing Messenger</h1>
            <h2>Authors</h2>
            <p>Angad Singh, Brian Roden, Nathan Gawith, Samuel Lim</p>
            <h2>Idea</h2>
            <p>When brain storming, we discussed several ideas, including AI games and possible variations on messaging platforms. We ended up combining these two ideas and going with this project, titled "Turing Messenger". "Turing Messenger" is directly inspired from the concept of the Turing Test where AI and human recognition are put to the test. In this web app, you start by entering a username, and then you land on a screen where you are matched with another player, who may be a person trying to decieve you or simply an AI. When you are matched up, you and your partner have 3 minutes to try and guess if the other player is a human or AI, or successfully decieve the other and win. This adds a gamification element to a classic thought experiment in CS education from Alan Turing.</p>
            <h2>Client</h2>
            <p>The client is written in vuejs, and is the presentation layer. The client communicates with the server to get and store messages, users, etc.</p>
            <h2>Server</h2>
            <p>The server is written in TS express, and hold all of the data that the client enters. The server is responsible for matching clients up with other clients, or matching up a client with the AI.</p>
            <h2>AI</h2>
            <p>AI is a transfer learning network implementation based on GPT-2 and different variations of conv AIs.</p>
            <p>The AI is built in python and communicates with the server via a simple flask app.</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'About',
    methods: {
        goHome() {
            window.location.hash = '#/';
        },
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

</style>
