import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '@/views/HomeView.vue';

import GameCharacterSetView from '@/views/games/CharacterSet.vue';

import hiragana from '@/questions/hiragana';
import hiraganaDakuten from '@/questions/hiragana-dakuten';
import hiraganaYoon from '@/questions/hiragana-yoon';
import hiraganaMisc from '@/questions/hiragana-misc';

import katakana from '@/questions/katakana';
import katakanaDakuten from '@/questions/katakana-dakuten';
import katakanaYoon from '@/questions/katakana-yoon';
import katakanaMisc from '@/questions/katakana-misc';

import kanjiNumbers from '@/questions/kanji-numbers';
import numbers from '@/questions/numbers';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{ path: '/', component: HomeView },

		//////////////////////////////////////////////
		// Combined
		{
			path: '/game/combined',
			component: GameCharacterSetView,
			props: {
				questions: [
					...hiragana,
					...hiraganaDakuten,
					...hiraganaYoon,
					...hiraganaMisc,
					...katakana,
					...katakanaDakuten,
					...katakanaYoon,
					...katakanaMisc,
				],
				numDesiredQuestions: 24,
			},
		},

		//////////////////////////////////////////////
		// Hiragana
		{
			path: '/game/hiragana',
			component: GameCharacterSetView,
			props: { questions: [
				...hiragana,
				...hiraganaDakuten,
				...hiraganaYoon,
				...hiraganaMisc,
			] },
		},

		{
			path: '/game/hiragana/base',
			component: GameCharacterSetView,
			props: { questions: [...hiragana] },
		},

		{
			path: '/game/hiragana/dakuten',
			component: GameCharacterSetView,
			props: { questions: [...hiraganaDakuten] },
		},

		{
			path: '/game/hiragana/yoon',
			component: GameCharacterSetView,
			props: { questions: [...hiraganaYoon] },
		},

		//////////////////////////////////////////////
		// Katakana
		{
			path: '/game/katakana',
			component: GameCharacterSetView,
			props: { questions: [
				...katakana,
				...katakanaDakuten,
				...katakanaYoon,
				...katakanaMisc,
			] },
		},

		{
			path: '/game/katakana/base',
			component: GameCharacterSetView,
			props: { questions: [...katakana] },
		},

		{
			path: '/game/katakana/dakuten',
			component: GameCharacterSetView,
			props: { questions: [...katakanaDakuten] },
		},

		{
			path: '/game/katakana/yoon',
			component: GameCharacterSetView,
			props: { questions: [...katakanaYoon] },
		},

		//////////////////////////////////////////////
		// Numbers
		{
			path: '/game/numbers/1',
			component: GameCharacterSetView,
			props() { return { questions: [...numbers(0, 10)] }; },
		},

		{
			path: '/game/numbers/2',
			component: GameCharacterSetView,
			props() { return { questions: [...numbers(10, 100)] }; },
		},

		{
			path: '/game/numbers/3',
			component: GameCharacterSetView,
			props() { return { questions: [...numbers(100, 1_000)] }; },
		},

		{
			path: '/game/numbers/4',
			component: GameCharacterSetView,
			props() { return { questions: [...numbers(1_000, 10_000)] }; },
		},

		{
			path: '/game/numbers/5',
			component: GameCharacterSetView,
			props() { return { questions: [...numbers(100_000, 1_000_000)] }; },
		},

		//////////////////////////////////////////////
		// Mistakes
		{
			path: '/game/mistakes',
			component: GameCharacterSetView,
			props: { questionsFromMistakes: true },
		},
	]
});

export default router;
