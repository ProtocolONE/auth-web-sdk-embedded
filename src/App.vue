<template>
  <div>
    <center>
      <img alt="Vue logo" src="./assets/logo.png">
    </center>
    <AuthForm/>
  </div>
</template>

<script>
import AuthForm from './components/AuthForm.vue';

export default {
  name: 'Root',
  components: {
    AuthForm,
  },
};
</script>
