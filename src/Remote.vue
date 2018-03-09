<template>
    <div class="box has-text-centered">
        <h3 class="title">Remote</h3>

        <div class="field">
            <p>Status: {{ status }}</p>
        </div>

        <div v-if="status==''" class="field">
            <button @click="connectProjector()" class="button is-primary">Connect</button>
        </div>

        <div v-if="showStartStop" class="field">
            <button @click="startRandom()" class="button is-primary">Start</button>
            <button @click="stopRandom()" class="button is-danger">Stop</button>
        </div>

        <pre>{{ customer }}</pre>
    </div>
</template>

<script>
import { setupFirebase } from './config/firebase'

export default {
    data() {
        return {
            status: '',
            customer: {}
        }
    },

    methods: {
        connectProjector() {
            this.ref.update({
                status: 'connect'
            })
        },

        startRandom() {
           this.ref.update({
                status: 'start'
            })
        },

        stopRandom() {
           this.ref.update({
                status: 'stop'
            })
        }
    },

    computed: {
        showStartStop() {
            switch (this.status) {
                case 'ready':
                    return true

                case 'start':
                    return true

                default:
                    return false
            }
        }
    },

    mounted() {
        const { qrcode } = this.$route.query

        if (qrcode) {
            const firebaseApp = setupFirebase()

            this.ref = firebaseApp.database().ref('lucky-draw').child(qrcode)

            this.ref.on('value', snapshot => {
                if (snapshot.hasChild('status')) {
                    const { status = '' } = snapshot.val()
                    this.status = status

                    if (status == 'finish') {
                        this.customer = snapshot.val().customer
                    }
                }
            })
        }
    },

    beforeDestroy() {
        this.ref = null
    }
}
</script>

