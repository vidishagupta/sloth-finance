import os
import time
from playwright.sync_api import sync_playwright

def capture_scenes():
    os.makedirs("demo/real_frames", exist_ok=True)
    chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
    
    with sync_playwright() as p:
        print("Launching Chrome...")
        browser = p.chromium.launch(executable_path=chrome_path, headless=True)
        page = browser.new_page(viewport={"width": 1920, "height": 1080}, device_scale_factor=1)
        
        print("1. Navigating to http://127.0.0.1:5173/ ...")
        page.goto("http://127.0.0.1:5173/", wait_until="networkidle")
        time.sleep(1)
        
        # SCENE 1: Hero
        print("Capturing Scene 1: Hero...")
        page.screenshot(path="demo/real_frames/scene1_hero.png")
        
        # SCENE 2: Scorecard
        print("2. Clicking 'The Forgetful Developer' sample...")
        page.locator(".sample-item-btn").first.click()
        page.wait_for_selector(".scorecard-container", timeout=6000)
        time.sleep(1.2)
        print("Capturing Scene 2: Scorecard & Gemma 2 Roast...")
        page.evaluate("window.scrollTo(0, 0)")
        time.sleep(0.5)
        page.screenshot(path="demo/real_frames/scene2_scorecard.png")
        
        # SCENE 3: Table
        print("3. Scrolling to Subscription Table...")
        page.evaluate("""
            const el = document.querySelector('.table-card');
            if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
        """)
        time.sleep(0.8)
        print("Capturing Scene 3: Subscription Table...")
        page.screenshot(path="demo/real_frames/scene3_table.png")
        
        # SCENE 4: 1-Click Letter Modal
        print("4. Opening 1-Click Cancellation Letter Modal...")
        page.locator(".btn-letter-action").first.click()
        page.wait_for_selector(".modal-card", timeout=4000)
        time.sleep(1)
        print("Capturing Scene 4: Cancellation Letter Modal...")
        page.screenshot(path="demo/real_frames/scene4_letter.png")
        
        # CLOSE MODAL
        print("5. Closing Letter Modal via close button...")
        page.locator(".modal-close-btn").click()
        page.wait_for_selector(".modal-backdrop", state="detached", timeout=3000)
        time.sleep(0.5)
        
        # SCENE 5: Forecast Chart
        print("6. Scrolling to Predictive Forecast Chart...")
        page.evaluate("""
            const el = document.querySelector('.forecast-card');
            if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
        """)
        time.sleep(1)
        print("Capturing Scene 5: Predictive Cash Bleed Forecast Chart...")
        page.screenshot(path="demo/real_frames/scene5_forecast.png")
        
        # SCENE 6: Architecture Modal
        print("7. Opening Privacy & Architecture Modal...")
        page.evaluate("window.scrollTo(0, 0)")
        time.sleep(0.5)
        page.locator('.nav-btn:has-text("Privacy & Architecture")').click()
        page.wait_for_selector(".modal-card", timeout=4000)
        time.sleep(1)
        print("Capturing Scene 6: Zero-Knowledge Privacy Architecture Modal...")
        page.screenshot(path="demo/real_frames/scene6_privacy.png")
        
        browser.close()
        print("ALL 6 REAL SCENES CAPTURED SUCCESSFULLY!")

if __name__ == "__main__":
    capture_scenes()
