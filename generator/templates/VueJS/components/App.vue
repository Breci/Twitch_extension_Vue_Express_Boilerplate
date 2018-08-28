<template>
  <div>
    {{message}}
  </div>
</template>

<script>

export default {
  name: '%name%',
  data () {
    return {
        message :"Hello world",
        jwt : null,
        config : null
    }
  },
  methods: {
      init: function (auth,config) {
          this.jwt = auth;
          this.config = config;
      },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
