from pydantic import BaseModel

class StudentProfile(BaseModel):
    education_level: str
    major: str
    graduation_year: str | None = None
    gpa: str | None = None
    intended_degree: str
    field_of_study: str
    intake_year: str | None = None
    countries: str | None = None
    budget: str
    funding: str
    ielts: str | None = None
    gre: str | None = None
    sop: str | None = None
