from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import University, Shortlist, User
from pydantic import BaseModel

router = APIRouter(prefix="/universities", tags=["Universities"])

class ShortlistRequest(BaseModel):
    university_id: int
    user_id: int = 1

@router.get("/recommendations")
def get_recommendations(user_id: int = 1, db: Session = Depends(get_db)):
    # Simple recommendation logic based on budget/country would go here
    # For now return all with random 'fit' tag for demo
    max_uni = 10
    unis = db.query(University).limit(max_uni).all()
    
    results = []
    for i, u in enumerate(unis):
        fit = "Target"
        if i % 3 == 0: fit = "Dream" 
        elif i % 3 == 1: fit = "Safe"
        
        results.append({
            "id": u.id,
            "name": u.name,
            "location": u.location,
            "cost": u.cost_per_year,
            "fit": fit,
            "acceptance_rate": u.acceptance_rate
        })
    return results

@router.post("/shortlist")
def shortlist_university(req: ShortlistRequest, db: Session = Depends(get_db)):
    # Check if already exists
    existing = db.query(Shortlist).filter(Shortlist.user_id == req.user_id, Shortlist.university_id == req.university_id).first()
    if existing:
        return {"message": "Already shortlisted"}
    
    new_item = Shortlist(user_id=req.user_id, university_id=req.university_id, status="shortlisted")
    db.add(new_item)
    db.commit()
    return {"message": "Shortlisted"}

@router.get("/myshortlist")
def get_shortlist(user_id: int = 1, db: Session = Depends(get_db)):
    items = db.query(Shortlist).filter(Shortlist.user_id == user_id).all()
    results = []
    for item in items:
        u = item.university
        results.append({
            "id": u.id,
            "name": u.name,
            "location": u.location,
            "status": item.status
        })
    return results

@router.post("/lock")
def lock_university(req: ShortlistRequest, db: Session = Depends(get_db)):
    item = db.query(Shortlist).filter(Shortlist.user_id == req.user_id, Shortlist.university_id == req.university_id).first()
    if item:
        item.status = "LOCKED"
        db.commit()
    return {"message": "Locked"}
