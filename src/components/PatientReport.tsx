import React, { useEffect, useState } from "react";
import PuffLoader from "react-spinners/PuffLoader";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./ui/card";
import HealthInformation from "./HealthInformation";

interface ReportItem {
    label: string;
    value: string | number;
}

const PatientReport: React.FC = () => {
    const [userExists, setUserExists] = useState<boolean>(true);
    const [patientReport, setPatientReport] = useState<ReportItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPatientDetails = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                "https://run.mocky.io/v3/ef544cb3-32b5-490b-81eb-ff86de4d2830"
            );
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            } else if (response.status === 204) {
                setUserExists(false);
                setLoading(false);
                return;
            }
            const data = await response.json();
            setPatientReport(data.report);
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
        <div className="flex flex-col w-full sm:w-3/4 gap-3 bg-white rounded-3xl">
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
                            <p className="text-lg text-red-500">
                                Error loading patient report: {error}
                            </p>
                        ) : (
                            patientReport.slice(7,11).map((item, index) => (
                                <p
                                    key={index}
                                    className="text-black text-lg capitalize px-1"
                                >
                                    <span className="font-medium">
                                        {item.label}:
                                    </span>{" "}
                                    {" " + item.value}
                                </p>
                            ))
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default PatientReport;
