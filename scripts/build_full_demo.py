import os
import subprocess

def build_demo():
    os.chdir("demo")
    
    # 1. Create concat.txt with exact durations matching the narration
    concat_content = """file 'real_frames/scene1_hero.png'
duration 26.5
file 'real_frames/scene2_scorecard.png'
duration 23.0
file 'real_frames/scene3_table.png'
duration 19.0
file 'real_frames/scene4_letter.png'
duration 23.0
file 'real_frames/scene5_forecast.png'
duration 10.0
file 'real_frames/scene6_privacy.png'
duration 7.5
file 'real_frames/scene6_privacy.png'
"""
    with open("concat_real.txt", "w", encoding="utf-8") as f:
        f.write(concat_content)
        
    print("Created concat_real.txt")
    
    output_mp4 = "sloth_finance_demo.mp4"
    if os.path.exists(output_mp4):
        try:
            os.remove(output_mp4)
        except Exception:
            output_mp4 = "sloth_finance_demo_v2.mp4"
            
    # Subtitle styling:
    # Arial bold 22pt, white text, black border with subtle shadow, positioned at bottom margin 45px
    sub_style = "FontName=Arial,FontSize=22,Bold=1,PrimaryColour=&H00FFFFFF,OutlineColour=&H00000000,Outline=2.5,Shadow=1.5,MarginV=45"
    
    # FFmpeg command
    cmd = [
        "ffmpeg", "-y",
        "-f", "concat", "-safe", "0", "-i", "concat_real.txt",
        "-i", "sloth_finance_voiceover.mp3",
        "-vf", f"fps=30,scale=1920:1080,subtitles=sloth_finance_subtitles.srt:force_style='{sub_style}'",
        "-c:v", "libx264", "-pix_fmt", "yuv420p", "-preset", "fast", "-crf", "18",
        "-c:a", "aac", "-b:a", "192k",
        "-shortest",
        output_mp4
    ]
    
    print("Running FFmpeg:", " ".join(cmd))
    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode != 0:
        print("FFmpeg error:")
        print(res.stderr)
        raise RuntimeError("FFmpeg rendering failed")
        
    print("Video rendered successfully to:", output_mp4)
    print("File size:", os.path.getsize(output_mp4), "bytes")

if __name__ == "__main__":
    build_demo()
