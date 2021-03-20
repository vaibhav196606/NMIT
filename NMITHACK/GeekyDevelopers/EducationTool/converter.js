var vowels = "(A)|(H)|(I)|(M)|(R)|(U)|(\\:)|(\\|(\\|)?)|(a((i)|(u))?)|(e)|(i)|(lR)|(o(M)?)|(u)"
var consonants = "(C)|(D(h)?)|(G)|(J)|(N)|(S)|(T(h)?)|(b(h)?)|(c)|(d(h)?)|(g(h)?)|(h)|(j(h)?)|(k(h)?)|(l)|(m)|(n)|(p(h)?)|(r)|(s)|(t(h)?)|(v)|(y)|(z)"
var letter_codes = {
"~a" : "&#2309;",
"~A" : "&#2310;",
"~i" : "&#2311;",
"~I" : "&#2312;",
"~u" : "&#2313;",
"~U" : "&#2314;",
"~R" : "&#2315;",
"~lR" : "&#2316",
"~e" : "&#2319;",
"~ai" : "&#2320;",
"~o" : "&#2323;",
"~au" : "&#2324;",
"a" : "",
"A" : "&#2366;",
"i" : "&#2367;",
"I" : "&#2368;",
"u" : "&#2369;",
"U" : "&#2370;",
"R" : "&#2371;",
"lR" : "&#2372;",
"e" : "&#2375;",
"ai" : "&#2376;",
"o" : "&#2379;",
"au" : "&#2380;",
"k" : "&#2325;",
"kh" : "&#2326;",
"g" : "&#2327;",
"gh" : "&#2328;",
"G" : "&#2329;",
"c" : "&#2330;",
"C" : "&#2331;",
"j" : "&#2332;",
"jh" : "&#2333;",
"J" : "&#2334;",
"T" : "&#2335;",
"Th" : "&#2336;",
"D" : "&#2337;",
"Dh" : "&#2338;",
"N" : "&#2339;",
"t" : "&#2340;",
"th" : "&#2341;",
"d" : "&#2342;",
"dh" : "&#2343;",
"n" : "&#2344;",
"p" : "&#2346;",
"ph" : "&#2347;",
"b" : "&#2348;",
"bh" : "&#2349;",
"m" : "&#2350;",
"y" : "&#2351;",
"r" : "&#2352;",
"l" : "&#2354;",
"v" : "&#2357;",
"z" : "&#2358;",
"S" : "&#2359;",
"s" : "&#2360;",
"h" : "&#2361;",
"H" : "&#2307;",
":" : "&#2307;",
"M" : "&#2306;",
"|" : "&#2404;",
"||" : "&#2405;",
"oM" : "&#2384;",
"~H" : "&#2307;",
"~:" : "&#2307;",
"~M" : "&#2306;",
"~|" : "&#2404;",
"~||" : "&#2405;",
"~oM" : "&#2384;",
"*" : "&#2381;"
}
function split_word(word)
{
  var syllables = new Array(0);
  var vowel_start_p = true;
  while (word.length) {
    re = new RegExp(vowels);
    var index = word.search(vowels);
    if (index == 0) {  //the vowel's at the start of word
      var matched = re.exec(word)[0]; //what is it?
      if (vowel_start_p) {
	syllables.push(("~"+matched)); //one more to the syllables
      } else {
	syllables.push(matched);
      }
      vowel_start_p = true;
      word = word.substring(matched.length);
    } else {
      re = new RegExp(consonants);
      var index = word.search(consonants);
      if (index == 0) {
	var matched = re.exec(word)[0];
	syllables.push(matched);
	vowel_start_p = false;
	word = word.substring(matched.length);

	//look ahead for virama setting
	var next = word.search(vowels);
	if (next != 0 || word.length == 0)
	  syllables.push('*');
      } else {
	syllables.push(word.charAt(0));
	word = word.substring(1);
      }
    }
  }
  return syllables;
}

function match_code(syllable_mcc)
{
  var matched = letter_codes[syllable_mcc];

  if (matched != null) return matched;
  return syllable_mcc;
}

function one_word(word_ow)
{
  if (!word_ow) return "";
  var syllables_ow = split_word(word_ow);
  var letters_ow = new Array(0);

  for (var i_ow = 0; i_ow < syllables_ow.length; i_ow++) {
    letters_ow.push(match_code(syllables_ow[i_ow]));
  }
  return letters_ow.join("");
}

function many_words(sentence)
{
  var regex = "((" + vowels + ")|(" + consonants + "))+";
  var words = new Array(0);
  while (sentence.length >= 1) {
    re = new RegExp("^``" + regex);
    var match = re.exec(sentence);
    if (match != null) {
      match = match[0];
      words.push("`");
      words.push(one_word(match.substring(2)));
      sentence = sentence.substring(match.length);
    } else {
      re = new RegExp("^`" + regex);
      match = re.exec(sentence);
      if (match != null) {
	match = match[0];
	words.push(match.substring(1));
	sentence = sentence.substring(match.length);
      } else {
	re = new RegExp("^" + regex);
	match = re.exec(sentence);
	if (match != null) {
	  match = match[0];
	  words.push(one_word(match));
	  sentence = sentence.substring(match.length);
	} else {
	  words.push(sentence.charAt(0));
	  sentence = sentence.substring(1);
	}
      }
    }
  }
  return words.join("");
}

function print_many_words(index_pmw)
{
  var text_pmw = many_words(document.getElementsByName('many_words_text')[0].value);

  var ans = "";
  while (text_pmw.length) {
    var unicode_chars = /&#[0-9]+;/;
    re = unicode_chars;
    var matche = re.exec(text_pmw);
    if (matche != null) {
      matche = matche[0];
      search = text_pmw.search(unicode_chars);
      ans += text_pmw.substring(0, search);
      ans += String.fromCharCode(matche.match(/[0-9]+/));
      text_pmw = text_pmw.substring(search + matche.length);
    } else {
      ans += text_pmw.substring(0);
      text_pmw = "";
    }
  }

  document.getElementsByName('converted_text')[0].value = ans;

}
