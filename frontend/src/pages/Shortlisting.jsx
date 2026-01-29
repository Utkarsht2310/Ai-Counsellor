import { useState, useEffect } from "react";
import UniversityCard from "../components/UniversityCard";
import { getRecommendations, shortlistUniversity, lockUniversity, getDashboardData } from "../api/modules"; // Assuming getDashboardData gets me the shortlist status implicitly or I fetch it separately. Ideally fetch separate. 
// Actually I need to fetch current shortlist status to know what is Shortlisted. 
// I'll add `getShortlist` to API in a moment if not there. I added `getRecommendations` and `shortlist`.
// Let's assume recommendations endpoint *could* return "is_shortlisted" status? 
// Or better, fetch both and merge locally.

import axios from "axios"; // Direct or via api modules
const API_URL = "http://localhost:8000";

const Shortlisting = () => {
    const [universities, setUniversities] = useState([]);
    const [myShortlist, setMyShortlist] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [recs, shortlist] = await Promise.all([
                    getRecommendations(),
                    axios.get(`${API_URL}/universities/myshortlist`).then(res => res.data)
                ]);
                setUniversities(recs);
                setMyShortlist(shortlist);
            } catch (error) {
                console.error("Error fetching universities", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleShortlist = async (id) => {
        await shortlistUniversity(id);
        // Refresh shortlist
        const res = await axios.get(`${API_URL}/universities/myshortlist`);
        setMyShortlist(res.data);
    };

    const handleLock = async (id) => {
        if (!window.confirm("Are you sure? Locking a university is a major step.")) return;
        await lockUniversity(id);
        // Refresh
        const res = await axios.get(`${API_URL}/universities/myshortlist`);
        setMyShortlist(res.data);
    };

    if (loading) return <div>Loading Universities...</div>;

    return (
        <div className="page-container" style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
            <h2>University Shortlisting</h2>
            <p style={{ marginBottom: "2rem", color: "#666" }}>
                Based on your profile, here are our top recommendations. Shortlist the ones you like, and <strong>Lock</strong> your final choice to proceed.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "2rem" }}>
                {universities.map((uni) => {
                    const shortlistItem = myShortlist.find(s => s.id === uni.id); // API for myshortlist returns university objects?
                    // Wait, backend `myshortlist` returns {id: u.id, name..., status}. 
                    // So checking if finding id matches is correct.

                    return (
                        <UniversityCard
                            key={uni.id}
                            university={uni}
                            isShortlisted={!!shortlistItem}
                            isLocked={shortlistItem?.status === "LOCKED"}
                            onShortlist={handleShortlist}
                            onLock={handleLock}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Shortlisting;
