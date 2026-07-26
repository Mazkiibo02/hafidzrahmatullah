import urllib.request
import hashlib, base64
u = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg'
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
    'Accept': 'image/svg+xml,image/*;q=0.8,*/*;q=0.5',
    'Referer': 'https://cdn.jsdelivr.net/'
}
req = urllib.request.Request(u, headers=headers)
data = urllib.request.urlopen(req, timeout=30).read()
print(len(data))
print(data[:200])
