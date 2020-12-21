import checkTranslation from './checkTranslation'
describe('checkTranslation should', () => {
    test('return true when word and translation are identical', () => {
        const word = 'la cama'
        const translation = 'la cama'
        expect(checkTranslation(word, translation)).toEqual(true)
    })
    test('return true when word matches one of the possible translations', () => {
        const word = 'el perro'
        const translation = 'el perro / la perra'
        expect(checkTranslation(word, translation)).toEqual(true)
    })

    test('return false when word does not match either of the possible translations', () => {
        const word = 'la perro'
        const translation = 'el perro / la perra'
        expect(checkTranslation(word, translation)).toEqual(false)
    })

    test('return true when translation with special letters matches exactly', () => {
        const word = 'el pájaro'
        const translation = 'el pájaro'
        expect(checkTranslation(word, translation)).toEqual(true)
    })

    test('return false when special letters do not match', () => {
        const word = 'el pajaro'
        const translation = 'el pájaro'
        expect(checkTranslation(word, translation)).toEqual(false)
    })

    test('return true when ignoreSpecialLetters is true and only the special letters are mismatched', () => {
        const word = 'el pajaro'
        const translation = 'el pájaro'
        expect(checkTranslation(word, translation, true)).toEqual(true)
    })
})
