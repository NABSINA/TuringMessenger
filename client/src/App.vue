<template>
   <div id="app">
     <Header />
     <NewUser />
        
   </div>
</template>

<script>

import Header from './components/layout/Header';
import NewUser from './components/NewUser';

export default {
  name: 'App',
  components: {
    Header,
    NewUser
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
  body {
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.4;
  }
</style>
