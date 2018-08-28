<template>
  <div>
    {{message}}
  </div>
</template>

<script>

export default {
  ref: 'test',
  name: 'Panel',
  data () {
    return {
        message :"Hello world",
        jwt : null,
        config : null,
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
    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 20px;
    }

    a {
        color: #42b983;
    }
</style>
