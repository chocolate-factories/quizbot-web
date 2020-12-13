import getTranslation from './getTranslation'
describe('getTranslation should', () => {
test('find a translation EN -> ES', () => {
    let english = "bed"
    let spanish = "la cama"
    expect(getTranslation(english, "EN", "ES")).toEqual(spanish)
  })
test('find a translation ES -> EN', () => {
    let english = "bed"
    let spanish = "la cama"
    expect(getTranslation(spanish, "ES", "EN")).toEqual(english)
  })

test('return empty string if no translation found', () => {
    let english = "bad"
    expect(getTranslation(english, "EN", "ES")).toEqual('')
  })
})