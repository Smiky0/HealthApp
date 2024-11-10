import React, { useEffect, useState } from "react";
import { auth } from "./firebase";
import PuffLoader from "react-spinners/PuffLoader";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./ui/card";
import HealthInformation from "./HealthInformation";

interface PatientReportProps {
    onLoadComplete: () => void;
}

const PatientReport: React.FC<PatientReportProps> = ({ onLoadComplete }) => {
    const [bloodps, setBloodPS] = useState("");
    const [allergy, setAllergy] = useState("");
    const [smoking, setSmoking] = useState("");
    const [alcohol, setAlcohol] = useState("");

    const [userExists, setUserExists] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const userId = auth.currentUser?.uid;

    const fetchPatientDetails = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                "https://health-track-app-cm4e.onrender.com/getuserdata/" +
                    userId
                // "https://run.mocky.io/v3/ec48f3ca-c6d0-47dd-bb45-a3f9759e794d"
            );
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            } else if (response.status === 204) {
                setUserExists(false);
                setLoading(false);
                return;
            }
            const data = await response.json();
            onLoadComplete();

            // Set each field based on the response data
            setBloodPS(data.bloodpressure || "");
            setAllergy(data.allergy || "");
            setSmoking(data.smoking || "");
            setAlcohol(data.alcohol || "");
            setUserExists(true);
        } catch (error) {
            setError((error as Error).message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPatientDetails();
    }, []);

    // Handle onSubmit callback
    const handleHealthInfoSubmit = () => {
        setUserExists(true); // Set userExists to true to show PatientReport
        fetchPatientDetails(); // Refetch the patient report
    };

    if (loading) return <PuffLoader />;
    if (!userExists)
        return <HealthInformation onSubmit={handleHealthInfoSubmit} />;

    return (
        <div className="flex flex-col w-full sm:w-3/4 gap-3 bg-white rounded-3xl mb-14">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Health Report:</CardTitle>
                    <CardDescription className="text-black/70">
                        As per data provided by user...
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid lg:grid-cols-2 capitalize gap-3">
                        {error ? (
                            <p className="text-md text-medium text-red-700">
                                Error loading patient report: {error}
                            </p>
                        ) : (
                            <>
                                <p className="text-black text-lg capitalize px-1">
                                    <span className="font-medium">
                                        Blood Pressure:
                                    </span>{" "}
                                    {" " + bloodps}
                                </p>
                                <p className="text-black text-lg capitalize px-1">
                                    <span className="font-medium">
                                        Allergy:
                                    </span>{" "}
                                    {" " + allergy ? "Yes" : "No"}
                                </p>
                                <p className="text-black text-lg capitalize px-1">
                                    <span className="font-medium">
                                        Smoking History:
                                    </span>{" "}
                                    {" " + smoking ? "Yes" : "No"}
                                </p>
                                <p className="text-black text-lg capitalize px-1">
                                    <span className="font-medium">
                                        Alcohol Consumption:
                                    </span>{" "}
                                    {" " + alcohol ? "Yes" : "No"}
                                </p>
                            </>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default PatientReport;
