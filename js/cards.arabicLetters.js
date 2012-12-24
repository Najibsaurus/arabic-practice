(function(window, $) {

	var numLetters = 1;
	
	function ArabicLetters() {
		this.letters = [ this.ALIF, this.BAA, this.TAA, this.THAA, this.JEEM, this.HAA, this.KHAA, this.DAAL,this.ZHAAL,   
				            this.RAA, this.ZAA, this.SEEN, this.SHEEN, this.SAAD, this.DHAAD, this.TOY, this.DHOY, 
				            this.AYN, this.GHAYN, this.FAA, this.QAAF, this.KAAF, this.LAAM, this.MIM, this.NOON, this.HA, 
				            this.WOW, this.YA, this.TAA_MARBOOTHAH, this.ALIF_MAKSOOR];
		this.vowels = [this.FATHATAAN, this.DAMMATAAN, this.KASRATAAN, this.FATHA, this.DAMMA, this.KASRA, this.SHADDAH, this.SUKOON];
		this.transliterations = ["`", "b", "t", "th", "j", "H", "KH", "d", "zh",
		                        "r", "z", "s", "sh", "S", "D", "T", "ZH", 
		                        "'", "gh", "f", "Q", "K", "l", "m", "n", "h",
		                        "w", "y", "t", "`",
		                        "an", "un", "in", "a", "u", "i", "_", ""];
	}

	$.extend(ArabicLetters.prototype, {
		ALIF : '\u0627',
		BAA : '\u0628',
		TAA : '\u062A',
		THAA : '\u062B',
		JEEM : '\u062C',
		HAA : '\u062D',
		KHAA : '\u062E',
		DAAL : '\u062F',
		ZHAAL : '\u0630',
		RAA : '\u0631',
		ZAA : '\u0632',
		SEEN : '\u0633',
		SHEEN : '\u0634',
		SAAD : '\u0635',
		DHAAD : '\u0636',
		TOY : '\u0637',
		DHOY : '\u0638',
		AYN : '\u0639',
		GHAYN : '\u063A',
		FAA : '\u0641',
		QAAF : '\u0642',
		KAAF : '\u0643',
		LAAM : '\u0644',
		MIM : '\u0645',
		NOON : '\u0646',
		HA : '\u0647',
		WOW : '\u0648',
		YA : '\u064A',
		TAA_MARBOOTHAH : '\u0629',
		ALIF_MAKSOOR : '\u0649',

		FATHATAAN : '\u064B',
		DAMMATAAN : '\u064C',
		KASRATAAN : '\u064D',
		FATHA : '\u064E',
		DAMMA : '\u064F',
		KASRA : '\u0650',
		SHADDAH : '\u0651',
		SUKOON : '\u0652',

		setOptions: function(options) {
			
		},
		
		getTranscription : function(arabic) {
			return this.transliteration;
		},
		
		translitLetter : function(letter) {
			var i = this.letters.indexOf(letter);
			if (i > -1) {
				return this.transliterations[i];
			} else {
				return "";
			}
		},
		
		translitVowel : function(vowel) {
			var i = this.vowels.indexOf(vowel);
			if (i > -1) {
				return this.transliterations[i+30];
			} else {
				return "";
			}
		},

		generateVowel : function(isFirst, isLast, letter) {
			var approVowels;
			if (isFirst) {
				approVowels = [this.FATHA, this.KASRA, this.DAMMA];
			} else if (isLast) {
				approVowels = window.FlashCards.removeFrom(this.vowels, this.SUKOON);
			} else {
				approVowels = window.FlashCards.removeFrom(this.vowels, [this.FATHATAAN, this.KASRATAAN, this.DAMMATAAN]);
			}
			var vowel = window.FlashCards.randomOneFrom(approVowels);
			if (vowel == this.SHADDAH) {
				vowel += window.FlashCards.randomOneFrom(window.FlashCards.removeFrom(approVowels, [this.SHADDAH, this.SUKOON]));
			}
			return vowel;
		},
		
		generateLetter : function(isFirst, isLast) {
			var approLetters;
			if (isLast) {
				approLetters = this.letters;
			} else {
				approLetters = window.FlashCards.removeFrom(this.letters, [this.TAA_MARBOOTHAH, this.ALIF_MAKSOOR]);
			}
			return window.FlashCards.randomOneFrom(approLetters);
		}, 
		
		getNewArabic : function() {
			var text = "";
			for (var i = 0; i < numLetters; i++) {
				var isFirst = i == 0;
				var isLast = i+1 == numLetters;
				var letter = this.generateLetter(isFirst, isLast);
				var vowel = this.generateVowel(isFirst, isLast, letter);
				this.transliteration = this.translitLetter(letter)+this.translitVowel(vowel);
				text += letter + vowel;
			}
			return text;
		},

		getQuestionAnswer : function() {
			var arabic = this.getNewArabic();
			return { "question":arabic, "answer":this.getTranscription(arabic) };
		}
	});

	window.FlashCards.registerCardSet("arabicLetters", new ArabicLetters());

/*	
	$("#options #numLetters").change(function(e) {
		numLetters = $("#options #numLetters option:selected").val();
	});
*/	
	
}(window, jQuery));