

export function analyzeText(txt) {

    let doc = nlp(txt)
    // let titles = doc.titles().out('array')
    let titles = doc.artist().out('array')
    // let people = doc.people().out('array')
    let people = doc.title().out('array')

    res.json({ titles, people })
}