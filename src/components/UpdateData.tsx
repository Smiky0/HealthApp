import { useEffect, useState } from "react";
import UserInformation from "./UserInformation";
import HealthInformation from "./HealthInformation";
// import { auth } from "./firebase";
import PuffLoader from "react-spinners/PuffLoader";

interface UserDetails {
    name: string;
    age: string;
    gender: string;
    height: string;
    weight: string;
}

interface HealthDetails {
    bloodpressure: string;
    allergy: string;
    smoking: string;
    alcohol: string;
}

const UpdateData: React.FC<{ onSubmit: () => void }> = ({ onSubmit }) => {
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const [healthDetails, setHealthDetails] = useState<HealthDetails | null>(
        null
    );
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(
                    "https://run.mocky.io/v3/ec48f3ca-c6d0-47dd-bb45-a3f9759e794d"
                    // +auth.currentUser?.uid
                );
                if (!response.ok) throw new Error("Failed to fetch data");

                const data = await response.json();
                setUserDetails({
                    name: data.name,
                    age: data.age,
                    gender: data.gender,
                    height: data.height,
                    weight: data.weight,
                });
                setHealthDetails({
                    bloodpressure: data.bloodps,
                    allergy: data.allergy,
                    smoking: data.smoking,
                    alcohol: data.alcohol,
                });
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) return <PuffLoader />;
    if (error)
        return (
            <p className="text-lg text-red-500">
                Error loading patient report: {error}
            </p>
        );

    return (
        <div>
            {/* Render UserInformation with pre-filled user details */}
            {userDetails && (
                <UserInformation
                    initialData={userDetails}
                    onSubmit={onSubmit}
                />
            )}

            {/* Render HealthInformation with pre-filled health details */}
            {healthDetails && (
                <HealthInformation
                    initialData={healthDetails}
                    onSubmit={onSubmit}
                />
            )}
        </div>
    );
};

export default UpdateData;
