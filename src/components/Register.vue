<template>
  <div class="registerComponent">
    <div id="divStyle" class="container-fluid">
      <div id="rowStyle" class="row align-items-center">
        <div class="col align-self-center">
            <router-link to="/">
                <img src="../assets/CS_BC.svg" alt="" height="110px" class="iconImage">
            </router-link>
            <div class="fieldsContainer" data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="10">
                <div class="row justify-content-center">
                    <h2 class="title">Registro</h2>
                </div>
                <hr>

                <div class="row align-items-center">
                    <div class="col">        
                        <h5 class="title">Correo electrónico</h5>
                        <div class="input-group">
                            <input type="email" class="form-control inputStyles" placeholder="ej. example@email.com" v-model="userData.email">
                        </div>
                        <div class="divSeparator"></div>
                        <h5 class="title">Contraseña</h5>
                        <div class="input-group">
                            <input type="password" class="form-control inputStyles" placeholder="********" v-model="userData.password">
                        </div>
                    </div>
                    <div class="col-sm-1">
                        <div class="lineDivider"></div>
                    </div>
                    <div class="col-sm">
                        <h5 class="title">Nombre</h5>
                        <div class="input-group">
                            <input type="text" class="form-control inputStyles" placeholder="ej. Juan" v-model="userData.name">
                        </div>
                        <div class="divSeparator"></div>
                        <h5 class="title">Apellido</h5>
                        <div class="input-group">
                            <input type="text" class="form-control inputStyles" placeholder="ej. Perez" v-model="userData.lastname">
                        </div>
                        <div class="divSeparator"></div>
                        <h5 class="title">Cédula</h5>
                        <div class="input-group">
                            <input type="text" class="form-control inputStyles" placeholder="ej. 1234567890" v-model="userData.cc">
                        </div>
                        <div class="divSeparator"></div>
                        <h5 class="title">Edad</h5>
                        <div class="input-group">
                            <input type="text" class="form-control inputStyles" placeholder="ej. 20" v-model="userData.age">
                        </div>
                    </div>
                    <div class="col-sm">
                        <h5 class="title">Género</h5>
                        <b-form-select
                            class="mb-2 mr-sm-2 mb-sm-0 squareInput"
                            :value="null"
                            :options="{ 'male': 'Masculino', 'female': 'Femenino'}"
                            id="inline-form-custom-select-pref"
                             v-model="userData.gender"
                            >
                            <option slot="first" :value="null"></option>
                        </b-form-select>
                        <div class="divSeparator"></div>
                        <h5 class="title">Télefono</h5>
                        <div class="input-group">
                            <input type="text" class="form-control inputStyles" placeholder="ej. 300-123 4567"  v-model="userData.phone">
                        </div>
                        <div class="divSeparator"></div>
                        <h5 class="title">Barrio</h5>

                        <select class="form-control" id="pickerStyle" @change="switchView($event)" v-model="indexChosedHood">
                            <option v-for="(location, index) in locations" v-bind:value="location.id" :key="index"> {{ location.name }} </option>
                        </select>
                        <div class="divSeparator"></div>
                        <h5 class="title">Localidad</h5>
                        <div class="input-group">
                            <input type="text" class="form-control inputStyles" disabled v-model="locationAuto">
                        </div>

                    </div>
                </div>

                <div class="divSeparator"></div>
                <div class="divSeparator"></div>
                <div class="row justify-content-center">
                    <p class="parag" id="registerStyle">¿Ya tienes una cuenta? <router-link to="/login">Ingresa aquí.</router-link></p>
                </div>
                <div class="row justify-content-center">
                    <b-button type="button" class="btn btn-primary btn-lg btn-block" id="btnRegisterStyle" v-on:click.prevent="registerCheckFormData()">Registrar</b-button>
                </div>
                
            </div>
        </div>
      </div>
    </div>

    <!-- MODAL -->
    <b-modal id="modal-scrollable" centered title="Priorización de Retos" cancel-variant="ok" cancel-title="" class="modalStyle" ok-disabled>
        <p class="parag">Por favor priorice según su criterio los siguientes retos de mayor a menor relevancia.</p>
        <ol>
            <div v-for="(challenge, index3) in challenges" :key="index3">
                    <li class="dropdownItemStyle">
                        <div class="form-group">
                            <!--  -->
                            <!-- <select class="form-control" id="pickerStyle" @change="switchView($event)" v-model="indexChosedHood">
                                <option v-for="(location, index) in locations" v-bind:value="location.id" :key="index"> {{ location.name }} </option>
                            </select> -->
                            <!--  -->
                            <select class="form-control" id="pickerStyle" v-model="surveyResult[index3]">
                                <option v-for="(challengeItem, index2) in challenges" :key="index2" v-bind:value="challengeItem.id"> {{ challengeItem.title }} </option>
                            </select>
                        </div> 
                    </li>
            </div>
        </ol>
        <div class="row justify-content-center">
            <b-button type="button" class="btn btn-primary btn-mg btn-block" id="btnRegisterStyle" v-on:click.prevent="sendForm()">Aceptar</b-button>
        </div>
    </b-modal>

    <b-modal id="modalPopover" title="Error" ok-only>
        <p class="parag">Por favor asegúrese de llenar todos los campos con su información.</p>
    </b-modal>
  </div>
</template>

<script>
import {SERVER_URL} from '../variables.js'

export default {
    data(){
        return{
            challenges:[],
            challengesCopy: [],
            pickedChal: '',
            userData: {
                email: '',
                password: '',
                cc: '',
                phone: '',
                name: '',
                lastname: '',
                age: '',
                gender: '',
                picture: '',
                location_id: ''
            },
            locations: [],
            chosedHood: '',
            indexChosedHood: '',
            locationAuto: '',
            indexChosedChallenge: '',
            surveyResult: []
        }
    },
    methods: {
        registerCheckFormData(){
            var emailField = this.userData.email;
            var passwordField = this.userData.password;
            var ccField =  this.userData.cc;
            var phoneField = this.userData.phone;
            var nameField =  this.userData.name;
            var lastnameField =  this.userData.lastname;
            var ageField = this.userData.age;
            var genderField =  this.userData.gender;

            if (emailField == '' || passwordField == '' || ccField == '' || 
            phoneField == '' || nameField == '' || lastnameField == '' || 
            ageField == '' || genderField== '' ){
                this.$bvModal.show("modalPopover");
            } else {
                this.$http.get(SERVER_URL + '/challenges').then(function(response){
                    this.challenges = response.data;
                })
                this.userRegister();
                setTimeout(() => this.$bvModal.show("modal-scrollable"), 500);
                // console.log(JSON.stringify(this.userData))
            }
        },
        userRegister(){
            this.$http.post(SERVER_URL + '/users',{
                email: this.userData.email,
                password: this.userData.password,
                cc: this.userData.cc,
                phone: this.userData.phone,
                name: this.userData.name,
                lastname: this.userData.lastname,
                age: this.userData.age,
                gender: this.userData.gender,
                picture: this.userData.picture,
                location_id: this.indexChosedHood
            }).then(response => response.json())
            .then(function(json){
                console.log(json)
            },
            (err) => {
            console.log("Err", err);
            }
            );
            setTimeout(() => this.$router.push('/login'), 500);
        },
        getLocations(){
            this.$http.get(SERVER_URL + '/locations').then(function(response){
            this.locations = response.data;
        })
        },
        switchView(event){
            var i = this.indexChosedHood
            this.userData.location_id = this.indexChosedHood
            this.locationAuto = this.locations[i].hood
            // console.log('indexChosedHood', this.indexChosedHood)
        },
        onChangeChallenge(event){
            console.log(JSON.stringify(event.target))
            // console.log(this.indexChosedChallenge)
        },
        sendForm(){
            this.$http.post(SERVER_URL + '/surveys',{
                array: this.surveyResult
            }).then(response => response.json())
            .then(function(json){
            if (json.id != "0"){
                //   console.log("Usuario creado con exito");
            }
            },
            (err) => {
            console.log("Err", err);
            }
            );
        }
    },
    created(){
        this.getLocations();
    }
};
</script>