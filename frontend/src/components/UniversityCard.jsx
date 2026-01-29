import React from "react";
import "../styles/university-card.css";

const UniversityCard = ({ university, onShortlist, onLock, isShortlisted, isLocked }) => {
    const { name, location, cost, fit, acceptance_rate } = university;

    return (
        <div className={`uni-card ${fit.toLowerCase()}`}>
            <div className="uni-header">
                <h4>{name}</h4>
                <span className={`badge ${fit.toLowerCase()}`}>{fit}</span>
            </div>
            <p className="location">{location}</p>

            <div className="uni-stats">
                <div>
                    <span>Cost</span>
                    <p>{cost}</p>
                </div>
                <div>
                    <span>Acceptance</span>
                    <p>{acceptance_rate}</p>
                </div>
            </div>

            <div className="uni-actions">
                {isLocked ? (
                    <button className="btn-locked" disabled>Locked</button>
                ) : (
                    <>
                        {!isShortlisted ? (
                            <button
                                className="btn-shortlist"
                                onClick={() => onShortlist(university.id)}
                            >
                                Shortlist
                            </button>
                        ) : (
                            <button className="btn-shortlisted" disabled>Shortlisted</button>
                        )}

                        {isShortlisted && (
                            <button
                                className="btn-lock"
                                onClick={() => onLock(university.id)}
                            >
                                Lock Decision
                            </button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default UniversityCard;
