import os
from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()
    page.goto(f"file://{os.getcwd()}/index.html")

    # Check for date and time display
    expect(page.locator("#datetime-container")).to_be_visible()

    # Open the chatbot
    page.click("#open-chatbot")
    expect(page.locator("#chatbot-container")).to_be_visible()

    # Interact with the chatbot
    page.fill("#chatbot-input", "hello")
    page.click("#chatbot-submit")
    expect(page.locator("text=Bot: Hello! How can I help you today?")).to_be_visible()

    page.screenshot(path="jules-scratch/verification/verification.png")
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
