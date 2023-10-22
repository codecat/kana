<template>
	<section class="section">
		<div class="container">
			<div class="columns is-centered">
				<div class="column is-half">
					<progress class="progress is-success is-small"
						:value="numCorrectQuestions"
						:max="numTotalQuestions" />

					<div class="columns is-size-7">
						<div class="column">
							{{ numCorrectQuestions }} / {{ numTotalQuestions }}
						</div>
						<div class="column has-text-centered">
							<span class="combo" v-if="multiplier > 1 && !isDone">
								Combo x{{ multiplier.toFixed(1) }}
							</span>
						</div>
						<div class="column has-text-right">
							+ {{ gainedXP.toLocaleString() }} XP
						</div>
					</div>

					<template v-if="currentQuestionIndex > 0 && currentQuestionIndex == gameQuestions.length">
						<div class="notification is-success is-light">
							<p class="title">すごい！</p>
							<p class="subtitle is-6">Training complete!</p>
						</div>

						<div class="has-text-centered block">
							<p class="xp-icon">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" /></svg>
							</p>
							<p class="is-size-4">+ {{ gainedXP.toLocaleString() }} XP</p>
							<p>({{ (duration / 1000).toFixed() }} seconds)</p>
						</div>

						<router-link class="button is-info is-fullwidth" to="/">
							Continue
						</router-link>

						<table class="table is-striped is-fullwidth">
							<thead>
								<tr>
									<th width="30%">Question</th>
									<th>Answer</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="q in gameAnswers" :class="{ 'has-text-danger': q.wrong }">
									<td>{{ q.q.q }}</td>
									<td>
										<Answer :a="q.a" />
										<span class="ml-2 has-text-grey-light" v-if="q.wrong">{{ q.q.a }}</span>
										<span class="ml-2 has-text-grey-light" v-if="q.xp > 0">
											(<span v-if="!q.wrong && q.multiplier > 1">x{{ q.multiplier.toFixed(1) }} &rarr; </span>{{ q.xp }} XP)
										</span>
									</td>
								</tr>
							</tbody>
						</table>
					</template>

					<template v-else>
						<div class="block" v-if="currentQuestion">
							<p class="question">
								<span>{{ currentQuestion.q }}</span>
								<span class="correct has-text-danger" v-if="wrong">
									<Answer :a="currentQuestion.a" />
								</span>
							</p>

							<input
								ref="answer"
								class="answer"
								type="text"
								autocomplete="off"
								autocapitalize="off"
								autocorrect="off"
								spellcheck="false"
								:disabled="wrong"
								v-model="answer"
								@keypress.enter="submitAnswer">
							<p class="help has-text-centered">Type your answer and press <b>enter</b>.</p>

							<p class="has-text-centered has-text-danger" v-if="currentQuestion.wrong">
								<small>You previously got this wrong!</small>
							</p>
						</div>

						<template v-if="wrong">
							<div class="notification is-danger">
								<p>You got it wrong!</p>
							</div>

							<button ref="continue" class="button is-danger is-fullwidth" @click="nextQuestion">
								Continue
							</button>
						</template>
					</template>
				</div>
			</div>
		</div>
	</section>
</template>

<style lang="scss" scoped>
p.question {
	font-size: 5em;
	text-align: center;

	span.correct {
		margin-left: 0.5em;
	}
}

input.answer {
	border: 0;
	border-bottom: 2px solid #eee;
	font-size: 3em;
	width: 100%;
	text-align: center;
	color: hsl(0, 0%, 29%);

	&:focus { outline: 0; }
}

span.combo {
	font-size: 1.3em;
	color: #f70;
}

p.xp-icon {
	width: 5em;
	display: inline-block;
}
</style>

<script>
import user from '@/user';

import Answer from '@/components/Answer.vue';

export default {
	components: {
		Answer,
	},

	props: {
		questions: {
			type: Array,
			default: [],
		},
		questionsFromMistakes: Boolean,
		numDesiredQuestions: {
			type: Number,
			default: 12,
		},
	},

	data() {
		return {
			user,

			gameQuestions: [],
			gameAnswers: [],

			numCorrectQuestions: 0,
			numTotalQuestions: 0,

			combo: 0,
			gainedXP: 0,

			currentQuestionIndex: 0,
			answer: '',
			wrong: false,

			startTime: new Date(),
			duration: 0,
		};
	},

	computed: {
		currentQuestion() {
			if (this.currentQuestionIndex < 0 || this.currentQuestionIndex >= this.gameQuestions.length) {
				return null;
			}
			return this.gameQuestions[this.currentQuestionIndex];
		},

		isDone() {
			return this.currentQuestionIndex > 0 && this.currentQuestionIndex == this.gameQuestions.length;
		},

		multiplier() {
			if (this.combo >= 2) {
				return 1.0 + 0.5 * (this.combo - 1);
			}
			return 1.0;
		},
	},

	methods: {
		submitAnswer() {
			this.answer = this.answer.toLowerCase();

			if (Array.isArray(this.currentQuestion.a)) {
				let wrong = true;
				for (let a of this.currentQuestion.a) {
					if (this.answer == a) {
						wrong = false;
						break;
					}
				}
				this.wrong = wrong;
			} else {
				this.wrong = this.answer != this.currentQuestion.a;
			}

			let multiplier = 1.0;
			let xp = 0;

			if (this.wrong) {
				this.combo = 0;
			} else {
				multiplier = this.multiplier;
				xp = 10 * multiplier;
				this.gainedXP += xp;
				this.numCorrectQuestions++;
				this.combo++;
			}

			this.gameAnswers.push({
				q: this.currentQuestion,
				a: this.answer,
				wrong: this.wrong,
				combo: this.combo,
				xp,
				multiplier,
			});

			if (this.wrong) {
				this.gameQuestions.push({ ...this.currentQuestion, wrong: true });
				this.user.addMistake(this.currentQuestion);
				this.$nextTick(() => {
					this.$refs.continue.focus();
				});
				return;
			}

			if (!this.currentQuestion.wrong) {
				this.user.removeMistake(this.currentQuestion);
			}

			this.nextQuestion();
		},

		nextQuestion() {
			this.wrong = false;
			this.currentQuestionIndex++;

			if (this.isDone) {
				this.duration = new Date() - this.startTime;
				this.user.xp += this.gainedXP;
				this.user.seconds += Math.floor(this.duration / 1000);
				this.user.save();
				return;
			}

			this.answer = '';
			this.$nextTick(() => {
				this.$refs.answer.focus();
			});
		},
	},

	mounted() {
		let allQuestions = [...this.questions];

		if (this.questionsFromMistakes) {
			for (let key of Object.keys(this.user.mistakes)) {
				allQuestions.push(this.user.mistakes[key]);
			}
		}

		this.numTotalQuestions = Math.min(allQuestions.length, this.numDesiredQuestions);

		for (let i = 0; i < this.numTotalQuestions; i++) {
			let index = Math.random() * allQuestions.length;
			let question = allQuestions.splice(index, 1)[0];
			this.gameQuestions.push(question);
		}

		if (this.numTotalQuestions == 0) {
			this.$router.push('/');
			return;
		}

		this.$nextTick(() => {
			this.$refs.answer.focus();
		});
	},
}
</script>
