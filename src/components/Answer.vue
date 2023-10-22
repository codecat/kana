<template>
	<span>{{ text }}</span>
</template>

<script>
export default {
	props: [ 'a' ],

	computed: {
		text() {
			if (Array.isArray(this.a)) {
				let ret = '';
				for (let i = 0; i < this.a.length; i++) {
					if (i > 0) {
						ret += ', ';
					}
					ret += this.a[i];
				}
				return ret;
			}
			return this.a;
		},
	},
}
</script>
