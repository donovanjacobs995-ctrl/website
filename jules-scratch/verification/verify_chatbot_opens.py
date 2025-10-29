import os
from playwright.sync_api import sync_playwright, expect

def run_verification():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Get the absolute path to the index.html file
        current_dir = os.getcwd()
        file_path = f'file://{os.path.join(current_dir, "index.html")}'

        page.goto(file_path)

        # Click the "Explore the Future" button
        explore_button = page.locator("#explore-future-btn")
        explore_button.click()

        # Check if the chatbot container is visible
        chatbot_container = page.locator("#chatbot-container")
        expect(chatbot_container).to_be_visible()

        # Take a screenshot
        page.screenshot(path="jules-scratch/verification/verification.png")

        browser.close()

if __name__ == "__main__":
    run_verification()
