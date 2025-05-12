$(document).ready(function () {

	var canvas = document.getElementById('textarea-output');
	var context = canvas.getContext('2d');
	context.lineCap = 'round';
	context.beginPath();

	var get_font_width_abs = function (font_width, font_size) {
		return font_size / 20 * font_width;
	}

	// Default values
	var font_style = 'classic';
	var font_size = 14;
	var font_width = 3;
	var font_width_abs = get_font_width_abs(font_width, font_size);
	var font_color = 'black';
	var fat_squeeze = 7 / 8; // how much the wide characters are being squeezed horizontally

	var right_a = function (x, y, r, squeeze = 1) {
		context.moveTo(x, y - r);
		context.lineTo(x, y - 2 * r);
		if (font_style == 'classic') {
			context.moveTo(x - 0.5 * r, y - 2 * r);
		}
		context.lineTo(x + r * squeeze, y - 2 * r);
		context.ellipse(x + r * squeeze, y - r, r * squeeze, r, 0, 3 * Math.PI / 2, 0);
		context.lineTo(x + 2 * r * squeeze, y);
	}

	var left_k = function (x, y, r, squeeze = 1) {
		context.moveTo(x, y);
		context.lineTo(x, y - r);
		context.ellipse(x + r * squeeze, y - r, r * squeeze, r, 0, Math.PI, 0);
	}

	var right_k = function (x, y, r, squeeze = 1) {
		context.moveTo(x, y - r);
		context.ellipse(x + r * squeeze, y - r, r * squeeze, r, 0, Math.PI, 0);
		context.lineTo(x + 2 * r * squeeze, y);
	}

	var left_t = function (x, y, r, squeeze = 1) {
		context.moveTo(x + 2 * r * squeeze, y - r);
		context.ellipse(x + r * squeeze, y - r, r * squeeze, r, 0, 2 * Math.PI, 0);
	}

	var left_p = function (x, y, r, squeeze = 1) {
		context.moveTo(x, y - 2 * r);
		context.lineTo(x, y - r);
		context.ellipse(x + r * squeeze, y - r, r * squeeze, r, 0, Math.PI, 0, true);
	}

	var right_p = function (x, y, r, squeeze = 1) {
		context.moveTo(x, y - r);
		context.ellipse(x + r * squeeze, y - r, r * squeeze, r, 0, Math.PI, 0, true);
		if (font_style == 'classic') {
			context.moveTo(x + 2 * r * squeeze, y - 2 * r);
			context.lineTo(x + 2 * r * squeeze, y);
		} else {
			context.lineTo(x + 2 * r * squeeze, y - 2 * r);
		}
	}

	var left_s = function (x, y, r, squeeze = 1) {
		if (font_style == 'classic') {
			context.moveTo(x + r * squeeze, y);
			context.ellipse(x + r * squeeze, y - r, r * squeeze, r, 0, Math.PI / 2, 3 * Math.PI / 2);
			context.lineTo(x + (2 * squeeze + 0.5) * r, y - 2 * r);
			context.moveTo(x + 2 * r * squeeze, y - 2 * r);
		} else {
			context.moveTo(x, y);
			context.lineTo(x, y - r);
			context.ellipse(x + r * squeeze, y - r, r * squeeze, r, 0, Math.PI, 3 * Math.PI / 2);
			context.lineTo(x + 2 * r * squeeze, y - 2 * r);
		}
		context.lineTo(x + 2 * r * squeeze, y - r);
	}

	var _point = function (x, y, r) {
		context.moveTo(x + r / 8, y);
		context.arc(x, y, r / 8, 0, 2 * Math.PI);
	}

	var _a = function (x, y, r) {
		context.moveTo(x, y);
		context.lineTo(x, y - r);
		right_a(x, y, r);
	}

	var _k = function (x, y, r) {
		left_k(x, y, r);
		context.lineTo(x + 2 * r, y);
	}

	var _g = function (x, y, r) {
		left_k(x, y, r, fat_squeeze);
		right_p(x + 2 * r * fat_squeeze, y, r, fat_squeeze);
	}

	var _q = function (x, y, r) {
		x -= 0.5 * r;
		context.moveTo(x, y);
		context.arc(x, y - r, r, Math.PI / 2, 0, true);
		right_k(x + r, y, r, fat_squeeze);
	}

	var _c = function (x, y, r) {
		_t(x, y, r, fat_squeeze);
		right_k(x + 2 * r * fat_squeeze, y, r, fat_squeeze);
	}

	var _j = function (x, y, r) {
		left_s(x, y, r, fat_squeeze);
		right_p(x + 2 * r * fat_squeeze, y, r, fat_squeeze);
	}

	var _x = function (x, y, r) {
		left_p(x, y, r, fat_squeeze);
		context.lineTo(x + 2 * r * fat_squeeze, y - 2 * r * fat_squeeze);
		right_a(x + 2 * r * fat_squeeze, y, r, fat_squeeze);
	}

	var _t = function (x, y, r, squeeze = 1) {
		left_t(x, y, r, squeeze);
		if (font_style == 'classic') {
			context.lineTo(x + 2 * r * squeeze, y);
		}
	}

	var _d = function (x, y, r) {
		left_t(x, y, r, fat_squeeze);
		right_p(x + 2 * r * fat_squeeze, y, r, fat_squeeze);
	}

	var _n = function (x, y, r) {
		context.moveTo(x + 2 * r, y - 2 * r);
		context.lineTo(x + r, y - 2 * r);
		context.arc(x + r, y - r, r, 3 * Math.PI / 2, 0, true);
	}

	var _p = function (x, y, r, squeeze = 1) {
		context.moveTo(x, y - 2 * r);
		context.lineTo(x, y - r);
		right_p(x, y, r, squeeze);
	}

	var _b = function (x, y, r) {
		left_p(x, y, r, fat_squeeze);
		_p(x + 2 * r * fat_squeeze, y, r, fat_squeeze);
	}

	var _m = function (x, y, r) {
		context.moveTo(x, y - 2 * r);
		context.lineTo(x + 2 * r, y - 2 * r);
		context.arc(x + r, y - r, r, 3 * Math.PI / 2, 0, true);
		context.lineTo(x + 2 * r, y - 2 * r);
		if (font_style == 'classic') {
			context.moveTo(x + 2 * r, y - 2 * r);
			context.lineTo(x + 2 * r, y);
		}
	}

	var _y = function (x, y, r) {
		_r(x, y, r, fat_squeeze);
		right_k(x + 2 * r * fat_squeeze, y, r, fat_squeeze);
	}

	var _r = function (x, y, r, squeeze = 1) {
		context.moveTo(x, y);
		context.lineTo(x, y - 2 * r);
		right_k(x, y, r, squeeze);
	}

	var _l = function (x, y, r) {
		context.moveTo(x, y - 2 * r);
		context.lineTo(x + 2 * r, y - 2 * r);
		_n(x, y, r);
	}

	var _w = function (x, y, r) {
		if (font_style == 'classic') {
			_p(x, y, r, fat_squeeze);
		} else {
			context.moveTo(x, y - 2 * r);
			context.lineTo(x, y - r);
			context.ellipse(x + r * fat_squeeze, y - r, r * fat_squeeze, r, 0, Math.PI, 0, true);
		}
		right_k(x + 2 * r * fat_squeeze, y, r, fat_squeeze);
	}

	var _s = function (x, y, r) {
		left_s(x, y, r);
		context.lineTo(x + 2 * r, y);
	}

	var _h = function (x, y, r) {
		x -= 0.5 * r;
		context.moveTo(x, y);
		context.arc(x, y - r, r, Math.PI / 2, 0, true);
		right_a(x + r, y, r, fat_squeeze);
	}

	var _f = function (x, y, r) {
		context.moveTo(x - r, y - r);
		context.lineTo(x - r, y + r);
		if (font_style == 'classic') {
			context.arc(x - 2 * r, y + r, r, 0, Math.PI);
		} else {
			context.arc(x - 2 * r, y + r, r, 0, Math.PI / 2);
		}
	}

	var _fn = function (x, y, r) {
		if (font_style == 'classic') {
			_n(x, y, r);
			_f(x + 3 * r, y, r);
		} else {
			context.moveTo(x + 2 * r, y - 2 * r);
			context.lineTo(x + r, y - 2 * r);
			context.arc(x + r, y - r, r, 3 * Math.PI / 2, Math.PI / 2, true);
			context.arc(x + r, y + r, r, 3 * Math.PI / 2, Math.PI / 2);
		}
	}

	var _fl = function (x, y, r) {
		context.moveTo(x, y - 2 * r);
		context.lineTo(x + 2 * r, y - 2 * r);
		_fn(x, y, r);
	}

	var _v = function (x, y, r) {
		context.moveTo(x - r, y - r);
		context.lineTo(x - r, y + r);
		context.arc(x, y + r, r, Math.PI, Math.PI / 2, true);
	}

	var _vn = function (x, y, r) {
		if (font_style == 'classic') {
			_n(x, y, r);
			_v(x + 3 * r, y, r);
		} else {
			context.moveTo(x + 2 * r, y - 2 * r);
			context.lineTo(x + r, y - 2 * r);
			context.arc(x + r, y - r, r, 3 * Math.PI / 2, Math.PI / 2, true);
			context.arc(x + r, y + r, r, 3 * Math.PI / 2, 0);
			context.arc(x + 3 * r, y + r, r, Math.PI, Math.PI / 2, true);
		}
	}

	var _vl = function (x, y, r) {
		context.moveTo(x, y - 2 * r);
		context.lineTo(x + 2 * r, y - 2 * r);
		_vn(x, y, r);
	}

	var _i = function (x, y, r) {
		var rcos = 0.75 * r;
		context.moveTo(x - 2 * r - rcos, y - 3.125 * r);
		context.lineTo(x - 2 * r + rcos, y - 3.125 * r);
	}

	var _u = function (x, y, r) {
		context.moveTo(x - 2 * r, y + 0.75 * r);
		context.lineTo(x - 2 * r, y + 2 * r);
	}

	var _z = function (x, y, r) {
		context.moveTo(x + 2 * r, y - 3 * r);
		context.arc(x + r, y - 3 * r, r, 0, Math.PI, true);
		context.lineTo(x, y);
	}

	var _o = function (x, y, r) {
		context.moveTo(x - 2 * r, y - 3 * r);
		context.arc(x - r, y - 3 * r, r, Math.PI, 0);
		context.lineTo(x, y);
	}

	var _e = function (x, y, r) {
		_point(x - 2 * r, y - 3.125 * r, r);
	}

	var _hubung = function (x, y, r) {
		context.moveTo(x, y - r);
		context.lineTo(x + r, y - r);
	}

	var _singkat = function (x, y, r) {
		context.moveTo(x, y - 3 * r);
		context.arc(x + r, y - 3 * r, r, Math.PI, Math.PI / 2);
		context.arc(x + r, y - r, r, 3 * Math.PI / 2, 0, true);
	}

	var _carik = function (x, y, r) {
		context.moveTo(x, y - 2 * r);
		context.lineTo(x, y);
	}

	var _danda = function (x, y, r) {
		_carik(x, y, r);
		_carik(x + r, y, r);
	}

	var _seru = function (x, y, r) {
		context.moveTo(x, y - 4 * r);
		context.lineTo(x, y - r);
		_point(x, y, r);
	}

	var _tanya = function (x, y, r) {
		context.moveTo(x, y - 3 * r);
		context.arc(x + r, y - 3 * r, r, Math.PI, Math.PI / 2);
		context.lineTo(x + r, y - r);
		_point(x + r, y, r);
	}

	var _bisah = function (x, y, r) {
		context.moveTo(x, y - 2 * r);
		context.arc(x, y - r, r, 3 * Math.PI / 2, Math.PI / 2);
	}

	var _kutipbuka = function (x, y, r) {
		context.moveTo(x, y);
		context.lineTo(x, y - 4 * r);
		context.moveTo(x, y - 4 * r);
		context.lineTo(x + 1.5 * r, y - 4 * r);
	}

	var _kutiptutup = function (x, y, r) {
		context.moveTo(x, y - 4 * r);
		context.lineTo(x + 1.5 * r, y - 4 * r);
		context.moveTo(x + 1.5 * r, y - 4 * r);
		context.lineTo(x + 1.5 * r, y);
	}

	var _kurungbuka = function (x, y, r) {
		context.moveTo(x + 1.5 * r, y + 2 * r);
		context.lineTo(x, y + 2 * r);
		context.moveTo(x, y + 2 * r);
		context.lineTo(x, y - 4 * r);
		context.moveTo(x, y - 4 * r);
		context.lineTo(x + 1.5 * r, y - 4 * r);
	}

	var _kurungtutup = function (x, y, r) {
		context.moveTo(x, y - 4 * r);
		context.lineTo(x + 1.5 * r, y - 4 * r);
		context.moveTo(x + 1.5 * r, y - 4 * r);
		context.lineTo(x + 1.5 * r, y + 2 * r);
		context.moveTo(x + 1.5 * r, y + 2 * r);
		context.lineTo(x, y + 2 * r);
	}

	var _0 = function (x, y, r) {
		context.moveTo(x, y - 2.5 * r);
		context.arc(x + r, y - 2.5 * r, r, Math.PI, 0);
		context.lineTo(x + 2 * r, y - r);
		context.arc(x + r, y - r, r, 0, Math.PI);
		context.lineTo(x, y - 2.5 * r);
	}

	var _1 = function (x, y, r) {
		context.moveTo(x, y - 2.5 * r);
		context.arc(x, y - 3.5 * r, r, Math.PI / 2, 0, true);
		context.moveTo(x + r, y - 3.5 * r);
		context.lineTo(x + r, y);
	}

	var _2 = function (x, y, r) {
		context.moveTo(x, y - 2.5 * r);
		context.arc(x + r, y - 2.5 * r, r, Math.PI, Math.PI / 2);
		context.arc(x + r, y - .5 * r, r, 3 * Math.PI / 2, Math.PI, true);
		context.lineTo(x, y);
		context.lineTo(x + 2 * r, y);
	}

	var _3 = function (x, y, r) {
		context.moveTo(x, y - 2.625 * r);
		context.ellipse(x + r, y - 2.625 * r, r, .875 * r, 0, Math.PI, Math.PI / 2);
		context.ellipse(x + r, y - .875 * r, r, .875 * r, 0, 3 * Math.PI / 2, Math.PI);
	}

	var _4 = function (x, y, r) {
		context.moveTo(x + 1.5 * r, y);
		context.lineTo(x + 1.5 * r, y - 3.5 * r);
		context.moveTo(x + 1.5 * r, y - 3.5 * r);
		context.lineTo(x, y - r);
		context.moveTo(x, y - r);
		context.lineTo(x + 2 * r, y - r);
	}

	var _5 = function (x, y, r) {
		context.moveTo(x + 2 * r, y - 3.5 * r);
		context.lineTo(x, y - 3.5 * r);
		context.lineTo(x, y - 1.625 * r);
		context.ellipse(x + r, y - 1.625 * r, r, .875 * r, 0, Math.PI, 0);
		context.lineTo(x + 2 * r, y - .875 * r);
		context.ellipse(x + r, y - .875 * r, r, .875 * r, 0, 0, Math.PI);
	}

	var _6 = function (x, y, r) {
		context.moveTo(x + 2 * r, y - 2.625 * r);
		context.ellipse(x + r, y - 2.625 * r, r, .875 * r, 0, 0, Math.PI, true);
		context.lineTo(x, y - r);
		context.moveTo(x + 2 * r, y - r);
		context.arc(x + r, y - r, r, 0, 2 * Math.PI);
	}

	var _7 = function (x, y, r) {
		context.moveTo(x, y - 3.5 * r);
		context.lineTo(x + 2 * r, y - 3.5 * r);
		context.moveTo(x + 2 * r, y - 3.5 * r);
		context.lineTo(x + 0.5 * r, y);
	}

	var _8 = function (x, y, r) {
		context.moveTo(x + 2 * r, y - 2.625 * r);
		context.ellipse(x + r, y - 2.625 * r, r, .875 * r, 0, 0, 2 * Math.PI, true);
		context.moveTo(x + 2 * r, y - .875 * r);
		context.ellipse(x + r, y - .875 * r, r, .875 * r, 0, 0, 2 * Math.PI, true);
	}

	var _9 = function (x, y, r) {
		context.moveTo(x + 2 * r, y - 2.5 * r);
		context.arc(x + r, y - 2.5 * r, r, 0, 2 * Math.PI);
		context.lineTo(x + 2 * r, y - .875 * r);
		context.ellipse(x + r, y - .875 * r, r, .875 * r, 0, 0, Math.PI);
	}

	var _plus = function (x, y, r) {
		context.moveTo(x, y - r);
		context.lineTo(x + r, y - r);
		context.moveTo(x + 0.5 * r, y - 1.5 * r);
		context.lineTo(x + 0.5 * r, y - 0.5 * r);
	}

	var _equal = function (x, y, r) {
		context.moveTo(x, y - 1.5 * r);
		context.lineTo(x + r, y - 1.5 * r);
		context.moveTo(x, y - 0.5 * r);
		context.lineTo(x + r, y - 0.5 * r);
	}

	var _midpoint = function (x, y, r) {
		_point(x, y - r, r);
	}

	var _colon = function (x, y, r) {
		_point(x, y - 1.5 * r, r);
		_point(x, y - 0.5 * r, r);
	}

	var diacritic_vowels = ['i', 'u', 'e'];
	var vowels = ['i', 'u', 'z', 'o', 'e'];
	var consonants = ['a', 'k', 'g', 'q', 'c', 'j', 'x', 't', 'd', 'n', 'p', 'b', 'm', 'y', 'r', 'l', 'w', 's', 'h', '`', ',']; // '`', ',' consonant placeholders
	var a_phobic = ['g', 'j', 'd', 'n', 'p', 'b', 'm', 'l', 's', 'z', 'o', '.', ',', '!', '0', '5', '9', ']', ')'];
	var a_half_phobic = ['a', 'k', 'q', 'c', 'x', 't', 'y', 'r', 'w', 'h', '2', '3', '8'];
	var s_phobic = ['a', 'x', 'p', 'b', 'm', 'y', 'r', 'l', 'w', 'z', 'o', '.', ',', '!', ';', '0', '5', '6', '[', '('];
	var s_half_phobic = ['k', 'g', 'h', '8', '9'];
	var q_phobic = ['a', 'k', 'g', 'q', 'c', 'j', 'x', 't', 'd', 'p', 'b', 'm', 'y', 'r', 'w', 's', 'h', 'z', 'o', '.', ',', '!', '2', ']', ')'];
	var q_phobic_modern = ['a', 'k', 'q', 'c', 'x', 'y', 'r', 'w', 's', 'h', 'z', 'o', '.', ',', '!', '2', ']', ')'];
	var portruding = ['a', 'q', 'h'];
	var portruding_modern = ['q', 'h'];
	var breakable = ['-', '+', '=', "'", ':'];

	// moves 'f', 'v', and 'z' to the front of the consonant
	// moves vowels to the front of bisah
	var reposition = function (text) {
		newText = text.split("");
		prevCons = null;
		prevBisah = null;
		for (var i = 0; i < newText.length; i++) {
			c = newText[i];
			if (c == ' ') {
				prevCons = null;
				prevBisah = null;
			} else if (consonants.indexOf(c) != -1) {
				prevCons = i;
				prevBisah = null; // reset bisah for new syllable
			} else if (c == 'f' || c == 'v' || c == 'z') {
				if (prevCons == null) {
					newText[i] = '_'; // remove it
				} else {
					for (var j = i; j > prevCons; j--) {
						newText[j] = newText[j - 1];
					}
					newText[prevCons] = c; // move it to front of cons
					if (prevBisah != null) {
						prevBisah++; // the index of bisah is shifted by one after the move
					}
				}
			} else if (c == ';') {
				prevBisah = i;
			} else if (vowels.indexOf(c) != -1) {
				if (prevBisah != null) {
					for (var j = i; j > prevBisah; j--) {
						newText[j] = newText[j - 1];
					}
					newText[prevBisah] = c; // move the vowel to front of bisah
				}
			}
		}
		return newText.join("");
	}


	// The AJAX requests must be run on a live web server (e.g. with VSCode Live Server extension)
	// Otherwise, it will blocked by CORS policy if run locally 
	var uud45;
	$.get('./assets/texts/uud45.txt', function (data) {
		uud45 = data;
	});
	var udhr;
	$.get('./assets/texts/udhr.txt', function (data) {
		udhr = data;
	});

	var parse = function (text, layout_only = false) {
		if (!layout_only) {
			context.lineWidth = font_width_abs;
			context.lineCap = 'round';
			context.strokeStyle = font_color;
			context.fillStyle = font_color;

			// To reduce blurry edges, multiply the canvas size by the devicePixelRatio and then scale it down
			context.scale(window.devicePixelRatio, window.devicePixelRatio);

			context.beginPath();
		}

		var c;
		var state = 'a';
		var ar = font_size / 2;
		var ax = ar * 2;
		var ay = ar * 5;
		var orig_x = ax;
		var prevChar = ' '; // for kerning
		var prevState = 'a'; // for kerning
		var wordStartIdx = 0;
		var wordStartPos = ax;
		var numLines = 1;

		var lineBreak = function (i) {
			ax = orig_x;
			ay += 7 * ar;
			wordStartIdx = i + 1;
			wordStartPos = ax;
			numLines++;
			prevChar = ' ';
		}

		var breakLocations = [];

		for (var i = 0; i < text.length; i++) {
			c = text[i];
			if (c == 'f') {
				state = 'f';
			} else if (c == 'v') {
				state = 'v';
			} else if (c == '\n') {
				lineBreak(i);
			} else if (c == ' ') {
				prevChar = ' ';
				prevState = 'a';
				ax = draw(' ', state, ax, ay, ar, layout_only);
				wordStartIdx = i + 1;
				wordStartPos = ax;
			} else {
				if (diacritic_vowels.indexOf(c) == -1) {
					ax += kern(prevChar, prevState, c, state) * ar;
					prevChar = c;
					prevState = state;
				}
				if (ax == orig_x) { // align left a, q, h
					if ((font_style == 'classic' && portruding.indexOf(c) != -1) || (font_style != 'classic' && portruding_modern.indexOf(c) != -1)) {
						ax += 0.5 * ar;
					}
				}
				if (ax > get_canvas_width() - (char_width(c) + 0.5) * ar) { // line break
					if (wordStartPos > orig_x) { // break whole word
						breakLocations.push(wordStartIdx);
						i = wordStartIdx - 1;
						state = 'a';
						lineBreak(i);
						continue;
					}
					ax = orig_x;
					ay += 7 * ar;
				}
				ax = draw(c, state, ax, ay, ar, layout_only);
				if (c != 'z') { // don't reset state yet after z
					state = 'a';
				}
				if (breakable.indexOf(c) != -1) { // allow break after tanda hubung etc
					wordStartIdx = i + 1;
					wordStartPos = ax;
				}
			}
		}

		if (!layout_only) {
			context.stroke();
		}

		return { w: ax + ar, h: ay + 3 * ar, n: numLines, b: breakLocations };
	}

	var kern = function (prevChar, prevState, c, state) {
		if (prevChar == 'o' && c == 'z') {
			if (font_style == 'classic') {
				return 0.125;
			} else {
				return -1;
			}
		}

		if (font_style == 'classic') {
			k = 0;
			if (prevChar == 's') {
				if (c == 'a') {
					k += 0.375;
				} else if (s_phobic.indexOf(c) != -1) {
					k += 0.25;
				} else if (s_half_phobic.indexOf(c) != -1) {
					k += 0.125;
				}
			}
			if (c == 'a') {
				if (a_phobic.indexOf(prevChar) != -1) {
					k += 0.25;
				} else if (a_half_phobic.indexOf(prevChar) != -1) {
					k += 0.125;
				}
			}
			if (c == 'q' || c == 'h') {
				if (q_phobic.indexOf(prevChar) != -1 || prevState != 'a') {
					k += 0.25;
				}
			}
			if (prevState == 'v' && state == 'f' && char_width(c) <= 3) { // avoid collision of v and f tails
				k = Math.max(k, 0.375);
			}
			return k;
		} else {
			if (c == 'q' || c == 'h') {
				if (q_phobic_modern.indexOf(prevChar) != -1 || prevState != 'a') {
					return 0.25;
				}
			}
			return 0;
		}
	}

	var draw = function (c, state, ax, ay, ar, layout_only = false) {
		var next_ax = ax + char_width(c) * ar;
		if (layout_only) {
			return next_ax;
		}

		switch (c) {
			case 'a':
				_a(ax, ay, ar); break;
			case 'k':
				_k(ax, ay, ar); break;
			case 'g':
				_g(ax, ay, ar); break;
			case 'q':
				_q(ax, ay, ar); break;
			case 'c':
				_c(ax, ay, ar); break;
			case 'j':
				_j(ax, ay, ar); break;
			case 'x':
				_x(ax, ay, ar); break;
			case 't':
				_t(ax, ay, ar); break;
			case 'd':
				_d(ax, ay, ar); break;
			case 'n':
				if (state == 'f') {
					_fn(ax, ay, ar);
				} else if (state == 'v') {
					_vn(ax, ay, ar);
				} else {
					_n(ax, ay, ar);
				}
				return next_ax;
			case 'p':
				_p(ax, ay, ar); break;
			case 'b':
				_b(ax, ay, ar); break;
			case 'm':
				_m(ax, ay, ar); break;
			case 'y':
				_y(ax, ay, ar); break;
			case 'r':
				_r(ax, ay, ar); break;
			case 'l':
				if (state == 'f') {
					_fl(ax, ay, ar);
				} else if (state == 'v') {
					_vl(ax, ay, ar);
				} else {
					_l(ax, ay, ar);
				}
				return next_ax;
			case 'w':
				_w(ax, ay, ar); break;
			case 's':
				_s(ax, ay, ar); break;
			case 'h':
				_h(ax, ay, ar); break;
			case 'i':
				_i(ax, ay, ar); break;
			case 'u':
				_u(ax, ay, ar); break;
			case 'z':
				_z(ax, ay, ar); break;
			case 'o':
				_o(ax, ay, ar); break;
			case 'e':
				_e(ax, ay, ar); break;
			case ';':
				_bisah(ax, ay, ar); break;
			case '-':
				_hubung(ax, ay, ar); break;
			case '/':
				_singkat(ax, ay, ar); break;
			case ',':
				_carik(ax, ay, ar); break;
			case '.':
				_danda(ax, ay, ar); break;
			case '[':
				_kutipbuka(ax, ay, ar); break;
			case ']':
				_kutiptutup(ax, ay, ar); break;
			case '(':
				_kurungbuka(ax, ay, ar); break;
			case ')':
				_kurungtutup(ax, ay, ar); break;
			case '!':
				_seru(ax, ay, ar); break;
			case '?':
				_tanya(ax, ay, ar); break;
			case '0':
				_0(ax, ay, ar); break;
			case '1':
				_1(ax, ay, ar); break;
			case '2':
				_2(ax, ay, ar); break;
			case '3':
				_3(ax, ay, ar); break;
			case '4':
				_4(ax, ay, ar); break;
			case '5':
				_5(ax, ay, ar); break;
			case '6':
				_6(ax, ay, ar); break;
			case '7':
				_7(ax, ay, ar); break;
			case '8':
				_8(ax, ay, ar); break;
			case '9':
				_9(ax, ay, ar); break;
			case '+':
				_plus(ax, ay, ar); break;
			case '=':
				_equal(ax, ay, ar); break;
			case "'":
				_midpoint(ax, ay, ar); break;
			case ':':
				_colon(ax, ay, ar); break;
		}

		if (consonants.indexOf(c) != -1) {
			if (state == 'f') {
				_f(next_ax, ay, ar)
			} else if (state == 'v') {
				_v(next_ax, ay, ar)
			}
		}

		return next_ax;
	}

	var char_width = function (c) {
		switch (c) {
			case 'z':
			case 'o':
			case ',':
			case "'":
			case ':':
			case '!':
				return 1;
			case ' ':
			case ';':
			case '-':
			case '.':
			case '+':
			case '=':
				return 2;
			case '1':
				return 2.25;
			case '[':
			case ']':
			case '(':
			case ')':
				return 2.5;
			case 'a':
			case 'k':
			case 't':
			case 'n':
			case 'p':
			case 'm':
			case 'r':
			case 'l':
			case 's':
			case '/':
			case '?':
			case '0':
			case '2':
			case '3':
			case '4':
			case '5':
			case '6':
			case '7':
			case '8':
			case '9':
			case '`': // consonant placeholder
				return 3;
			case 'q':
			case 'h':
				return 2 * fat_squeeze + 1.5;
			case 'g':
			case 'c':
			case 'j':
			case 'x':
			case 'd':
			case 'b':
			case 'y':
			case 'w':
				return 4 * fat_squeeze + 1;
			default:
				return 0;
		}
	}

	// global vars to save last state
	var text_height = 0;
	var text_width = 0;
	var num_lines = 0;
	var adjusted_text = '';

	// parse, add line breaks, and adjust the canvas height
	var parse_adjust = function (text) {
		//sample texts
		if (text == '***') {
			text = uud45;
		} else if (text == '*****') {
			text = udhr;
		}

		text = text.toLowerCase();
		text = reposition(text);

		var text_info = parse(text, true); // layout parse
		text_height = text_info.h;
		text_width = text_info.w;
		num_lines = text_info.n;
		break_locations = text_info.b.reverse();

		// add line breaks
		for (var i = 0; i < break_locations.length; i++) {
			var loc = break_locations[i];
			text = text.substr(0, loc) + '\n' + text.substr(loc);
		}
		adjusted_text = text;

		set_canvas_height(Math.max(text_height, min_height));
		parse(text);
	}

	// Do best effort transliteration from Indonesian to Cara key
	var transliterate = function (indo) {
		var vowels = ['a', 'e', 'é', 'è', 'i', 'o', 'u'];
		var consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z', "'", "’"];

		indo = indo.toLowerCase();
		var cara = [];

		for (var i = 0; i < indo.length; i++) {
			var c = indo[i];
			var prev = indo[i - 1];
			var next = indo[i + 1];
			var next2 = indo[i + 2];

			if (vowels.indexOf(c) != -1) {
				// insert the vowel carrier if the vowel is not after a consonent
				if (prev == 'i' || prev == 'é' || prev == 'è') {
					cara.push('y')
				} else if (prev == 'u' || prev == 'o') {
					cara.push('w');
				} else if (consonants.indexOf(prev) == -1) {
					cara.push('a');
				}
				// insert the vowel if the vowel is not 'a'
				if (c == 'é' || c == 'è') {
					cara.push('z');
				} else if (c != 'a') {
					cara.push(c);
				}
				// 'er' before consonant
				if (c == 'e' && next == 'r' && consonants.indexOf(next2) != -1) {
					cara.push('f');
					i++;
				}
				// diphthongs (best guess - at the end of word or before a vowel)
				if ((c == 'a' || c == 'o') && next == 'i') {
					if (consonants.indexOf(next2) == -1) {
						if (vowels.indexOf(next2) == -1) { // exclude 'aia'
							cara.push('yf');
						}
						i++;
					}
				}
				if (c == 'a' && next == 'u') {
					if (consonants.indexOf(next2) == -1) {
						if (vowels.indexOf(next2) == -1) { // exclude 'aua'
							cara.push('wf');
						}
						i++;
					}
				}
			} else if (consonants.indexOf(c) != -1) {
				var push_v = function () {
					if (prev == null || prev == ' ') {
						cara.push(','); // placeholder for nasal sign
					}
					cara.push('v');
				}

				if ((c == 'b' || c == 'd' || c == 'g' || c == 'k' || c == 't') && next == 'h') { // bh, dh, gh, kh, th
					cara.push(c + ';');
					i++;
				} else if (c == 'f') { // 'f'
					cara.push('p;');
				} else if (c == 'm' && (next == 'b' || next == 'f' || next == 'p' || next == 'v')) { // mb, mf, mp, mv
					push_v();
				} else if (c == 'n' && (next == 'c' || next == 'd' || next == 'j' || next == 't' || next == 'z')) { // nc, nd, nj, nt, nz
					push_v();
				} else if (c == 'n' && next == 'g') {
					if (next2 == 'g' || next2 == 'h' || next2 == 'k' || next2 == 'l' || next2 == 'r' || next2 == 's' || next2 == "'") { // ngg, ngh, ngk, ngl, ngr, ngs, ng'
						push_v();
					} else { // ng
						cara.push('q');
					}
					i++;
				} else if (c == 'n' && next == 'y') { // ny
					cara.push('x');
					i++;
				} else if (c == 's' && next == 'y') { // sy
					cara.push('s;');
					i++;
				} else if (c == 'q') { // q
					cara.push('k');
				} else if (c == 'v') { // v
					cara.push('p;');
				} else if (c == 'x') { // x
					cara.push('kfs');
				} else if (c == 'z') { // z
					cara.push('j;');
				} else if (c == "'" || c == "’") { // glottal stop
					cara.push('a');
				} else {
					cara.push(c);
				}
				// insert 'f' if the consonant is not followed by a vowel;
				if (cara[cara.length - 1] != 'v' && vowels.indexOf(indo[i + 1]) == -1) {
					cara.push('f');
				}
			} else {
				if (c == '.' || c == ',' || c == '?' || c == '!' || c == ':' || c == ';') {
					cara.push(' ');
				}
				if (c == ';') {
					cara.push(',');
				} else if (c != '\\') { // use backslash as digraph separator
					cara.push(c);
				}
			}

		}

		return cara.join("");
	}

	var min_height = 300;
	var width_ratio = 0.7;
	var min_width = $(window).width() * width_ratio;

	// To reduce blurry edges, multiply the canvas size by the devicePixelRatio and then scale it down
	var set_canvas_width = function (width) {
		canvas.width = width * window.devicePixelRatio;
		canvas.style.width = `${width}px`;
	}

	var get_canvas_width = function () {
		return canvas.width / window.devicePixelRatio;
	}

	var set_canvas_height = function (height) {
		canvas.height = height * window.devicePixelRatio;
		canvas.style.height = `${height}px`;
	}

	var get_canvas_height = function () {
		return canvas.height / window.devicePixelRatio;
	}

	set_canvas_width(min_width);
	set_canvas_height(min_height);

	// Sets the default values:
	$("#font-size").val(font_size);
	$("#font-style").val(font_style);
	$("#font-width").val(font_width);
	$("#font-color").val(font_color);

	$("#font-size").change(function () {
		font_size = parseInt($(this).val());
		font_width_abs = get_font_width_abs(font_width, font_size);;
		var input_text = $("#key-input").val();
		parse_adjust(input_text);
	});

	$("#font-width").change(function () {
		font_width = parseInt($(this).val());
		font_width_abs = get_font_width_abs(font_width, font_size);;
		var input_text = $("#key-input").val();
		parse_adjust(input_text);
	});

	$("#font-style").change(function () {
		font_style = $(this).val();
		var input_text = $("#key-input").val();
		parse_adjust(input_text);
	});

	$("#font-color").change(function () {
		font_color = $(this).val();
		var input_text = $("#key-input").val();
		parse_adjust(input_text);
	});

	// Textarea input listens to keypress events.
	$("#key-input").keyup(function () {
		var input_text = $(this).val();
		parse_adjust(input_text);
	});

	// Handle paste event
	$("#key-input").bind("paste", function (e) {
		var _this = $(this);
		setTimeout(function () {
			parse_adjust(_this.val());
		});
	});

	$("#save_button").click(function () {
		var short_text = text_height < min_height || num_lines < 2;

		// truncate image height & width to fit
		if (short_text) {
			var prev_height = get_canvas_height();
			set_canvas_height(text_height);
			if (num_lines < 2)
				set_canvas_width(text_width);
			parse(adjusted_text);
		}

		$(this).attr('download', 'pujangga.png');
		$(this).attr('href', canvas.toDataURL());

		// return to original height & width
		if (short_text) {
			set_canvas_width(min_width);
			set_canvas_height(prev_height);
			parse(adjusted_text);
		}
	});

	$("#transliterate_button").click(function () {
		var transliterated = transliterate($("#key-input").val());
		$("#key-input").val(transliterated);
		parse_adjust(transliterated);
	});

	$(".keyboard-btn").click(function () {
		var old_text = $("#key-input").val();
		var old_start = $("#key-input").prop('selectionStart');
		var old_end = $("#key-input").prop('selectionEnd');
		var c = $(this).data('value');
		var new_text = old_text.slice(0, old_start) + c + old_text.slice(old_end);
		$("#key-input").val(new_text);
		parse_adjust(new_text);
		$("#key-input").focus();
		$("#key-input").prop('selectionStart', old_start + 1);
		$("#key-input").prop('selectionEnd', old_start + 1);
	});

	$(window).resize(function () {
		min_width = $(window).width() * width_ratio;
		set_canvas_width(min_width);
		var input_text = $("#key-input").val();
		parse_adjust(input_text);
	});

	var input_text = $("#key-input").val();
	parse_adjust(input_text);

});