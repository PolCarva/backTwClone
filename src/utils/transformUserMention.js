const transformUserMention = (mention, text) => {
	const transformedUserMentions = [];
	const newText = [];

	for (let i = 0; i < mention.length; i++) {
		transformedUserMentions.push((mention[i].replace('[', '').replace(']', '').replace(/\([^)]*\)/g, '').replace('(', '').replace(')', '')));
	}

	const words = text.split(/\s+/);

	for (let i = 0; i < words.length; i++) {
		if (words[i].includes('@')) {
			let replacedWord = words[i].replace(/@\[[^\]]+\]\([^)]+\)/g, function() {
				return transformedUserMentions.shift();
			});
			newText.push(replacedWord);
		} else {
			newText.push(words[i]);
		}
	}

	return newText.join(' ');
};

module.exports = transformUserMention;