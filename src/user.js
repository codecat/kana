export default {
	xp: 0,
	seconds: 0,

	mistakes: {},

	save() {
		localStorage.setItem('kanatrainer', JSON.stringify(this));
	},

	load() {
		let data = localStorage.getItem('kanatrainer');
		if (data === null) {
			return;
		}
		Object.assign(this, JSON.parse(data));
	},

	addMistake(question) {
		let key = question.q;
		if (this.mistakes[key] === undefined) {
			this.mistakes[key] = {
				...question,
				count: 1,
			};
		} else if (this.mistakes[key].count < 3) {
			this.mistakes[key].count++;
		}
		this.save();
	},

	removeMistake(question) {
		let key = question.q;
		if (this.mistakes[key] !== undefined) {
			if (--this.mistakes[key].count <= 0) {
				delete this.mistakes[key];
			}
			this.save();
		}
	},
}
