const puppeteer = require("puppeteer");
const path = require('path');

const browserOptions = {
    headless: true,
    ignoreHTTPSErrors: true,
    defaultViewport: null,
    devtools: false,
}
let browser;
let page;

beforeAll(async () => {
    browser = await puppeteer.launch(browserOptions);
    page = await browser.newPage();
    await page.goto('file://' + path.resolve('./index.html'));
}, 30000);

afterAll((done) => {
    try { this.puppeteer.close(); } catch (e) {} 
    done();
});

describe("UIB - Bootstrap Framework", () => {
    it("Index file should contain appropriate meta tags", async () => {
        try {
            const metaTags = await page.$$('meta');
            expect(metaTags.length).toBeGreaterThan(1);
        } catch (err) {
            throw err;
        }
    });
    it("Index file Should contain a title tag that is not empty", async () => {
        try {
            const title = await page.$eval('title', el => el.innerHTML);
            expect(title).not.toBe('');
        } catch (err) {
            throw err;
        }
    });
    it("Bootstrap CDN Should be present", async () => {
        try {
            const bootstrapCDN = await page.$eval('head', el => el.innerHTML);
            expect(bootstrapCDN).toContain('bootstrap');
        } catch (err) {
            throw err;
        }
    });
    it("Bootstrap Nav Component should be present on the page", async () => {
        try {
            const navComponent = await page.$eval('body', el => el.innerHTML);
            expect(navComponent).toContain('nav');
        } catch (err) {
            throw err;
        }
    });
    it("Page Should Contain 4 Columns", async () => {
        try {
            const columns = await page.$$('.col-md');
            expect(columns.length).toBe(3);
        } catch (err) {
            throw err;
        }
    });
    it("Page Should contain 4 Cards", async () => {
        try {
            const cards = await page.$$('.card');
            expect(cards.length).toBe(4);
        } catch (err) {
            throw err;
        }
    });
    it("Page Should contain a Footer section", async () => {
        try {
            const footer = await page.$eval('footer', el => el.innerHTML);
            expect(footer).not.toBe('');
            expect(footer).toBeTruthy();
        } catch (err) {
            throw err;
        }
    });
});