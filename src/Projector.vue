<template>
    <div class="box has-text-centered">
        <h3 class="title">Projector</h3>

        <div class="field">
            <p>Status: {{ status }}</p>
        </div>

        <div v-if="status==''" class="field">
            <img :src="qrDataUri">
            <pre>{{ qrLink }}</pre>
        </div>

        <div class="field">
            <pre>{{ customers[luckyNumber] }}</pre>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import randomString from 'crypto-random-string'
import qrcode from 'qrcode'
import { setupFirebase } from './config/firebase'

export default {
    data() {
        return {
            status: '',
            qrCode: '',
            qrDataUri: '',
            luckyNumber: -1,
            customers: []
        }
    },

    computed: {
        qrLink() {
            return (this.qrCode) ? `http://localhost:8080/#/remote?qrcode=${ this.qrCode }` : ''
        }
    },

    methods: {
        getCustomers() {
            axios.get('http://localhost:3000/customers')
                .then(res => {
                    this.customers = res.data

                    this.ref.update({
                        status: 'ready'
                    })
                })
        },

        startRandom() {
            this.interval = setInterval(() => {
                this.luckyNumber = Math.floor(Math.random() * this.customers.length)
            }, 100)
        },

        stopRandom() {
            clearInterval(this.interval)

            if (this.luckNumber != -1) {
                this.ref.update({
                    customer: this.customers[this.luckyNumber],
                    status: 'finish'
                })
            }
        }
    },

    created() {
        this.qrCode = randomString(15)

        qrcode.toDataURL(this.qrLink, (err, url) => {
            this.qrDataUri = url
        })
    },

    mounted() {
        const firebaseApp = setupFirebase()

        this.ref = firebaseApp.database().ref('lucky-draw').child(this.qrCode)

        this.ref.on('value', snapshot => {
            if (snapshot.hasChild('status')) {
                const { status = '' } = snapshot.val()
                this.status = status

                if (status == 'connect') {
                    this.getCustomers()
                }

                if (status == 'start') {
                    this.startRandom()
                }

                if (status == 'stop') {
                    this.stopRandom()
                }
            }
        })
    },

    beforeDestroy() {
        this.ref = null
    }
}
</script>

