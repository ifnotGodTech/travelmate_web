import hashlib
from datetime import datetime, timezone

api_key = 'e5e8eb59d7583951d204ed4874435fcb'
secret = '147eb52d1b'
timestamp = str(int(datetime.now(timezone.utc).timestamp()))
raw = api_key + secret + timestamp
signature = hashlib.sha256(raw.encode('utf-8')).hexdigest()

print("Timestamp:", timestamp)
print("Signature:", signature)


