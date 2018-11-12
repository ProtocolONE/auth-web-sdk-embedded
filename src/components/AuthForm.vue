<template>
  <div class="auth-form">
    <LocaleChanger/>
    <h1>ProtocolONE Auth Form</h1>
    <p>Авторизируйтесь, граждане!</p>
    <HelloI18n/>
  </div>
</template>

<script>
import HelloI18n from './HelloI18n.vue';
import LocaleChanger from './LocaleChanger.vue';

export default {
  name: 'AuthForm',

  components: {
    HelloI18n,
    LocaleChanger,
  },
};
</script>

<style scoped lang="scss">
.auth-form {
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.3);
  background: #fff;
  padding: 20px;
  width: 500px;
  margin: 30px auto 0;
}
</style>
