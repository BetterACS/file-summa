import openai
import fastapi
import uvicorn
from typing import Annotated
from fastapi.responses import HTMLResponse
from fastapi import FastAPI, File, UploadFile
import base64
import os

app = FastAPI()

@app.post("/uploadfiles/")
async def create_upload_files(files: list[UploadFile]):
    for file in files:
        file_path = file.filename
        with open(file_path, "wb") as f:
            f.write(await file.read())
    
    return {"filenames": [file.filename for file in files]}



@app.get("/")
async def main():
    content = """
<body>
<form action="/files/" enctype="multipart/form-data" method="post">
<input name="files" type="file" multiple>
<input type="submit">
</form>
<form action="/uploadfiles/" enctype="multipart/form-data" method="post">
<input name="files" type="file" multiple>
<input type="submit">
</form>
</body>
    """
    return HTMLResponse(content=content)
