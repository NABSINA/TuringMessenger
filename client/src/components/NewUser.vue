<template>
    <div>
        <form>
            <input type="text" name="username" placeholder="New Username...">
            <input type="submit" value="Go" class="btn">
        </form>
    </div>
</template>

<script>
export default {
    name: "NewUser"
}
</script>

<style scoped>
    form {
        display: flex;
    }

    input[type="text"]{

        flex: 10;
        padding: 15px;
    }

    input[type="submit"]{
        flex: 2;
    }
</style>