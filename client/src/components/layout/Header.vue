<template>
    <header class="header">
        <h1>Turing Test Messenger</h1>
        <button @click="goAbout" style="position:absolute; top:5px; right: 5px; color:white;background:rgba(0,0,0,0)">
            About
        </button>
    </header>
</template>

<script>
export default {
    name: 'Header',
    methods: {
        goAbout() {
            window.location.hash = '#/about';
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

    .header a {
        color: #fff;
        padding-right: 5px;
    }
</style>