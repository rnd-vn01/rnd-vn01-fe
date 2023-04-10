import { waitFor } from '@testing-library/react';
import puppeteer from 'puppeteer';
import { mockGetItems } from 'src/api/mocks/items/mockGetItems';
let browser = null;
let page = null;

jest.setTimeout(60000);

describe.skip("Trial", () => {
  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
    await page.setViewport({
      width: 1280,
      height: 720
    });
  })

  afterAll(async () => {
    await browser.close();
  })

  beforeEach(async () => {
    await page.goto('http://localhost:3000');
  })

  it("test go to page", async () => {
    await page.waitForTimeout(4000);

    // Close landing page
    const landingModal = await page.$('.home-page__landing')
    await landingModal.click();

    const selector = '.model-interaction-control__zoom--box';
    const input = await page.$(selector);
    await input.click();
    await input.click();
    await input.click();

    await page.waitForTimeout(3000);
  })
})
