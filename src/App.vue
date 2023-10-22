<template>
	<section class="hero is-dark">
		<div class="hero-body">
			<div class="container">
				<div class="columns">
					<div class="column">
						<div class="field is-grouped is-grouped-multiline">
							<div class="control">
								<div class="tags has-addons">
									<span class="tag is-success is-rounded has-text-weight-bold">
										{{ user.xp.toLocaleString() }}
									</span>
									<span class="tag is-rounded">XP</span>
								</div>
							</div>

							<div class="control" v-if="Object.keys(user.mistakes).length > 0">
								<div class="tags has-addons">
									<span class="tag is-danger is-rounded has-text-weight-bold">
										{{ Object.keys(user.mistakes).length.toLocaleString() }}
									</span>
									<span class="tag is-rounded">Mistakes</span>
								</div>
							</div>

							<div class="control" v-if="user.seconds > 0">
								<div class="tags has-addons">
									<span class="tag is-info is-rounded has-text-weight-bold">
										{{ time }}
									</span>
									<span class="tag is-rounded">Time</span>
								</div>
							</div>
						</div>
					</div>

					<div class="column has-text-right">
						<p class="title">カナトレーナー</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<RouterView />
</template>

<script>
import user from '@/user';

export default {
	data() {
		return {
			user,
		};
	},

	mounted() {
		this.user.load();
	},

	computed: {
		time() {
			let totalSeconds = this.user.seconds;
			let hours = Math.floor(totalSeconds / 60 / 60);
			let minutes = Math.floor(totalSeconds / 60) % 60;
			let seconds = totalSeconds % 60;
			return hours + 'h ' + minutes + 'm ' + seconds + 's';
		},
	},
}
</script>
