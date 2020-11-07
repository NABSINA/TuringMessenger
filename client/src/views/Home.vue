<template>
   <div id="app">
     <Header />
     <NewUser />
        
   </div>
</template>

<script>

import Header from '../components/layout/Header';
import NewUser from './NewUser';

export default {
  name: 'Home',
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
