import generateWordList from './generateWordList'

describe('generateWordList should', () => {
test('generate the requested number of words', () => {
      let numberOfWords = 10
      expect(generateWordList(numberOfWords).length).toEqual(numberOfWords)
  })

test('contain no duplicates', () => {
    let numberOfWords = 100
    let wordList = generateWordList(numberOfWords)
    let dedupedWordList = Array.from(new Set(wordList))
    expect(dedupedWordList.length).toEqual(wordList.length)
  })
  
test('generate only from specified categories', () => {
    let numberOfWords = 10
    let wordList = generateWordList(numberOfWords, ['animals'])
    expect(wordList.every(word => word.categoryId === 'animals')).toEqual(true)
  })

test('not generate more words than vocabulary contains', () => {
    let numberOfWords = 35
    let wordList = generateWordList(numberOfWords, ['animals'])
    expect(wordList.every(word => word.categoryId === 'animals')).toEqual(true)
    expect(wordList.length).toEqual(32)
  })
test('not generate forbidden words', () => {
    let numberOfWords = 32
    let forbiddenWords = generateWordList(numberOfWords, ['animals'])
    numberOfWords = 100
    let words = generateWordList(numberOfWords, [], forbiddenWords)
    console.log(words)
    expect(words.some(word => word.categoryId === 'animals')).toEqual(false)
  })
})