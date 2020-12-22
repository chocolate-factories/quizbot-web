import generateWordList from './generateWordList'

describe('generateWordList should', () => {
  test('generate the requested number of words', () => {
    const numberOfWords = 10
    expect(generateWordList(numberOfWords).length).toEqual(numberOfWords)
  })

  test('contain no duplicates', () => {
    const numberOfWords = 100
    const wordList = generateWordList(numberOfWords)
    const dedupedWordList = Array.from(new Set(wordList))
    expect(dedupedWordList.length).toEqual(wordList.length)
  })

  test('generate only from specified categories', () => {
    const numberOfWords = 10
    const wordList = generateWordList(numberOfWords, ['animals'])
    expect(wordList.every((word) => word.categoryId === 'animals')).toEqual(true)
  })

  test('not generate more words than vocabulary contains', () => {
    const numberOfWords = 35
    const wordList = generateWordList(numberOfWords, ['animals'])
    expect(wordList.every((word) => word.categoryId === 'animals')).toEqual(true)
    expect(wordList.length).toEqual(32)
  })
  test('not generate forbidden words', () => {
    let numberOfWords = 32
    const forbiddenWords = generateWordList(numberOfWords, ['animals'])
    numberOfWords = 100
    const words = generateWordList(numberOfWords, [], forbiddenWords)
    console.log(words)
    expect(words.some((word) => word.categoryId === 'animals')).toEqual(false)
  })
})
