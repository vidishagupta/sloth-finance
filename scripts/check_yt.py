import urllib.request
import re

url = "https://www.youtube.com/watch?v=a590pPb03dM"
req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"})
try:
    with urllib.request.urlopen(req) as resp:
        html = resp.read().decode('utf-8')
        m = re.search(r'<title>(.*?)</title>', html)
        if m:
            print("TITLE:", m.group(1))
        d = re.search(r'itemprop="description" content="(.*?)"', html)
        if d:
            print("DESC:", d.group(1))
        c = re.search(r'itemprop="channelId" content="(.*?)"', html)
        if c:
            print("CHANNEL:", c.group(1))
except Exception as e:
    print("ERR:", e)
