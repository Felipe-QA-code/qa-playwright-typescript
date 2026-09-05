import { test, expect } from '@playwright/test'

test ('Execute a POST method for user', async ({request})=>{

    // Test Data
    const nameParameter = 'felipe'
    const userNameParameter = 'felipeqa'
    const emailParameter = 'felipe@test.com'

    // Execute POST method
    const response = await request.post('https://jsonplaceholder.typicode.com/users',
        {
            data:{
                name:nameParameter,
                username:userNameParameter,
                email:emailParameter
            }
        }
    )

    // Response status code validation
    expect (response.status()).toBe(201)

    // Response body validation
    const body = await response.json()
    console.log(body)
    console.log(typeof body.email)

    // Response body attributes validation
    expect (body.name).toBe(nameParameter)
    expect (body.username).toBe(userNameParameter)
    expect (body.email).toBe(emailParameter)
    expect(body.id).toBeDefined()
    expect(body.id).toEqual(expect.any(Number))    
})
