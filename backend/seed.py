from app.database import SessionLocal, engine, Base
from app.models import University

# Init DB
Base.metadata.create_all(bind=engine)

def seed():
    db = SessionLocal()
    
    # Check if data exists
    if db.query(University).count() > 0:
        print("Data already exists.")
        return

    universities = [
        University(name="Stanford University", location="USA", ranking=1, cost_per_year="$60,000", acceptance_rate="Low"),
        University(name="MIT", location="USA", ranking=2, cost_per_year="$58,000", acceptance_rate="Low"),
        University(name="Oxford University", location="UK", ranking=3, cost_per_year="$40,000", acceptance_rate="Low"),
        University(name="Arizona State University", location="USA", ranking=100, cost_per_year="$30,000", acceptance_rate="High"),
        University(name="University of Toronto", location="Canada", ranking=20, cost_per_year="$35,000", acceptance_rate="Medium"),
        University(name="Technical University of Munich", location="Germany", ranking=30, cost_per_year="$2,000", acceptance_rate="Medium"),
        University(name="University of Melbourne", location="Australia", ranking=25, cost_per_year="$45,000", acceptance_rate="Medium"),
    ]
    
    db.add_all(universities)
    db.commit()
    db.close()
    print("Seeded universities.")

if __name__ == "__main__":
    seed()
