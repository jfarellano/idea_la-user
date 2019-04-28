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
                            <input type="email" class="form-control inputStyles" placeholder="ej. example@email.com">
                        </div>
                        <div class="divSeparator"></div>
                        <h5 class="title">Contraseña</h5>
                        <div class="input-group">
                            <input type="password" class="form-control inputStyles" placeholder="********">
                        </div>
                    </div>
                    <div class="col-sm-1">
                        <div class="lineDivider"></div>
                    </div>
                    <div class="col-sm">
                        <h5 class="title">Nombre</h5>
                        <div class="input-group">
                            <input type="text" class="form-control inputStyles" placeholder="ej. Juan">
                        </div>
                        <div class="divSeparator"></div>
                        <h5 class="title">Apellido</h5>
                        <div class="input-group">
                            <input type="text" class="form-control inputStyles" placeholder="ej. Perez">
                        </div>
                        <div class="divSeparator"></div>
                        <h5 class="title">Cédula</h5>
                        <div class="input-group">
                            <input type="text" class="form-control inputStyles" placeholder="ej. 1234567890">
                        </div>
                        <div class="divSeparator"></div>
                        <h5 class="title">Edad</h5>
                        <div class="input-group">
                            <input type="text" class="form-control inputStyles" placeholder="ej. 20">
                        </div>
                    </div>
                    <div class="col-sm">
                        <h5 class="title">Género</h5>
                        <div class="input-group">
                            <input type="text" class="form-control inputStyles" placeholder="Masculino/Femenino">
                        </div>
                        <div class="divSeparator"></div>
                        <h5 class="title">Télefono</h5>
                        <div class="input-group">
                            <input type="text" class="form-control inputStyles" placeholder="ej. 300-123 4567">
                        </div>
                        <div class="divSeparator"></div>
                        <h5 class="title">Barrio</h5>
                        <div class="input-group">
                            <input type="text" class="form-control inputStyles" placeholder="ej. El Bosque">
                        </div>
                        <div class="divSeparator"></div>
                        <h5 class="title">Localidad</h5>
                        <div class="input-group">
                            <input type="text" class="form-control inputStyles" disabled>
                        </div>

                    </div>
                </div>

                <div class="divSeparator"></div>
                <div class="divSeparator"></div>
                <div class="row justify-content-center">
                    <p class="parag" id="registerStyle">¿Ya tienes una cuenta? <router-link to="/login">Ingresa aquí.</router-link></p>
                </div>
                <div class="row justify-content-center">
                    <b-button type="button" class="btn btn-primary btn-lg btn-block" id="btnRegisterStyle" v-b-modal.modal-scrollable>Registrar</b-button>
                </div>
                
            </div>
        </div>
      </div>
    </div>

    <!-- MODAL -->
    <b-modal id="modal-scrollable" centered title="Priorización de Retos" cancel-variant="ok" cancel-title="" class="modalStyle">
        <p class="parag">Por favor priorice según su criterio los siguientes retos de mayor a menor relevancia.</p>
        <ol>
            <div v-for="(challenge, index) in challenges" :key="index">
                    <li class="dropdownItemStyle">
                        <div class="form-group">
                            <select class="form-control" id="pickerStyle" @change="onChange($event)">
                                <option v-for="(challenge2, index2) in challengesCopy" :key="index2"> {{ challenge2.title }} </option>
                            </select>
                        </div> 
                    </li>
            </div>
        </ol>
        <div class="row justify-content-center">
            <b-button type="button" class="btn btn-primary btn-mg btn-block" id="btnRegisterStyle" v-on:click.prevent="sendForm(sendForm)">Aceptar</b-button>
        </div>
    </b-modal>
  </div>
</template>

<script>
export default {
    data(){
        return{
            challenges: [
                {
                    id: '1',
                    title: 'Seguridad'
                },
                {
                    id: '2',
                    title: 'Medio Ambiente'
                },
                {
                    id: '3',
                    title: 'Entretenimiento'
                },
                {
                    id: '4',
                    title: 'Movilidad'
                },
                {
                    id: '5',
                    title: 'Justicia'
                }
            ],
            challengesCopy: [],
            pickedChal: ''
        }
    },
    methods: {
        onChange(event){
            console.log(event.target.value)
            console.log(this.challengesCopy.indexOf(event.target.value))
        },
        sendForm(){
            console.log('SEND FORM')
        }
    },
    created(){
        this.challengesCopy = this.challenges;
    }
};
</script>