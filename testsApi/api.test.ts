// npx playwright test tests/apiRun.spec.js
import { test } from '@playwright/test';
import { APIClient } from '../api/apiClient';

const thisTask = 'My test task ts';


test.describe('API Tests', () => {
  let apiClient: APIClient;

  test.beforeEach(() => {
    apiClient = new APIClient();
  });

  test('should open API documentation', async ({ page }) => {
    await page.goto(process.env.BASEURL_API!);
    // Take a screenshot
    await page.screenshot({ path: 'screenshots/api-docs.png' });
  });


  // we create a task with name Task Number 2
  test(`'create task: ' ${thisTask}`, async () => {
    await apiClient.createNewTask(thisTask);
    console.log(await apiClient.getToken());
  });


  // we verify that the task exists based on the id
  test(`${thisTask}`, async () => {
    const id = await apiClient.getTaskByDescription(thisTask);
    const response = await apiClient.verifyTask(thisTask, id);
    console.log('this is the response: ', response);
  });

  test('Delete task number 2', async () => {
    const id = await apiClient.getTaskByDescription(thisTask);
    await apiClient.delete(id);
  });

});