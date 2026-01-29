from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import StudentProfile, User, Task
from app.schemas.student_profile import StudentProfile as StudentProfileSchema

router = APIRouter(prefix="/profile", tags=["Profile"])

# TODO: In a real app we need authentication dependency to get the current user ID.
# For prototype simplicity, we'll hardcode user_id=1 or assume it's passed in headers/body.
# Let's assume user_id is passed for now or we just use the first user.
# Ideally we use JWT tokens. For this hackathon, we can pass `user_id` in requests or just generic.

@router.post("/onboarding")
def save_onboarding(profile: StudentProfileSchema, db: Session = Depends(get_db)):
    # Simulating finding the user (e.g., the one who just signed up)
    # In real auth, we'd get current_user here.
    # Hack: For now, we attach to User ID 1 or create a dummy user if not exists 
    # BUT we just implemented Auth. So we should probably pass user_id.
    # Let's update the frontend to pass user_id? Or just default to 1 for the prototype demo.
    
    user_id = 1 # Demo mode
    
    # Check if profile exists
    db_profile = db.query(StudentProfile).filter(StudentProfile.user_id == user_id).first()
    if db_profile:
        # Update existing
        for key, value in profile.dict().items():
            setattr(db_profile, key, value)
    else:
        # Create new
        db_profile = StudentProfile(**profile.dict(), user_id=user_id)
        db.add(db_profile)
    
    db.commit()
    return {"message": "Profile completed", "completed": True}

@router.get("/dashboard")
def get_dashboard_data(db: Session = Depends(get_db)):
    user_id = 1 # Demo mode
    
    profile = db.query(StudentProfile).filter(StudentProfile.user_id == user_id).first()
    tasks = db.query(Task).filter(Task.user_id == user_id).all()
    
    if not profile:
        return {"error": "Profile not found"}

    # Mock Profile Strength Logic
    strength = {
        "academics": "Strong" if profile.gpa and float(profile.gpa) > 3.5 else "Average",
        "exams": "Completed" if profile.ielts in ["Completed"] else "In Progress",
        "sop": profile.sop or "Not Started"
    }

    return {
        "profile": {
            "education": f"{profile.education_level} - {profile.major}",
            "intake": profile.intake_year,
            "countries": profile.countries,
            "budget": f"${profile.budget} / year"
        },
        "strength": strength,
        "stage": 1, # Default to Building Profile
        "tasks": [{"id": t.id, "text": t.text, "done": t.is_completed} for t in tasks]
    }
