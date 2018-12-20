<template>
    <div>
        {{message}}
    </div>
</template>

<script>

    export default {
        name: 'panel',
        data() {
            return {
                message: "Hello world",
                jwt: null,
                config: null
            }
        },
        methods: {
            init: function (auth, config) {
                this.jwt = auth;
                this.config = config;
            }
        },
        mounted() {

            window.Twitch.ext.onAuthorized(function (auth) {
                this.init(auth, CONFIG)
            }.bind(this));

            window.Twitch.ext.onContext(function (context, contextFields) {
                //for context
            });

            window.Twitch.ext.configuration.onChanged(function () {
                //handle configuration
            });
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
