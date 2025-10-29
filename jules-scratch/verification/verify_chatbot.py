
import os
from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Get the absolute path to the HTML file
        # This is necessary because the script is not in the same directory as the HTML file
        # The 'os.path.abspath' function gets the full path of the given file
        # 'os.path.join' combines directory names into a full path
        # 'os.path.dirname(__file__)' gets the directory where the current script is located
        html_file_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'index.html'))



        # Use a 'file://' URL to open the local HTML file
        # This is a standard way to load local files in a web browser
        page.goto(f'file://{html_file_path}')

        # Click the button to open the chatbot
        page.click('#open-chatbot')

        # Fill the input field with a question for the chatbot
        page.fill('#chatbot-input', 'How can I care for my feet?')

        # Click the 'Send' button to submit the question
        page.click('#chatbot-submit')

        # Wait for the chatbot to process the message and respond
        # This delay ensures that the bot's reply is visible before the screenshot is taken
        page.wait_for_timeout(1000)

        # Take a screenshot of the page and save it
        # The screenshot is saved in the 'verification' folder
        page.screenshot(path='jules-scratch/verification/verification.png')

        # Close the browser
        browser.close()

run()
