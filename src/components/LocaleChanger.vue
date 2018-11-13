<template>
  <div class="locale-changer">
    <md-field>
      <md-select v-model="$i18n.locale">
        <md-option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">{{ lang }}</md-option>
      </md-select>
    </md-field>
  </div>
</template>

<script>
export default {
  name: 'locale-changer',
  data() {
    return {
      langs: ['ru', 'en'],
    };
  },
};
</script>
