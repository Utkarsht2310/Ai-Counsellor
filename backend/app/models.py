from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, Float, Text
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    full_name = Column(String)
    hashed_password = Column(String)
    
    profile = relationship("StudentProfile", back_populates="user", uselist=False)
    tasks = relationship("Task", back_populates="user")
    shortlist = relationship("Shortlist", back_populates="user")

class StudentProfile(Base):
    __tablename__ = "profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    
    education_level = Column(String)
    major = Column(String)
    graduation_year = Column(String, nullable=True)
    gpa = Column(String, nullable=True)
    intended_degree = Column(String)
    field_of_study = Column(String)
    intake_year = Column(String, nullable=True)
    countries = Column(String, nullable=True)
    budget = Column(String)
    funding = Column(String)
    ielts = Column(String, nullable=True)
    gre = Column(String, nullable=True)
    sop = Column(String, nullable=True)
    
    user = relationship("User", back_populates="profile")

class University(Base):
    __tablename__ = "universities"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    location = Column(String) # Country/City
    ranking = Column(Integer, nullable=True)
    cost_per_year = Column(String)
    acceptance_rate = Column(String)
    
    # In a real app, 'fit_type' (Dream/Target/Safe) is calculated relative to a user.
    # For this prototype we might cache a default or calculate it on the fly. 
    # Let's keep the model simple for now.

class Shortlist(Base):
    __tablename__ = "shortlists"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    university_id = Column(Integer, ForeignKey("universities.id"))
    status = Column(String, default="shortlisted") # shortlisted, locked
    
    user = relationship("User", back_populates="shortlist")
    university = relationship("University")

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    text = Column(String)
    is_completed = Column(Boolean, default=False)
    
    user = relationship("User", back_populates="tasks")
