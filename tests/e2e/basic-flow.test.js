import { test, expect } from '@playwright/test';

test.describe('MoodTunes Basic Flow', () => {
  test('should load the home page and perform a search', async ({ page }) => {
    await page.goto('/');
    
    // Check title
    await expect(page).toHaveTitle(/MoodTunes/);
    
    // Search for a song
    const searchInput = page.locator('input[placeholder*="Search"]');
    await searchInput.fill('Coldplay');
    await searchInput.press('Enter');
    
    // Check results
    const songList = page.locator('main');
    await expect(songList).toContainText(/Coldplay/i);
    
    // Capture screenshot for README
    await page.screenshot({ path: 'e2e-screenshots/search-results.png', fullPage: true });
  });

  test('should toggle favorites', async ({ page }) => {
    await page.goto('/');
    
    // Search for a song to ensure we have results
    const searchInput = page.locator('input[placeholder*="Search"]');
    await searchInput.fill('Imagine Dragons');
    await searchInput.press('Enter');
    
    // Find the first "Add to Favorites" button (using a more specific selector if possible)
    // Based on SongsList.jsx usually it might be an icon or button
    const favoriteButton = page.locator('button[aria-label*="favorite"]').first();
    await favoriteButton.click();
    
    // Check if it's in Favorites list
    const favoritesList = page.locator('aside'); // Favorites is usually a sidebar/aside
    await expect(favoritesList).toContainText(/Imagine Dragons/i);
    
    // Capture screenshot of favorites
    await page.screenshot({ path: 'e2e-screenshots/favorites-usage.png', fullPage: true });
  });
});
