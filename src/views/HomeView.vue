<template>
	<section class="section">
		<div class="container">
			<div class="block">
				<p class="title">カナトレーナー</p>
				<p>Welcome to Kana Trainer!</p>
			</div>

			<div class="columns is-multiline is-centered">
				<div class="column is-4" v-for="game in games">
					<StartButton
						v-if="game.if === undefined || game.if()"
						:type="game.type"
						:title="game.title"
						:subtitle="game.subtitle"
						:path="game.path" />
				</div>
			</div>
		</div>
	</section>

	<footer class="footer has-text-centered">
		<p>Made with <span class="icon has-text-danger"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg></span> by <a href="https://meow.social/@codecat" target="blank" rel="noopener">メリッサ</a></p>
		<p>This website is open source <a href="https://github.com/codecat/kanatrainer" target="blank" rel="noopener">on Github</a>. All data stored locally.</p>
	</footer>
</template>

<script>
import user from '@/user';

import StartButton from '@/components/StartButton.vue';

export default {
	components: {
		StartButton,
	},

	data() {
		return {
			user,
			games: [
				//////////////////////////////////////////////
				// Combined
				{
					type: 'is-dark',
					title: 'Hiragana & Katakana',
					subtitle: 'Hiragana and katakana combined',
					path: '/game/combined',
				},

				//////////////////////////////////////////////
				// Hiragana
				{
					type: 'is-success',
					title: 'Hiragana',
					subtitle: 'All hiragana',
					path: '/game/hiragana',
				},
				{
					type: 'is-success',
					title: 'Base hiragana',
					subtitle: 'Base characters only',
					path: '/game/hiragana/base',
				},
				{
					type: 'is-success',
					title: 'Hiragana dakuten',
					subtitle: 'Base characters with dakuten only',
					path: '/game/hiragana/dakuten',
				},
				{
					type: 'is-success',
					title: 'Hiragana yōon',
					subtitle: 'Base characters with combination characters only',
					path: '/game/hiragana/yoon',
				},

				//////////////////////////////////////////////
				// Katakana
				{
					type: 'is-link',
					title: 'Katakana',
					subtitle: 'All katakana',
					path: '/game/katakana',
				},
				{
					type: 'is-link',
					title: 'Base katakana',
					subtitle: 'Base characters only',
					path: '/game/katakana/base',
				},
				{
					type: 'is-link',
					title: 'Katakana dakuten',
					subtitle: 'Base characters with dakuten only',
					path: '/game/katakana/dakuten',
				},
				{
					type: 'is-link',
					title: 'Katakana yōon',
					subtitle: 'Base characters with combination characters only',
					path: '/game/katakana/dakuten',
				},

				//////////////////////////////////////////////
				// Numbers
				{
					type: 'is-warning',
					title: 'Numbers: basic',
					subtitle: '0 through 10 in kanji',
					path: '/game/numbers/1',
				},

				{
					type: 'is-warning',
					title: 'Numbers: hundreds',
					subtitle: '10 through 100 in kanji',
					path: '/game/numbers/2',
				},

				{
					type: 'is-warning',
					title: 'Numbers: thousands',
					subtitle: '100 through 1,000 in kanji',
					path: '/game/numbers/3',
				},

				{
					type: 'is-warning',
					title: 'Numbers: high thousands',
					subtitle: '1,000 through 10,000 in kanji',
					path: '/game/numbers/4',
				},

				{
					type: 'is-warning',
					title: 'Numbers: sky high',
					subtitle: '100,000 through 1,000,000 in kanji',
					path: '/game/numbers/5',
				},

				//////////////////////////////////////////////
				// Mistakes
				{
					type: 'is-danger',
					title: 'Mistakes',
					subtitle: 'Mistakes you\'ve made',
					path: '/game/mistakes',
					if: () => Object.keys(this.user.mistakes).length > 0,
				},
			],
		};
	},
}
</script>
