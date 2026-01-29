from pydantic import BaseModel
from typing import Optional

class StudentProfile(BaseModel):
    education_level: str
    major: str
    graduation_year: Optional[str] = None
    gpa: Optional[str] = None
    intended_degree: str
    field_of_study: str
    intake_year: Optional[str] = None
    countries: Optional[str] = None
    budget: str
    funding: str
    ielts: Optional[str] = None
    gre: Optional[str] = None
    sop: Optional[str] = None
