<template>
	<div :class="[ 'box', type ]">
		<p class="title is-4">{{ title }}</p>
		<p class="subtitle is-6">{{ subtitle }}</p>
		<router-link :class="[ 'button', 'is-fullwidth', type ]" :to="path">
			Start
		</router-link>
	</div>
</template>

<style lang="scss" scoped>
.box {
	&.is-dark { border-top: 3px solid hsl(0, 0%, 21%); }
	&.is-danger { border-top: 3px solid hsl(348, 86%, 61%); }
	&.is-success { border-top: 3px solid hsl(153, 53%,  53%); }
	&.is-link { border-top: 3px solid hsl(229, 53%,  53%); }
}
</style>

<script>
export default {
	props: {
		type: String,
		title: String,
		subtitle: String,
		path: String,
	},
}
</script>
