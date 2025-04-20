import uuid
from datetime import datetime, timezone
from pathlib import Path

from fastapi import FastAPI, File, UploadFile

app = FastAPI()


@app.get("/api/health")
def get_health():
    return "Ok"


UPLOAD_DIR = Path("./images")
UPLOAD_DIR.mkdir(exist_ok=True)


@app.post("/api/upload")
async def upload(file: UploadFile = File(...)):
    assert "." in file.filename
    ext = Path(file.filename).suffix
    timestamp = datetime.now(timezone.utc).strftime("%Y%m%d_%H%M%S")
    suffix = uuid.uuid4()
    with (
        (UPLOAD_DIR / f"{timestamp}_{suffix}").with_suffix(ext).open("wb") as targetFile
    ):
        targetFile.write(await file.read())
