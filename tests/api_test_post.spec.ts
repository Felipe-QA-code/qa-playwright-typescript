import { test, expect } from '@playwright/test'

test (' POST user', async ({request})=>{

    const response = await request.post('https://jsonplaceholder.typicode.com/users',
        {
            data:{
                name:'felipe',
                username:'felipeqa',
                email:'felipe@test.com'
            }
        }
    )
    expect (response.status()).toBe(201)
    const body = await response.json()
    console.log(body)
    console.log(typeof body.email)

    expect (body.name).toBe('felipe')
    expect (body.username).toBe('felipeqa')
    expect (body.email).toBe('felipe@test.com')
    expect(body.id).toBeDefined()
    expect(body.id).toEqual(expect.any(Number))
    
})