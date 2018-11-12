<template>
  <div>
    <p>Это из компонента: {{ $t('hello') }}</p>
    <p>Это берётся из папки с локалями: {{ $t('message') }}</p>
  </div>
</template>

<script>
export default {
  name: 'HelloI18n',
};
</script>

<i18n>
{
  "ru": {
    "hello": "А вот и i18n в SFC!"
  },
  "en": {
    "hello": "Hello i18n in SFC!"
  }
}
</i18n>
