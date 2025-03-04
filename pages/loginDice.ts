import { Page, Locator } from "@playwright/test";
export class LoginDice {
  readonly loginInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  constructor(private page: Page) {
    this.loginInput = page.locator("input[name='username']");
  }

  async navigate(){
    await this.page.goto(process.env.DICE_URL + "/employers/login");
  }

  async login(username: string, password: string) {
    await this.page.fill("input[name='username']", username);
    await this.page.fill("input[name='password']", password);
    await this.page.click("button[type='submit']");
  }
}


