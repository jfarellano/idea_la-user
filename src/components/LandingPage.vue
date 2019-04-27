<template>
    <div class="landing">
        <Header></Header>
        <div class="main-container container-fluid">
            <div class="first row">
                <div class="col-md-6 align-self-end">
                    <img src="../assets/FS_FC.svg">
                </div>
                <div class="col-md-6 align-self-end">
                    <div class="left-cont">
                        <img src="../assets/aduana.svg">
                        <p class="parag">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore odit doloremque excepturi aperiam, veniam rerum architecto id, at numquam debitis commodi! Id veritatis laboriosam corporis maiores velit accusamus officia beatae!</p>
                        <div class="over-border">
                            <b-button class="option title">Conoce las ideas</b-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from './Header.vue'
export default {
    components: {
        Header
    }
}
</script>
