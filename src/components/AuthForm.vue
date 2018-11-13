<template>
  <div class="auth-form">
    <LocaleChanger/>
    <h1>ProtocolONE Auth Form</h1>
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
@import '../assets/styles/gui.scss';

.auth-form {
  font-family: $ui-font-family-common;
  color: $ui-color-grey13;
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.3);
  background: $ui-color-white;
  padding: 20px;
  width: 500px;
  margin: 15px auto 0;
}
</style>
