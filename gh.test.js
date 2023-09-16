let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  });

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector("h1");
    const title2 = await page.title();
    expect(title2).toEqual("GitHub: Let’s build from here · GitHub");
  }, 7000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  }, 7000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toMatch("Get started with Team");
  }, 7000);
});

describe("Add new tests", () => {
  //Новые тесты к Задаче 2

  test("Tab Marketplace", async () => {
    //Пишем тесты через асинхронную функцию
    await page.goto("https://github.com/marketplace"); //await page.goto = переход на страницу https://github.com/marketplace
    const title = await page.title(); //ждем загрузку заголовка страницы
    expect(title).toContain(
      "GitHub Marketplace · to improve your workflow · GitHub"
    ); //expect(title) = Проверяем заголовок .toContain = должен содержать в себе текст "Find tools to improve your workflow"
  }, 60000); //таймаут

  test("Actions page header", async () => {
    await page.goto("https://github.com/features/actions");
    const pageHeader = await page.$("h1");
    const elementText = await pageHeader.evaluate((el) => el.textContent);
    expect(elementText).toMatch(
      "Search code, repositories, users, issues, pull requests"
    );
  }, 60000);

  test("Pricing page", async () => {
    await page.goto("https://github.com/pricing");
    const pageTitle = await page.title();
    expect(pageTitle).toEqual("Pricing · Plans for every developer · GitHub");
  }, 60000);
});
