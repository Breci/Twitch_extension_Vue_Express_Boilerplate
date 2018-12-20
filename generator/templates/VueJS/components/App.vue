<template>
    <div>
        {{message}}
    </div>
</template>

<script>

    export default {
        name: '%name%',
        data() {
            return {
                message: "Hello world",
                jwt: null,
            }
        },
        methods: {
            init: function (auth) {
                this.jwt = auth;
            }
        },
        mounted() {

            window.Twitch.ext.onAuthorized(function (auth) {
                this.init(auth)
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
