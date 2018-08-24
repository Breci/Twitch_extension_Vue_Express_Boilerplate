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
    }
  },
  methods: {
      init: function (auth) {
          this.jwt = auth;
      },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
