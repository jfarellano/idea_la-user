<template>
    <div class="createIdeaComponent">
        <b-button class="add-button title" v-on:click.prevent="createIdea">Agrega nueva idea</b-button>
    </div> 
</template>

<script>
export default {
    data(){
        return{
            tokenExists: false,
            userInfo: {
                id:'',
                secret:'',
                expire_at:'',
                name:'',
                lastname:'',
                fullname:''
            }
        }
    },
    methods: {
        createIdea(){
            this.checkToken();
            if (this.tokenExists == false) {
                this.$router.push('/login');
            } else {
                this.$router.push('/creareditaridea');
            }
        },
        checkToken(){
            if (this.$cookie.get('secret') == null){
                this.tokenExists = false;
            }else{
                this.tokenExists = true;
                console.log("COOKIE: " + this.$cookie.get('secret'));
                var userInfo = JSON.parse(this.$cookie.get('secret'));
                this.userInfo.id = userInfo.user_id;
                this.userInfo.secret = userInfo.secret;
                this.userInfo.expire_at = userInfo.expire_at;
                this.userInfo.name = userInfo.name;
                this.userInfo.lastname = userInfo.lastname;
            }
        },
    },
    created(){
        
    }
}
</script>