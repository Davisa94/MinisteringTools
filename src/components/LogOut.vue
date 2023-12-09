<template>
    <button @click="handleClickSignOut()">Log Out</button>
</template>

<script>
import { googleLogout } from 'vue3-google-login';

export default {
    name: 'LogOut',
    props: {
        userLoggedIn: {
            type: Boolean,
        }
    },
    methods: {
        async handleClickSignOut() {
            try {
                googleLogout()
                localStorage.removeItem('userData');
            } catch (error) {
                console.error(error);
            }
        }
    },
    data() {
        if (localStorage.getItem('userData') == null) {
            return {
                userLoggedIn: false
            }
        }
        else{
            return {
                userLoggedIn: true
            }
        }
    }
}
</script>