import { test, expect } from '@playwright/test';

test.describe('MoodTunes Demo Recording', () => {
  test('record comprehensive demo', async ({ page }) => {
    // Increase timeout for the whole test as we are doing a lot of steps
    test.setTimeout(60000);
    
    await page.goto('/');
    await expect(page).toHaveTitle(/MoodTunes/);

    // 1. Initial Search
    const searchInput = page.locator('input[placeholder*="Search"]');
    await searchInput.click();
    await page.keyboard.type('The Weeknd', { delay: 100 });
    await page.waitForTimeout(1000); // Show autocomplete
    await page.keyboard.press('Escape'); // Hide autocomplete
    await searchInput.press('Enter');
    
    await expect(page.locator('main')).toContainText(/The Weeknd/i);
    await page.waitForTimeout(2000);

    // 2. Favorite a song
    const firstSong = page.locator('button[aria-label*="favorite"]').first();
    await firstSong.click();
    await page.waitForTimeout(1500);

    // 3. Open Voiceflow Widget
    // We target the launcher button which is usually visible
    // Based on index.html, it's injected by Voiceflow
    const vfLauncher = page.locator('.vfrc-launcher').first();
    await vfLauncher.waitFor({ state: 'visible', timeout: 15000 });
    await vfLauncher.click();
    await page.waitForTimeout(1000);

    // 4. Interact with Voiceflow (Optional - just showing it is enough)
    // Wait for chat to be visible
    const vfChat = page.locator('.vfrc-chat').first();
    await vfChat.waitFor({ state: 'visible' });
    
    // We can try to send a message if possible, but just showing the window is a good start
    await page.waitForTimeout(3000);

    // 5. Toggle Dark Mode
    const slider = page.locator('.slider');
    await slider.click();
    await page.waitForTimeout(2000);
    
    // Toggle back
    await slider.click();
    await page.waitForTimeout(2000);

    // Final wait to ensure everything is captured
    await page.waitForTimeout(2000);
  });
});
