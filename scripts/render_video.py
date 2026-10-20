import os
import subprocess
from PIL import Image, ImageDraw, ImageFont

def create_frames():
    os.makedirs("demo/frames", exist_ok=True)
    width, height = 1920, 1080
    bg_dark = (10, 19, 17)
    color_gold = (245, 183, 38)
    color_sage = (61, 95, 88)
    color_coral = (233, 123, 119)
    color_green = (52, 211, 153)
    text_white = (247, 247, 242)
    text_muted = (114, 138, 132)

    # Try standard system fonts or default
    try:
        font_title = ImageFont.truetype("arialbd.ttf", 64)
        font_sub = ImageFont.truetype("arial.ttf", 36)
        font_body = ImageFont.truetype("arial.ttf", 28)
        font_chip = ImageFont.truetype("arialbd.ttf", 24)
        font_huge = ImageFont.truetype("arialbd.ttf", 96)
    except Exception:
        font_title = ImageFont.load_default()
        font_sub = ImageFont.load_default()
        font_body = ImageFont.load_default()
        font_chip = ImageFont.load_default()
        font_huge = ImageFont.load_default()

    # Helper to draw glass card
    def draw_card(draw, box, fill_color=(20, 37, 33), border_color=(139, 178, 222)):
        draw.rounded_rectangle(box, radius=20, fill=fill_color, outline=border_color, width=2)

    # FRAME 1: Hero & Introduction
    img1 = Image.new("RGB", (width, height), bg_dark)
    d1 = ImageDraw.Draw(img1)
    # Header bar
    draw_card(d1, (100, 50, 1820, 130), fill_color=(15, 28, 25))
    d1.text((140, 70), "🦥 SlothFinance", font=font_title, fill=text_white)
    d1.text((1350, 75), "Hacktoberfest Week 3: Slow & Steady", font=font_chip, fill=color_gold)

    # Hero Center Box
    draw_card(d1, (100, 180, 1820, 980))
    d1.text((160, 260), "Too lazy to audit bank statements?", font=font_huge, fill=text_white)
    d1.text((160, 390), "Let an open-source sloth do it.", font=font_huge, fill=color_gold)
    d1.text((160, 530), "Rewarding financial inertia with TabPFN tabular anomaly detection & Google Gemma 2.", font=font_sub, fill=text_muted)
    
    # Feature Pills
    pills = [
        ("🔬 TabPFN-3.5 Foundation Model", color_gold),
        ("🦥 Google Gemma 2 Agent", color_sage),
        ("🛡️ 100% On-Device Financial Privacy", color_green),
        ("⚡ 1-Click FTC Click-to-Cancel Letters", color_coral)
    ]
    px = 160
    for text, color in pills:
        draw_card(d1, (px, 660, px + 360, 750), fill_color=(15, 28, 25), border_color=color)
        d1.text((px + 20, 690), text, font=font_chip, fill=text_white)
        px += 390

    d1.text((160, 850), "Average person loses $1,500/year to forgotten subscriptions. SlothFinance automates cancellation.", font=font_body, fill=text_white)
    img1.save("demo/frames/frame1.png")

    # FRAME 2: TabPFN Zero-Shot Anomaly Detection
    img2 = Image.new("RGB", (width, height), bg_dark)
    d2 = ImageDraw.Draw(img2)
    draw_card(d2, (100, 50, 1820, 130), fill_color=(15, 28, 25))
    d2.text((140, 70), "🔬 Prior Labs TabPFN-3.5 Zero-Shot Tabular Engine", font=font_title, fill=color_gold)

    draw_card(d2, (100, 180, 950, 980))
    d2.text((140, 230), "Raw Bank Statement Stream", font=font_title, fill=text_white)
    d2.text((140, 310), "Uploading messy transactions CSV...", font=font_sub, fill=text_muted)
    
    sample_txs = [
        "2026-07-02   Netflix Subscription             $15.49",
        "2026-07-10   Planet Fitness Gym Pass          $24.99",
        "2026-07-25   Adobe Creative Cloud Suite       $54.99",
        "2026-08-02   Netflix (Stealth Price Creep!)   $17.99 (+16%)",
        "2026-08-15   Grammarly Annual Pro-rated       $30.00",
        "2026-08-28   NYT Digital Promo Expired        $17.00 (+325%)"
    ]
    ty = 390
    for tx in sample_txs:
        draw_card(d2, (140, ty, 910, ty + 70), fill_color=(12, 22, 20))
        d2.text((160, ty + 18), tx, font=font_body, fill=color_coral if "Creep" in tx or "Expired" in tx else text_white)
        ty += 90

    # Right Box: TabPFN Analysis
    draw_card(d2, (1000, 180, 1820, 980))
    d2.text((1040, 230), "TabPFN Anomaly Discoveries", font=font_title, fill=color_gold)
    d2.text((1040, 320), "• Detected Cadence: Monthly (30-day interval)", font=font_sub, fill=text_white)
    d2.text((1040, 390), "• Stealth Price Hikes: +$34.00 silent creep caught", font=font_sub, fill=color_coral)
    d2.text((1040, 460), "• Zombie Subscriptions Flagged: 6 services", font=font_sub, fill=color_gold)
    d2.text((1040, 530), "• Monthly Recurring Bleed: $268.85 / month", font=font_sub, fill=color_coral)
    d2.text((1040, 600), "• TabPFN Foundation Model Confidence: 96%", font=font_sub, fill=color_green)
    d2.text((1040, 720), "Zero manual tagging. Zero model training. Zero cloud leakage.", font=font_title, fill=text_white)
    img2.save("demo/frames/frame2.png")

    # FRAME 3: Sloth Scorecard & Gemma 2 Roast
    img3 = Image.new("RGB", (width, height), bg_dark)
    d3 = ImageDraw.Draw(img3)
    draw_card(d3, (100, 50, 1820, 130), fill_color=(15, 28, 25))
    d3.text((140, 70), "🦥 The Sloth Financial Scorecard & Gemma 2 Roast", font=font_title, fill=text_white)

    # Meter Box
    draw_card(d3, (100, 180, 680, 980))
    d3.text((140, 240), "Sloth Laziness Index", font=font_title, fill=text_white)
    d3.text((250, 380), "72", font=font_huge, fill=color_coral)
    d3.text((380, 420), "/ 100", font=font_title, fill=text_muted)
    d3.text((160, 520), "Heavy Sloth Mode", font=font_title, fill=color_coral)
    d3.text((140, 600), "Monthly Bleed: $268.85/mo", font=font_sub, fill=text_white)
    d3.text((140, 670), "Annual Savings: $3,226.20/yr", font=font_sub, fill=color_green)
    d3.text((140, 740), "Stealth Creep: +$34.00/mo", font=font_sub, fill=color_gold)

    # Gemma Roast Box
    draw_card(d3, (730, 180, 1820, 980))
    d3.text((770, 230), "Google Gemma 2: Sloth Auditor Roast", font=font_title, fill=color_gold)
    roast_lines = [
        "\"Congratulations! You are operating at Sloth Level 72/100.\"",
        "You are leaking $268.85 every single month purely because opening a browser tab,",
        "finding your password, and clicking 'Cancel' feels like climbing Mount Everest.",
        "",
        "🛋️ The Couch Potato Payoff:",
        "Cancelling these 6 zombie fees right now reclaims $3,226 in free money this year:",
        "• 148 cups of premium cold brew coffee you didn't have to brew.",
        "• 11 full days of guilt-free lounging on the sofa.",
        "• 1 complete vacation funded purely by doing LESS.",
        "",
        "⚡ 3-Step Action: Click 1-Click Cancel below and resume napping."
    ]
    ry = 320
    for line in roast_lines:
        d3.text((770, ry), line, font=font_sub if line.startswith("\"") or line.startswith("🛋️") else font_body, fill=color_gold if line.startswith("•") else text_white)
        ry += 52
    img3.save("demo/frames/frame3.png")

    # FRAME 4: 1-Click Cancellation & Legal Letters
    img4 = Image.new("RGB", (width, height), bg_dark)
    d4 = ImageDraw.Draw(img4)
    draw_card(d4, (100, 50, 1820, 130), fill_color=(15, 28, 25))
    d4.text((140, 70), "⚡ 1-Click Legal Cancellation & Dispute Letters (Gemma 2)", font=font_title, fill=color_gold)

    draw_card(d4, (100, 180, 1820, 980))
    d4.text((150, 230), "RE: Immediate Subscription Termination & Billing Revocation", font=font_title, fill=text_white)
    d4.text((150, 310), "Service: Netflix / Planet Fitness / Adobe | Account: ACCT-99482", font=font_sub, fill=text_muted)

    letter_text = [
        "In accordance with consumer rights under the FTC Negative Option / 'Click-to-Cancel' regulations",
        "and California Automatic Renewal Law (CA AB 390 / Bus. & Prof. Code § 17600 et seq.):",
        "",
        "1. Immediately cease all recurring billing and automatic debits to any payment method on file.",
        "2. Remove and revoke any saved payment authorizations associated with this profile.",
        "3. Transmit written confirmation of cancellation and zero-balance status within 2 business days.",
        "",
        "⚠️ Stealth Rate-Hike Dispute:",
        "Furthermore, records indicate an unnotified price increase (+16%) without affirmative consent.",
        "I hereby request a credit for all unauthorized amounts billed above the baseline agreement.",
        "",
        "[ Copy Letter ]      [ Open in Mail (mailto) ]      [ Download .txt ]      🎉 Confetti Sent!"
    ]
    ly = 380
    for l in letter_text:
        d4.text((150, ly), l, font=font_title if l.startswith("In accordance") or l.startswith("⚠️") or l.startswith("[") else font_body, fill=color_gold if l.startswith("[") else (color_coral if l.startswith("⚠️") else text_white))
        ly += 48
    img4.save("demo/frames/frame4.png")

    # FRAME 5: 3-Year Predictive Cash Bleed & Privacy
    img5 = Image.new("RGB", (width, height), bg_dark)
    d5 = ImageDraw.Draw(img5)
    draw_card(d5, (100, 50, 1820, 130), fill_color=(15, 28, 25))
    d5.text((140, 70), "📈 TabPFN 3-Year Predictive Cash Bleed vs. Sloth Savings", font=font_title, fill=text_white)

    draw_card(d5, (100, 180, 1100, 980))
    d5.text((140, 230), "Cumulative Inertia Cost Trajectory", font=font_title, fill=text_white)
    
    chart_milestones = [
        ("Month 1", "$268.85 Bleed", "$0.00 with SlothFinance"),
        ("Month 6", "$1,613.10 Bleed", "$1,613 Saved!"),
        ("Year 1", "$3,226.20 Bleed", "$3,226 Saved!"),
        ("Year 2", "$6,452.40 Bleed", "$6,452 Saved!"),
        ("Year 3", "$9,678.60 Bleed", "$9,678 Saved! 🎉")
    ]
    cy = 320
    for m, b, s in chart_milestones:
        draw_card(d5, (140, cy, 1050, cy + 90), fill_color=(14, 25, 22))
        d5.text((170, cy + 25), m, font=font_title, fill=text_white)
        d5.text((450, cy + 25), b, font=font_sub, fill=color_coral)
        d5.text((750, cy + 25), s, font=font_sub, fill=color_green)
        cy += 115

    # Privacy Box
    draw_card(d5, (1150, 180, 1820, 980))
    d5.text((1190, 230), "Zero-Knowledge Sovereign AI", font=font_title, fill=color_gold)
    d5.text((1190, 330), "• 100% On-Device Local Inference", font=font_sub, fill=text_white)
    d5.text((1190, 420), "• Zero Cloud Bank Telemetry", font=font_sub, fill=color_green)
    d5.text((1190, 510), "• Zero Recurring Token Costs", font=font_sub, fill=color_gold)
    d5.text((1190, 600), "• Works Completely Offline", font=font_sub, fill=text_white)
    d5.text((1190, 720), "Your bank data never leaves", font=font_huge, fill=text_white)
    d5.text((1190, 830), "your computer.", font=font_huge, fill=color_green)
    img5.save("demo/frames/frame5.png")

    # FRAME 6: Outro & Call to Action
    img6 = Image.new("RGB", (width, height), bg_dark)
    d6 = ImageDraw.Draw(img6)
    draw_card(d6, (100, 180, 1820, 900))
    d6.text((250, 280), "🦥 SlothFinance", font=font_huge, fill=color_gold)
    d6.text((250, 410), "Stop paying the laziness tax. Let open-source AI do the work.", font=font_title, fill=text_white)
    
    draw_card(d6, (250, 520, 1670, 680), fill_color=(61, 95, 88), border_color=color_gold)
    d6.text((290, 570), "Try Live Demo:  https://vidishagupta.github.io/sloth-finance/", font=font_title, fill=text_white)

    d6.text((250, 750), "Built with Prior Labs TabPFN-3.5 + Google Gemma 2 for Hacktoberfest Week 3", font=font_sub, fill=text_muted)
    img6.save("demo/frames/frame6.png")

    print("All 6 video frames rendered in demo/frames/!")

def build_mp4():
    # Scene durations (in seconds) matching voiceover timestamps:
    # Frame 1: 0 to 26s (26s)
    # Frame 2: 26s to 49s (23s)
    # Frame 3: 49s to 68s (19s)
    # Frame 4: 68s to 91s (23s)
    # Frame 5: 91s to 101s (10s)
    # Frame 6: 101s to 109s (8s)
    
    concat_txt = "demo/concat.txt"
    with open(concat_txt, "w") as f:
        f.write("file 'frames/frame1.png'\nduration 26\n")
        f.write("file 'frames/frame2.png'\nduration 23\n")
        f.write("file 'frames/frame3.png'\nduration 19\n")
        f.write("file 'frames/frame4.png'\nduration 23\n")
        f.write("file 'frames/frame5.png'\nduration 10\n")
        f.write("file 'frames/frame6.png'\nduration 8\n")
        f.write("file 'frames/frame6.png'\n")

    output_video = "demo/sloth_finance_demo.mp4"
    audio_path = "demo/sloth_finance_voiceover.mp3"
    srt_path = "demo/sloth_finance_subtitles.srt"

    cmd = [
        "ffmpeg", "-y",
        "-f", "concat", "-safe", "0", "-i", concat_txt,
        "-i", audio_path,
        "-c:v", "libx264", "-pix_fmt", "yuv420p", "-r", "30",
        "-c:a", "aac", "-b:a", "192k",
        "-shortest",
        output_video
    ]
    print(f"Running ffmpeg to generate {output_video}...")
    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode == 0:
        print(f"SUCCESS: Video generated at {output_video}")
    else:
        print(f"FFmpeg error: {res.stderr}")

if __name__ == "__main__":
    create_frames()
    build_mp4()
