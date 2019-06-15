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
      }
		}
	},
  methods: {
    error: function(title, message) {
      this.$snotify.error(message, title, this.params);
		},
		simple: function(title, message) {
      this.$snotify.simple(message, title, this.params);
		},
		success: function(title, message) {
      this.$snotify.success(message, title, this.params);
		},
		warning: function(title, message) {
      this.$snotify.warning(message, title, this.params);
		},
		confirm: function(title, message, accept, deny) {
      this.$snotify.confirm(message, title, {
        timeout: 2000,
        showProgressBar: false,
        closeOnClick: true,
				pauseOnHover: true,
				buttons: [
					{text: 'Aceptar', action: () => accept()},
					{text: 'Cancelar', action: () => deny()}
				]
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
