const puppeteer = require("puppeteer");
const expect = require("chai").expect;

describe("UI Tests for the Login Page", () => {
  let browser;
  let page;

  before(async function () {
    this.timeout(10000); // Extends timeout for starting the browser
    browser = await puppeteer.launch({
      headless: "new", // Opt-in to the new headless mode
      // If you need to see the test running, set headless to false
    });
    page = await browser.newPage();
  });

  after(async () => {
    await browser.close();
  });

  it("should display an error message for weak passwords", async function () {
    this.timeout(10000); // Extends timeout for the test case
    await page.goto("http://localhost:3000", {
      waitUntil: "networkidle0", // Waits until the network is idle
    });
    await page.type("#password", "weak");
    await page.click('button[type="submit"]');
    await page.waitForSelector("#error-message", { visible: true });
    const errorMessage = await page.$eval(
      "#error-message",
      (el) => el.textContent
    );
    expect(errorMessage).to.include("Login failed");
  });

  // Add more test cases as needed...
});
