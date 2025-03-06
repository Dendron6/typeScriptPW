// npx playwright test tests/apiRun.spec.js
import { test } from '@playwright/test';
import { APIClient } from '../api/apiClient';

const thisTask = 'First task';
const thisTask2 = 'Second task';

interface Task {
    description: string;
    status: string;
    created_by: string;
    id: number;
}


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
    const id = await apiClient.getTasks;
    console.log(`this is ${thisTask} `, id);
  });
  
  test(`'create task: ' ${thisTask2}`, async () => {
    await apiClient.createNewTask(thisTask2);
    const id = apiClient.getTasks;
    console.log(`this is ${thisTask} `, id);
   
  });


  test('Delete task number 2', async () => {
    const listOfTasks:string[] = [thisTask, thisTask2];
    for (const task of listOfTasks) {
        const id = await apiClient.getTaskByDescription(task);
        await apiClient.delete(id.toString());
    }
  });

});