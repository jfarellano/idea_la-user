<template>
    <div class="createIdeaComponent">
        <b-button class="add-button title" v-on:click.prevent="createIdea">Agrega nueva idea</b-button>
    </div> 
</template>

<script>
export default {
    data(){
        return{
            
        }
    },
    methods: {
        createIdea(){
            this.$router.push('/creareditaridea');
        }
    }
}
</script>