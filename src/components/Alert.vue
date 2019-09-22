<template>
  <vue-snotify></vue-snotify>
</template>

<script>
export default {
	data(){
		return{
			params: {
        timeout: 2000,
        showProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true
      },
      params_confirm_account: {
        timeout: false,
        showProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true
      }
		}
	},
  methods: {
    clear: function() {
      this.$snotify.clear();
		},
    error: function(message) {
      this.$snotify.error(message, 'Error', this.params);
		},
		simple: function(title, message) {
      this.$snotify.simple(message, title, this.params);
		},
		success: function(message) {
      this.$snotify.success(message, 'Éxito', this.params);
		},
		warning: function(message) {
      this.$snotify.warning(message, 'Alerta', this.params);
    },
    warning_resend_link: function(title, message, function_accept, function_deny, btn_accept, btn_denied) {
      this.$snotify.warning(message, title, {
        timeout: false,
        showProgressBar: false,
        closeOnClick: false,
				pauseOnHover: false,
				buttons: [
          {text: btn_accept, action: () => function_accept()},
					{text: btn_denied, action: () => function_deny()}
				]
      });
    },
		confirm: function(title, message, accept, deny) {
      this.$snotify.confirm(message, title, {
        timeout: 8000,
        showProgressBar: false,
        closeOnClick: true,
				pauseOnHover: true,
				buttons: [
					{text: 'Aceptar', action: () => accept()},
					{text: 'Cancelar', action: () => deny()}
				]
      });
    },
    network_error: function() {
      this.$snotify.error('Hubo un error en la red, intenta de nuevo', 'Error', this.params)
    },
    credentials_error: function() {
      this.$snotify.warning('Tu usuario o contraseña no coinciden, revisa e intenta de nuevo.', 'Atención', this.params)
    },
    form_error: function() {
      this.$snotify.warning('El formulario no está completo o tiene un error, revisa de nuevo', 'Atención', this.params)
    },
    blocked_user: function() {
      this.$snotify.error('Tu usuario ha sido bloqueado', 'Usuario bloqueado', this.params)
    },
    confirm_account: function() {
      this.$snotify.warning('Inicia sesión para terminar de confirmar tu cuenta.', 'Atención', this.params_confirm_account)
    },
    resend_confirm_email: function() {
      this.$snotify.warning('El enlace ha caducado. Obtén un nuevo enlace para confirmar tu cuenta.', 'Enlace Caducado', this.params_confirm_account)
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
