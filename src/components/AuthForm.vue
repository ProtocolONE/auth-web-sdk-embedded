<template>
  <div class="auth-form">
    <form novalidate @submit.prevent="validateUser">
      <md-field :class="getValidationClass('username')">
        <label>{{ $t('fieldUsernameLabel') }}</label>
        <md-input v-model="username"></md-input>
        <span class="md-error" v-if="!$v.username.required">{{ $t('errorMessageRequired') }}</span>
      </md-field>

      <md-field :class="getValidationClass('password')">
        <label>{{ $t('fieldPasswordLabel') }}</label>
        <md-input type="password" v-model="password"></md-input>
        <span class="md-error" v-if="!$v.password.required">{{ $t('errorMessageRequired') }}</span>
      </md-field>

      <md-card-actions>
        <md-button type="submit" class="md-raised md-primary">
          {{ $t('submitButtonText') }}
        </md-button>
      </md-card-actions>
    </form>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'AuthForm',

  data() {
    return {
      username: '',
      password: '',
    };
  },

  methods: {
    getValidationClass(fieldName) {
      const field = this.$v[fieldName];

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty,
        };
      }

      return '';
    },

    validateUser() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        console.log('success');
      }
    },
  },

  validations: {
    username: {
      required,
    },

    password: {
      required,
    },
  },
};
</script>
<style scoped lang="scss">
.auth-form {
}
</style>

<i18n>
{
  "ru": {
    "fieldUsernameLabel": "Имя пользователя",
    "fieldPasswordLabel": "Пароль",
    "submitButtonText": "Войти"
  },
  "en": {
    "fieldUsernameLabel": "Username",
    "fieldPasswordLabel": "Password",
    "submitButtonText": "Sign in"
  }
}
</i18n>
