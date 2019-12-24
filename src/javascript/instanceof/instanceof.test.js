import { objectInstance } from './instanceof'

describe('instanceof', () => {
  test('if an instance is generate by new, return true', () => {
     function Person() {
       this.name = 'revan'
     }
     var person = new Person()
     expect(objectInstance(person, Person)).toBe(person instanceof Person)
  })

  test('if an instance is not generate by new, return false', () => {
    function Person() {
      this.name = 'revan'
    }
    var person = function() {
      return 'hello'
    }
    expect(objectInstance(person, Person)).toBe(person instanceof Person)
 })
})