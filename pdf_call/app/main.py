import openai
import uvicorn
from typing import Annotated
from fastapi.responses import HTMLResponse
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import io
import fitz 
from fastapi import FastAPI, Form
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()
client = openai.OpenAI()

# Add CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Add the origin of your frontend
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (e.g., GET, POST)
    allow_headers=["*"],  # Allow all headers
)

@app.post("/summary")
async def summary_endpoint(pdf_file: UploadFile = File(...)):  # Expect a file, not a string
    print(pdf_file)
    content = await pdf_file.read()  # Read file content as bytes

    if pdf_file.content_type != "application/pdf":
        print(pdf_file.content_type)
        return {"message": "Invalid file type. Please upload a PDF."}
    
    try:
        pdf = fitz.open("pdf", content)
        text = ""
        for page_num in range(pdf.page_count):
            page = pdf.load_page(page_num)
            text += page.get_text("text")
        pdf.close()

        prompt = """Summarize the following text (use language same as that pdf file): {}""".format(text)
        completion = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt}
            ])
        summarized_results = completion.choices[0].message.content
    except Exception as e:
        print(e)
        return {"message": "An error occurred while reading the PDF file."}

    return {"summary": summarized_results, "file_name": pdf_file.filename}

