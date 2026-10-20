import os
import re
import subprocess
from PIL import Image, ImageDraw, ImageFont

def parse_time(timestr):
    # '00:00:00,500' -> seconds float
    h, m, rest = timestr.split(':')
    s, ms = rest.split(',')
    return int(h) * 3600 + int(m) * 60 + int(s) + int(ms) / 1000.0

def wrap_text(text, font, max_width, draw):
    words = text.split()
    lines = []
    current_line = []
    
    for word in words:
        test_line = ' '.join(current_line + [word])
        bbox = draw.textbbox((0, 0), test_line, font=font)
        w = bbox[2] - bbox[0]
        if w <= max_width:
            current_line.append(word)
        else:
            if current_line:
                lines.append(' '.join(current_line))
                current_line = [word]
            else:
                lines.append(word)
                current_line = []
    if current_line:
        lines.append(' '.join(current_line))
    return lines

def get_scene_image_path(t):
    if t < 26.5:
        return "demo/real_frames/scene1_hero.png"
    elif t < 49.5:
        return "demo/real_frames/scene2_scorecard.png"
    elif t < 68.5:
        return "demo/real_frames/scene3_table.png"
    elif t < 91.5:
        return "demo/real_frames/scene4_letter.png"
    elif t < 101.5:
        return "demo/real_frames/scene5_forecast.png"
    else:
        return "demo/real_frames/scene6_privacy.png"

def render_demo():
    os.makedirs("demo/sub_frames", exist_ok=True)
    
    # 1. Parse SRT
    with open("demo/sloth_finance_subtitles.srt", "r", encoding="utf-8") as f:
        srt_content = f.read()

    pattern = re.compile(r'(\d+)\n(\d{2}:\d{2}:\d{2},\d{3}) --> (\d{2}:\d{2}:\d{2},\d{3})\n([\s\S]*?)(?=\n\n|\Z)')
    cues = []
    for match in pattern.findall(srt_content):
        _, start_str, end_str, text = match
        cues.append({
            "start": parse_time(start_str),
            "end": parse_time(end_str),
            "text": text.replace("\n", " ").strip()
        })

    # Font setup
    try:
        font_sub = ImageFont.truetype(r"C:\Windows\Fonts\arialbd.ttf", 32)
        font_badge = ImageFont.truetype(r"C:\Windows\Fonts\arialbd.ttf", 22)
    except Exception:
        font_sub = ImageFont.load_default()
        font_badge = ImageFont.load_default()

    # 2. Build non-overlapping timeline segments
    total_audio_duration = 108.97
    segments = []
    current_t = 0.0

    for cue in cues:
        # Check if there is a gap before this cue
        if cue["start"] > current_t + 0.05:
            segments.append({
                "start": current_t,
                "end": cue["start"],
                "text": ""
            })
        segments.append({
            "start": cue["start"],
            "end": cue["end"],
            "text": cue["text"]
        })
        current_t = cue["end"]

    if current_t < total_audio_duration:
        segments.append({
            "start": current_t,
            "end": total_audio_duration,
            "text": ""
        })

    print(f"Generated {len(segments)} timeline segments.")

    # 3. Render each segment image
    concat_lines = []
    
    for idx, seg in enumerate(segments):
        duration = round(seg["end"] - seg["start"], 3)
        if duration <= 0.02:
            continue
            
        midpoint_t = (seg["start"] + seg["end"]) / 2.0
        base_img_path = get_scene_image_path(midpoint_t)
        base_img = Image.open(base_img_path).convert("RGBA")
        
        # Overlay subtitles if text is present
        if seg["text"]:
            overlay = Image.new("RGBA", base_img.size, (0, 0, 0, 0))
            draw = ImageDraw.Draw(overlay)
            
            # Wrap text to max 1400px width
            lines = wrap_text(seg["text"], font_sub, 1350, draw)
            line_height = 44
            text_block_h = len(lines) * line_height
            
            # Compute subtitle box dimensions
            box_padding_x = 40
            box_padding_y = 22
            
            max_line_w = 0
            for l in lines:
                b = draw.textbbox((0, 0), l, font=font_sub)
                max_line_w = max(max_line_w, b[2] - b[0])
                
            box_w = max_line_w + box_padding_x * 2
            box_h = text_block_h + box_padding_y * 2
            
            box_x0 = (1920 - box_w) // 2
            box_y0 = 980 - box_h
            box_x1 = box_x0 + box_w
            box_y1 = box_y0 + box_h
            
            # Draw sleek glass pill
            draw.rounded_rectangle(
                (box_x0, box_y0, box_x1, box_y1),
                radius=18,
                fill=(10, 19, 17, 235),
                outline=(245, 183, 38, 180),
                width=2
            )
            
            # Render lines centered
            cur_y = box_y0 + box_padding_y
            for line in lines:
                tb = draw.textbbox((0, 0), line, font=font_sub)
                lw = tb[2] - tb[0]
                lx = (1920 - lw) // 2
                # Subtle drop shadow
                draw.text((lx + 2, cur_y + 2), line, font=font_sub, fill=(0, 0, 0, 200))
                # Crisp white text
                draw.text((lx, cur_y), line, font=font_sub, fill=(255, 255, 255, 255))
                cur_y += line_height
                
            # Composite onto base image
            base_img = Image.alpha_composite(base_img, overlay)

        # Convert back to RGB and save
        out_frame_path = f"demo/sub_frames/frame_{idx:03d}.png"
        base_img.convert("RGB").save(out_frame_path)
        
        concat_lines.append(f"file 'sub_frames/frame_{idx:03d}.png'")
        concat_lines.append(f"duration {duration}")

    # Concat file requires repeating the last file
    if concat_lines:
        last_file_line = concat_lines[-2]
        concat_lines.append(last_file_line)

    with open("demo/concat_subtitles.txt", "w", encoding="utf-8") as f:
        f.write("\n".join(concat_lines) + "\n")
        
    print("Wrote demo/concat_subtitles.txt")

    # 4. Run FFmpeg
    output_mp4 = "demo/sloth_finance_demo.mp4"
    public_mp4 = "public/sloth_finance_demo.mp4"
    
    cmd = [
        "ffmpeg", "-y",
        "-f", "concat", "-safe", "0", "-i", "demo/concat_subtitles.txt",
        "-i", "demo/sloth_finance_voiceover.mp3",
        "-c:v", "libx264", "-pix_fmt", "yuv420p", "-r", "30",
        "-c:a", "aac", "-b:a", "192k",
        "-shortest",
        output_mp4
    ]
    
    print("Running FFmpeg encoding...")
    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode != 0:
        print("FFmpeg error:", res.stderr)
        raise RuntimeError("FFmpeg encoding failed")
        
    print("Video rendered successfully to:", output_mp4)
    print("Video file size:", os.path.getsize(output_mp4), "bytes")
    
    # Copy to public folder for web hosting
    os.makedirs("public", exist_ok=True)
    import shutil
    shutil.copyfile(output_mp4, public_mp4)
    print(f"Copied demo video to {public_mp4}")

if __name__ == "__main__":
    render_demo()
