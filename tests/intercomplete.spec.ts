import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

  test('A/B Testing', async ({ page }) => {
    // testeando a/b 
    await page.goto('https://the-internet.herokuapp.com/');
    await page.getByRole('link', {name:'A/B Testing'}).click();
    await expect(page.locator('h3')).toBeVisible();
    await expect(page.locator('h3')).toContainText('A/B Test');
  });

  test('Add/Reemove Elments', async ({ page }) => {
    // testeando Add/Reemove Elments
    await page.goto('https://the-internet.herokuapp.com/');
    // Using locator.waitFor()
    const myElement = page.getByRole('link', {name: 'Add/Remove Elements'});
    await myElement.waitFor({ state: 'visible', timeout: 5000 }); // waits up to 5s
    await myElement.click();
    await expect(page.locator('h3')).toBeVisible();
    await expect(page.locator('h3')).toContainText('Add/Remove');
    // Agregar una vez
    await page.getByText('Add Element').click();
    const deleteButton = page.getByRole('button', {name : 'Delete'});
    await expect(deleteButton).toHaveCount(1);
    // remover
    await deleteButton.click();
    await expect(deleteButton).toHaveCount(0);
    // tres veces click
    await page.getByText('Add Element').click();
    await page.getByText('Add Element').click();
    await page.getByText('Add Element').click();
    await expect(deleteButton).toHaveCount(3);
  });

  test('Basic', async ({ page }) => {
     // testeando basic auth
     await page.goto('https://admin:admin@the-internet.herokuapp.com/basic_auth');
     await expect(page.locator('h3')).toContainText('Basic');
  });

  test('Challenging DOM', async ({ page }) => {
    // testeando Challenging DOM
    await page.goto('https://the-internet.herokuapp.com/');
    await page.getByRole('link', {name:'Challenging DOM'}).click();
    await expect(page.locator('.button')).toHaveCount(3);
    await page.locator('.button').nth(0).click();
    await page.locator('.button').nth(1).click();
    await page.locator('.button').nth(2).click();
  });

  test('Checkboxes', async ({ page }) => {
   // testeando Checkboxes
   await page.goto('https://the-internet.herokuapp.com/');
   await page.getByRole('link', {name: 'Checkboxes'}).click();
   await expect(page.locator('h3')).toContainText('Checkboxes');
   await page.getByRole("checkbox").nth(0).check();
   await page.getByRole("checkbox").nth(0).uncheck();
   await page.getByRole("checkbox").nth(1).check();
   await page.getByRole("checkbox").nth(1).uncheck();
});

  test('Contex menu', async ({ page }) => {
  // testear contex menu
  await page.goto('https://the-internet.herokuapp.com/context_menu');
  // Escuchar el alert
    page.once('dialog', async dialog => {
    // Validar texto del alert
    expect(dialog.message()).toBe('You selected a context menu');
    // Aceptar alert
    await dialog.accept();
  });
  // Localizar el cuadro
  const box = page.locator('#hot-spot');
  await box.isVisible();
  // Click derecho
  await box.click({ button: 'right' }); 
});

  test('Digest Authentication', async ({ page }) => { 
   await page.goto('https://admin:admin@the-internet.herokuapp.com/digest_auth');
   await expect(page.locator('h3')).toBeVisible();
   await expect(page.locator('h3')).toContainText('Digest');
 });

 test('Disappearing Elements', async ({ page }) => {
   await page.goto('https://the-internet.herokuapp.com/');
   await page.getByRole('link', {name : 'Disappearing Elements'}).click();
   await expect(page.locator('h3')).toContainText('Disappearing Elements');
   const butonhome = page.getByRole('link', { name : 'Home'});
   const butonabout = page.getByRole('link', {name: 'About'});
   const butoncontact = page.getByRole('link', { name : 'Contact Us'});
   const butonportfolio = page.getByRole('link', { name : 'Portfolio'});
   await expect(butonhome).toBeVisible();
   await expect(butonabout).toBeVisible();
   await expect(butoncontact).toBeVisible();
   await expect(butonportfolio).toBeVisible();
   await butonabout.click();
   await expect(page.locator('h1')).toContainText('Not Found');
   await page.goto('https://the-internet.herokuapp.com/disappearing_elements');
   await butoncontact.click();
   await expect(page.locator('h1')).toContainText('Not Found');
   await page.goto('https://the-internet.herokuapp.com/disappearing_elements');
   await butonportfolio.click();
   await expect(page.locator('h1')).toContainText('Not Found');
   await page.goto('https://the-internet.herokuapp.com/disappearing_elements');
   await butonhome.click();
   await page.goto('https://the-internet.herokuapp.com/');
 });

 test('Drag and Drop', async ({ page }) => {
   await page.goto('https://the-internet.herokuapp.com/');
   await page.getByRole('link', {name : 'Drag and Drop'}).click();
   await expect(page.locator('h3')).toContainText('Drag and Drop');
   await expect(page.locator('.column')).toHaveCount(2);
   const coa = page.locator('#column-a');
   const cob = page.locator('#column-b');
   await coa.dragTo(cob);
   await expect(page.locator('#column-a')).toHaveText('B');
   await expect(page.locator('#column-b')).toHaveText('A');
   await cob.dragTo(coa);
   await expect(page.locator('#column-a')).toHaveText('A');
   await expect(page.locator('#column-b')).toHaveText('B');
 });
 
 test ('Dropdown', async ({ page}) => {
   await page.goto('https://the-internet.herokuapp.com/');
   await page.getByRole('link', { name : 'Dropdown'}).click();
   await expect(page.locator('h3')).toBeVisible();
   await expect(page.locator('#dropdown')).toBeVisible();
   await page.selectOption('#dropdown', '1'); 
   await page.selectOption('#dropdown', '2');

 });
test('File Downloader', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/');
  await page.locator('a[href="/download"]').click();

  await expect(page).toHaveURL('https://the-internet.herokuapp.com/download');
  await expect(page.locator('h3')).toContainText('File Downloader');

  // Esperar el evento ANTES del click
  const downloadPromise = page.waitForEvent('download');
  await page.getByText('LambdaTest.txt').click();
  const download = await downloadPromise;

  // ✅ Validaciones reales del archivo
  const fileName = download.suggestedFilename();
  //const fileName = "mi archivo";

  expect(fileName).toBe('LambdaTest.txt');   
  
  expect(download.url()).toContain('LambdaTest.txt');        // URL correcta

  // Guardar y verificar que existe en disco
  const savePath = path.join(__dirname, 'downloads', fileName);
  await download.saveAs(savePath);
  expect(fs.existsSync(savePath)).toBeTruthy();         // existe en disco

  console.log(`✅ Archivo descargado: ${fileName}`);
});
