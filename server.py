import csv
import io
import os
from typing import List, Dict, Any, Optional
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from services.tabpfn_analyzer import TabPFNAnalyzer
from services.gemma_agent import GemmaAgent

app = FastAPI(
    title="SlothFinance API",
    description="Autonomous Open-Source AI Tabular Anomaly & Recurring Financial Tamer",
    version="1.0.0"
)

# Enable CORS for local dev and production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

tabpfn_engine = TabPFNAnalyzer()
gemma_engine = GemmaAgent()

class LetterRequest(BaseModel):
    subscription: Dict[str, Any]
    user_name: Optional[str] = "Fellow Sloth"
    user_email: Optional[str] = "customer@example.com"
    account_id: Optional[str] = "ACCT-98421"

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "theme": "Slow and Steady (International Sloth Day)",
        "models": {
            "tabular": "TabPFN-3.5 (Prior Labs)",
            "llm": "Google Gemma 2 (Open-Weights)"
        }
    }

@app.get("/api/samples")
def get_sample_datasets():
    return {
        "samples": [
            {
                "id": "forgetful_dev",
                "title": "The Forgetful Developer",
                "description": "Forgotten cloud servers, 3 AI copilot subscriptions, creeping streaming fees, and an unused gym pass.",
                "item_count": 42
            },
            {
                "id": "college_chaos",
                "title": "College Student Chaos",
                "description": "Free trials that quietly converted to full recurring bills (Duolingo, Chegg, Spotify, food delivery).",
                "item_count": 28
            },
            {
                "id": "saas_dump",
                "title": "Zombie SaaS Overload",
                "description": "Redundant collaboration tools, ghost AWS droplets, and multiple pro accounts.",
                "item_count": 35
            }
        ]
    }

@app.post("/api/analyze")
async def analyze_statement(
    file: Optional[UploadFile] = File(None),
    sample_id: Optional[str] = Form(None)
):
    transactions = []

    if file:
        content = await file.read()
        text = content.decode("utf-8", errors="ignore")
        reader = csv.DictReader(io.StringIO(text))
        for row in reader:
            transactions.append(row)
    elif sample_id or not file:
        # Load sample dataset
        sample_path = os.path.join(os.path.dirname(__file__), "data", "sample_statements.csv")
        if os.path.exists(sample_path):
            with open(sample_path, "r", encoding="utf-8") as f:
                reader = csv.DictReader(f)
                for row in reader:
                    transactions.append(row)
        else:
            raise HTTPException(status_code=400, detail="No statement uploaded and sample dataset not found.")

    if not transactions:
        raise HTTPException(status_code=400, detail="No readable transactions found in statement.")

    # 1. Run TabPFN tabular recurring & anomaly detection
    analysis = tabpfn_engine.analyze_transactions(transactions)

    # 2. Run Gemma Agent audit & roast
    audit = gemma_engine.generate_audit_roast(analysis)

    return {
        "analysis": analysis,
        "audit": audit
    }

@app.post("/api/generate-letter")
def generate_cancellation_letter(req: LetterRequest):
    user_info = {
        "name": req.user_name,
        "email": req.user_email,
        "account_id": req.account_id
    }
    letter = gemma_engine.generate_cancellation_letter(req.subscription, user_info)
    return letter

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("server:app", host="0.0.0.0", port=8000, reload=True)
