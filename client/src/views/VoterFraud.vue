<template>
  <div v-if="!has_chosen">
    <h1 class="header">Vote!</h1>
    <br>
    <button @click="choose('human')">Human</button>
    <br><br>
    <button @click="choose('machine')">Machine</button>
    <br><br>
    <button v-if="!times_up" @click="retvrn">Cancel</button>
  </div>
  <div v-else-if="completed" style="margin-top:50px;">
    <h1 v-if="won">You won!</h1>
    <h1 v-else>You lost!</h1>
    <button @click="goHome">Play again</button>
  </div>
  <div v-else>
    <h1>
      Are you sure you would like to choose <strong>{{ choice }}</strong
      >?
    </h1>
    <br>
    <button @click="conform">Yes</button>
    <br><br>
    <button @click="reset">No</button>
  </div>
</template>

<script>
import * as api from "../services/api";

export default {
  name: "VoterFrog",
  data() {
    return {
      times_up: true,
      choice: "",
      has_chosen: false,
      completed: false,
      won: undefined,
    };
  },
  mounted() {
    api.getMessages(JSON.parse(localStorage.getItem('matchID'))).then(resp => {
        if (!(resp.data.timeRemaining && resp.data.timeRemaining.includes('-'))) {
          this.times_up = false;
        }
    });
  },
  methods: {
    goHome() {
      window.location.hash = '#/';
    },
    choose(value) {
      this.choice = value;
      this.has_chosen = true;
    },
    reset() {
      this.choice = "";
      this.has_chosen = false;
    },
    retvrn() {
      this.reset();
      this.$router.push("message-bot");
    },
    conform() {
      if (!this.choice) return this.reset();
      api
        .postVote({
          vote: !!["human", "machine"].indexOf(this.choice),
        })
        .then(() =>
          api
            .getVote()
            .then((res) => res.data)
            .then(Object.values)
            .then((vs) => vs[0])
            .then((final) => {
              this.won = final.valid;
              this.completed = true;
            })
            .catch(console.err)
        );
    },
  },
};
</script>

<style scoped>

.header {
    background: #333;
    color: #fff;
    text-align: center;
    padding: 10px;
}

button {
    display: inline-block;
    border: none;
    background: #555;
    color: #fff;
    /* padding: 20px 40px; */
    cursor: pointer;
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
