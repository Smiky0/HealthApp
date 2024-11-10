import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import PuffLoader from "react-spinners/PuffLoader";
import UserInformation from "./UserInformation";

interface PatientDetailItem {
    label: string;
    value: string | number;
}

const PatientDetails: React.FC = () => {
    const [patientDetails, setPatientDetails] = useState<PatientDetailItem[]>(
        []
    );
    const [userExists, setUserExists] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPatientDetails = async () => {
        // Fetch data from the API endpoint
        fetch("https://run.mocky.io/v3/ef544cb3-32b5-490b-81eb-ff86de4d2830")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                } else if (response.status === 204) {
                    setLoading(false);
                    setUserExists(false);
                    return;
                } else {
                    return response.json();
                }
            })
            .then((data) => {
                setLoading(false);
                setPatientDetails(data.details);
            })
            .catch((error) => {
                setLoading(false);
                setError(error.message);
            });
    };
    useEffect(() => {
        fetchPatientDetails();
    }, []);
    const handleSubmit = () => {
        fetchPatientDetails();
    };

    if (loading) {
        return <PuffLoader />;
    }
    if (!userExists) {
        return <UserInformation onSubmit={handleSubmit} />;
    }

    return (
        <div className="flex flex-col w-full sm:w-3/4 gap-3 bg-white rounded-3xl">
            <Card>
                <CardHeader>
                    <CardTitle>Personal Details:</CardTitle>
                </CardHeader>
                <CardContent>
                    {error ? (
                        <p className="text-lg text-red-500">
                            Error loading patient report: {error}
                        </p>
                    ) : (
                        patientDetails.slice(1, 7).map((detail, index) => (
                            <p
                                key={index}
                                className="text-black text-lg capitalize px-1"
                            >
                                <span className="font-medium">
                                    {detail.label}:
                                </span>
                                {" " + detail.value}
                            </p>
                        ))
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default PatientDetails;
