








import natural from 'natural'
const tokenizer = new natural.WordTokenizer();

export function extractName(title) {
    console.log("title:", title);

    // Remove all characters that are not letters or numbers and content within brackets
    let tokens = tokenizer.tokenize(title);
    title = title.replace(/[\(\)\[\]{}]/g, ''); // Remove brackets
    // title = title.replace(/[^a-zA-Z0-9\s-]/g, ''); // Remove non-alphanumeric characters except spaces and dashes

    console.log("title:", title)
    console.log("tokens:", tokens)

    // Common patterns in YouTube titles
    let songName;
    let artist;

    // Check for '-' delimiter for 'Artist - Song' pattern
    const dashIndex = tokens.indexOf('-');
    console.log("dashIndex:", dashIndex)
    if (dashIndex !== -1) {
        // Assume the song name is after the '-'
        artist = tokens.slice(0, dashIndex).join(' ');
        songName = tokens.slice(dashIndex + 1).join(' ');
    } else {
        // If no '-' found, return the first token as a simple heuristic
        songName = tokens[0];
    }

    // Further processing to clean up song name
    songName = songName.replace(/(official|video|lyrics|hd|hq)/gi, '').trim();

    console.log("songName:", songName)
    console.log("artist:", artist)
    return { artist, songName };
}