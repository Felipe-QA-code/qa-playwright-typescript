import { test,expect } from '@playwright/test';

test('POST create user', async ({ request }) => {

    const response = await request.post(
        'https://jsonplaceholder.typicode.com/users',
        {
            data: {
                name: 'Felipe QA',
                username: 'felipeqa',
                email: 'felipe@test.com'
            }
        }
    );

    expect(response.status()).toBe(201);

    const body = await response.json();

    console.log(body);

    expect(body.name).toBe('Felipe QA');
    expect(body.username).toBe('felipeqa');
    expect(body.email).toBe('felipe@test.com');

});