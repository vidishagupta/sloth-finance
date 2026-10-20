import asyncio
import os
import edge_tts

VOICEOVER_TEXT = """Did you know that the average person wastes over 1,500 dollars every single year simply because they are too lazy to audit their bank statements and cancel forgotten subscriptions?

Today is International Sloth Day, and we think sloths have it figured out: conserve your energy, avoid manual chores, and let open-source AI do the heavy lifting. Meet SlothFinance.

With a single click or CSV drop, Prior Labs' TabPFN-3.5 tabular foundation model kicks in. TabPFN runs zero-shot time-series anomaly detection directly on the raw transactions. It detects recurrence intervals, isolates stealth price hikes—like Netflix quietly jumping by 16 percent—and calculates your Sloth Scorecard.

Here, Google's Gemma 2 open-weights agent delivers your personalized financial roast. It highlights exactly how many cups of coffee or guilt-free couch days you can reclaim by ditching zombie subscriptions you haven't touched in months.

Now for the magic. Instead of navigating multi-page dark-pattern cancellation surveys, you click one button. Gemma 2 drafts an ironclad legal termination letter citing FTC Click-to-Cancel regulations and demanding refund credits for unauthorized price creeps. Copy, mail, or download in two seconds.

Our predictive trajectory visualizes your compounding 3-year savings curve. And best of all? Because it’s built entirely on open-source AI like TabPFN and Gemma, your sensitive bank transactions never leave your machine. 100% private, 100% sovereign.

Stop paying the laziness tax. Try SlothFinance live today and let open-source AI do the work while you rest."""

async def generate():
    os.makedirs("demo", exist_ok=True)
    voice = "en-US-ChristopherNeural"
    communicate = edge_tts.Communicate(VOICEOVER_TEXT, voice, rate="+2%")
    
    submaker = edge_tts.SubMaker()
    audio_path = os.path.join("demo", "sloth_finance_voiceover.mp3")
    vtt_path = os.path.join("demo", "sloth_finance_subtitles.vtt")
    srt_path = os.path.join("demo", "sloth_finance_subtitles.srt")
    
    with open(audio_path, "wb") as file:
        async for chunk in communicate.stream():
            if chunk["type"] == "audio":
                file.write(chunk["data"])
            elif chunk["type"] == "WordBoundary":
                submaker.feed(chunk)
                
    with open(srt_path, "w", encoding="utf-8") as file:
        file.write(submaker.get_srt())

    print(f"Generated audio: {audio_path}")
    print(f"Generated subtitles: {srt_path}")

if __name__ == "__main__":
    asyncio.run(generate())
