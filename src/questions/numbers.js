import kansuji from '@/kansuji';

export default function numbers(min, max) {
	let ret = [];

	for (let number = min; number <= max; number++) {
		if (number == 0) {
			ret.push({q:'ゼロ', a:['zero', 'ぜろ', '0']});
			ret.push({q:'丸', a:['maru', 'まる', '0']});
			ret.push({q:'零', a:['rei', 'れい', '0']});
			ret.push({q:'○', a:['maru', 'まる', '0']});
			continue;
		}

		let kanji = kansuji(number);
		let romaji = kansuji(number, { type: 'romaji' });
		let hiragana = kansuji(number, { type: 'hiragana' });

		ret.push({
			q: kanji,
			a: [
				romaji,
				hiragana,
				number.toString(),
			],
		});
	}

	return ret;
}
