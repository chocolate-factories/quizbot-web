import checkTranslation from './checkTranslation'
describe('checkTranslation should', () => {
test('return true when word and translation are identical', () => {
    let word = "la cama"
    let translation = "la cama"
    expect(checkTranslation(word, translation)).toEqual(true)
  })
test('return true when word matches one of the possible translations', () => {
    let word = "el perro"
    let translation = "el perro / la perra"
    expect(checkTranslation(word, translation)).toEqual(true)
  })

test('return false when word does not match either of the possible translations', () => {
    let word = "la perro"
    let translation = "el perro / la perra"
    expect(checkTranslation(word, translation)).toEqual(false)
  })

test('return true when translation with special letters matches exactly', () => {
    let word = "el pájaro"
    let translation = "el pájaro"
    expect(checkTranslation(word, translation)).toEqual(true)
  })

test('return false when special letters do not match', () => {
    let word = "el pajaro"
    let translation = "el pájaro"
    expect(checkTranslation(word, translation)).toEqual(false)
  })

test('return true when ignoreSpecialLetters is true and only the special letters are mismatched', () => {
    let word = "el pajaro"
    let translation = "el pájaro"
    expect(checkTranslation(word, translation, true)).toEqual(true)
  })
})