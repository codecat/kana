// Modified from source: https://github.com/io-monad/kansuji

const KANJI_DIGITS = ['〇', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
const HIRAGANA_DIGITS = ['ぜろ', 'いち', 'に', 'さん', 'よん', 'ご', 'ろく', 'なな', 'はち', 'きゅう'];
const ROMAJI_DIGITS = ['zero', 'ichi', 'ni', 'san', 'yon', 'go', 'roku', 'nana', 'hachi', 'kyuu'];

const KANJI_UNITS = ['十', '百', '千', '万', '億', '兆', '京', '垓', '秭', '穣', '溝', '澗', '正', '載'];
const HIRAGANA_UNITS = ['じゅう', 'ひゃく', 'せん', 'まん', 'おく', 'じょう', 'きょう', 'かい', 'し', 'にょう', 'く', 'けん', 'しょう', 'さい'];
const ROMAJI_UNITS = ['shuu', 'hyaku', 'sen', 'man', 'oku', 'jou', 'kyou', 'kai', 'shi', 'nyou', 'ku', 'ken', 'shou', 'sai'];

const DOT = '・';
const PLUS = '＋';
const MINUS = '−';
const REGEXP = /^\s*([-+])?([0-9]+)(?:\.([0-9]+))?/;
const WIDE_REGEXP = /^[\s　]*([-+−＋])?([0-9０１２３４５６７８９]+)(?:[\.．]([0-9０１２３４５６７８９]+))?/;

export default function kansuji(n, options) {
	if (typeof n === 'number' && isNaN(n)) throw new TypeError('NaN can\'t be converted');
	if (n === Infinity) throw new TypeError('Infinity can\'t be converted');
	if (n === -Infinity) throw new TypeError('-Infinity can\'t be converted');

	options = options || {};
	if (typeof options.units !== 'undefined') options.unit = options.units; // alias
	var unit = typeof options.unit === 'undefined' ? true    : options.unit;
	var wide = typeof options.wide === 'undefined' ? false   : options.wide;
	var type = typeof options.type === 'undefined' ? 'kanji' : options.type;

	let digits = KANJI_DIGITS;
	let units = KANJI_UNITS;
	if (type == 'hiragana') {
		digits = HIRAGANA_DIGITS;
		units = HIRAGANA_UNITS;
	} else if (type == 'romaji') {
		digits = ROMAJI_DIGITS;
		units = ROMAJI_UNITS;
	}

	var matched = n.toString().match(wide ? WIDE_REGEXP : REGEXP);
	if (!matched) {
		throw new TypeError('Non-number string can\'t be converted');
	}

	var converted = convert(matched[2], false);
	if (typeof matched[3] !== 'undefined') {
		var decConverted = convert(matched[3], true);
		if (decConverted !== '') converted += DOT + decConverted;
	}
	if (matched[1] === '+' || matched[1] === '＋') converted = PLUS + converted;
	if (matched[1] === '-' || matched[1] === '−') converted = MINUS + converted;
	return converted;

	function convert(str, isDecimal) {
		var out = [], keta = 0;
		for (var i = str.length - 1; i >= 0; i--) {
			var code = str.charCodeAt(i);

			if (code >= 0xFF10 && code <= 0xFF19) {
				// Wide number to ASCII
				code -= (0xFF10 - 0x30);
			}

			if (code === 0x30) {
				// '0'
				if (!unit || (isDecimal && out.length !== 0)) {
					out.unshift(digits[0]);
				}
				keta++;
			} else {
				// '1' - '9'
				if (unit && !isDecimal) {
					var r = keta % 4;
					if (r === 1 || r === 2 || r === 3) {  // 10, 100, 1000
						out.unshift(units[r - 1]);
						if (code === /* '1' */0x31) {
							keta++;
							continue;
						}
					} else if (r === 0 && keta !== 0) {   // 10000, 100000000, ...
						out.unshift(units[(keta / 4) + 2] || '');
					}
				}
				out.unshift(digits[code - 0x30]);
				keta++;
			}
		}

		if (out.length === 0 && !isDecimal) {
			out.push(digits[0]);
		}

		return out.join('');
	}
}
