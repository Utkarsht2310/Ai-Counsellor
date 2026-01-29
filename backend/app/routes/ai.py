from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import StudentProfile
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter(prefix="/ai", tags=["AI"])

# Configure Gemini
api_key = os.getenv("GOOGLE_API_KEY")
if api_key:
    genai.configure(api_key=api_key)
else:
    print("Warning: GOOGLE_API_KEY not found.")

class ChatRequest(BaseModel):
    message: str
    user_id: int = 1 # Demo default

@router.post("/chat")
async def chat(request: ChatRequest, db: Session = Depends(get_db)):
    if not api_key:
         return {"response": "AI Configuration Error: API Key missing."}

    # 1. Fetch Profile context
    profile = db.query(StudentProfile).filter(StudentProfile.user_id == request.user_id).first()
    
    context_str = "User profile is empty."
    if profile:
        context_str = f"""
        Student Profile:
        - Education: {profile.education_level} in {profile.major}
        - GPA: {profile.gpa}
        - Intended Degree: {profile.intended_degree} in {profile.field_of_study}
        - Budget: {profile.budget}
        - Preferred Countries: {profile.countries}
        - Exams: IELTS ({profile.ielts}), GRE ({profile.gre})
        - SOP Status: {profile.sop}
        """

    system_instruction = f"""
    You are an expert AI Study Abroad Counsellor. Your goal is to guide the student towards their dream university.
    
    {context_str}
    
    Rules:
    - Be encouraging but realistic.
    - If the user asks for university suggestions, suggest specific universities (Dream, Target, Safe) based on their profile.
    - Keep answers concise and actionable.
    - If data is missing (e.g. GPA), ask for it politely.
    """

    try:
        model = genai.GenerativeModel("gemini-pro")
        # In a real app complexity, we would maintain chat history. 
        # For this prototype, we'll just send the system instruction + user message.
        # Note: 'system_instruction' is a feature of newer models/API versions or we prepending it.
        # We will prepend it to the prompt for simplicity.
        
        full_prompt = f"{system_instruction}\n\nUser: {request.message}\nAI:"
        
        response = model.generate_content(full_prompt)
        return {"response": response.text}
        
    except Exception as e:
        print(f"Gemini API Error: {e}")
        return {"response": "Sorry, I'm having trouble connecting to my brain right now. Please try again later."}
