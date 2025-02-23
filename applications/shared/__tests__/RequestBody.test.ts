import { RequestBody } from '../request/body'

describe('RequestBody', () => {
  let formData: FormData
  let requestBody: RequestBody

  beforeEach(() => {
    formData = new FormData();
    formData.append('key1', 'value1')
    formData.append('key2', 'value2')
    requestBody = new RequestBody(formData)
  })

  test('should create an instance of RequestBody', () => {
    expect(requestBody).toBeInstanceOf(RequestBody)
  })

  test('should set data correctly', () => {
    expect(requestBody.object).toEqual({
      key1: 'value1',
      key2: 'value2'
    })
  })

  test('should insert key/value pair correctly', () => {
    requestBody.insert('key3', 'value3');
    expect(requestBody.object).toEqual({
      key1: 'value1',
      key2: 'value2',
      key3: 'value3'
    })
  })

  test('should return JSON string representation of the object', () => {
    const jsonData = requestBody.data()
    expect(jsonData).toBe(JSON.stringify({
      key1: 'value1',
      key2: 'value2'
    }))
  })
})