import { test, expect } from '@playwright/test';

test('Verify API GET request status code', async ({ request }) => {
  // Send a GET request to the target API endpoint
  const response = await request.get('https://jsonplaceholder.typicode.com/users');

  // Verify that the response status code is 200 (OK)
  expect(response.status()).toBe(200);

  // Optional: Verify that the response status text is successful
  expect(response.ok()).toBeTruthy();

  // Parse the JSON response body
  const body = await response.json();

  // Verify the 'name' attribute exists and is not undefined
  expect(body[0].name).toBeDefined();
  
  // Optional: Verify the 'name' attribute is a non-empty string
  expect(typeof body[0].name).toBe('string');
  expect(body[0].name.length).toBeGreaterThan(0);
});
