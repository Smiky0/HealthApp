import React, { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./ui/card";
import PuffLoader from "react-spinners/PuffLoader";
import UserInformation from "./UserInformation";
import { auth } from "./firebase";
import { Button } from "./ui/button";

interface PatientDetailsProps {
    onLoadComplete: () => void;
}

interface UserDetails {
    name: string;
    age: string;
    gender: string;
    height: string;
    weight: string;
    bloodpressure: string;
    allergy: string;
    smoking: string;
    alcohol: string;
}

const PatientDetails: React.FC<PatientDetailsProps> = ({ onLoadComplete }) => {
    const [userData, setUserData] = useState<UserDetails | null>(null);
    const [userExists, setUserExists] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<"view" | "edit" | "create">(
        "view"
    );

    const userId = auth.currentUser?.uid;

    const fetchPatientDetails = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_API_URL}getuserdata/${userId}`,
                {
                    method: "GET",
                }
            );

            if (!response.ok) throw new Error("Failed to fetch data");

            if (response.status === 204) {
                setUserExists(false);
                setViewMode("create"); // Redirect to creation mode if user does not exist
                return;
            }

            const data = await response.json();
            onLoadComplete();

            // Populate user data
            setUserData({
                name: data.name || "",
                age: data.age || "",
                gender: data.gender != null ? String(data.gender) : "",
                height: data.height || "",
                weight: data.weight || "",
                bloodpressure: data.bloodpressure || "",
                allergy: data.allergy != null ? String(data.allergy) : "",
                smoking: data.smoking != null ? String(data.smoking) : "",
                alcohol: data.alcohol != null ? String(data.alcohol) : "",
            });
            setUserExists(true);
            setViewMode("view"); // Show data view mode for existing user
        } catch (error) {
            setError((error as Error).message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPatientDetails();
    }, []);

    // Handle submission from UserInformation
    const handleSubmit = () => {
        fetchPatientDetails(); // Refresh data after submit
        setViewMode("view"); // Return to data view mode
    };

    const handleUpdateClick = () => {
        setViewMode("edit"); // Set to edit mode when user clicks update
    };

    if (loading) return <PuffLoader />;

    // If user doesn't exist, or in create mode, render UserInformation without initial data
    if (viewMode === "create" && !userExists) {
        return <UserInformation onSubmit={handleSubmit} />;
    }

    // If in edit mode, render UserInformation with initialData for updating
    if (viewMode === "edit") {
        return (
            <UserInformation onSubmit={handleSubmit} initialData={userData} />
        );
    }

    // In view mode, render user details and update button
    return (
        <>
            {userData && (
                <>
                    <Button
                        variant="outline"
                        className="w-44 h-10 text-md p-6 rounded-3xl mb-4"
                        onClick={handleUpdateClick}
                    >
                        Update Data
                    </Button>

                    {/* Personal Details Card */}
                    <div className="flex flex-col w-full sm:w-3/4 gap-3 bg-white rounded-3xl">
                        <Card>
                            <CardHeader>
                                <CardTitle>Personal Details:</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {error ? (
                                    <p className="text-md text-red-700">
                                        Error loading patient report: {error}
                                    </p>
                                ) : (
                                    <>
                                        <p className="text-black text-lg px-1">
                                            <span className="font-medium">
                                                Full Name:
                                            </span>{" "}
                                            {userData.name}
                                        </p>
                                        <p className="text-black text-lg px-1">
                                            <span className="font-medium">
                                                Gender:
                                            </span>
                                            {userData.gender === "1"
                                                ? "Male"
                                                : "Female"}
                                        </p>
                                        <p className="text-black text-lg px-1">
                                            <span className="font-medium">
                                                Age:
                                            </span>{" "}
                                            {userData.age}
                                        </p>
                                        <p className="text-black text-lg px-1">
                                            <span className="font-medium">
                                                Height (cm):
                                            </span>{" "}
                                            {userData.height}
                                        </p>
                                        <p className="text-black text-lg px-1">
                                            <span className="font-medium">
                                                Weight (kg):
                                            </span>{" "}
                                            {userData.weight}
                                        </p>
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Health Report Card */}
                    <div className="flex flex-col w-full sm:w-3/4 gap-3 bg-white rounded-3xl mb-14">
                        <Card>
                            <CardHeader>
                                <CardTitle>Health Report:</CardTitle>
                                <CardDescription className="text-black/70">
                                    As per data provided by user...
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {error ? (
                                    <p className="text-md text-red-700">
                                        Error loading patient report: {error}
                                    </p>
                                ) : (
                                    <div className="grid lg:grid-cols-2 capitalize gap-3">
                                        <p className="text-black text-lg px-1">
                                            <span className="font-medium">
                                                Blood Pressure:
                                            </span>{" "}
                                            {userData.bloodpressure}
                                        </p>
                                        <p className="text-black text-lg px-1">
                                            <span className="font-medium">
                                                Allergy:
                                            </span>
                                            {userData.allergy === "1"
                                                ? "Yes"
                                                : "No"}
                                        </p>
                                        <p className="text-black text-lg px-1">
                                            <span className="font-medium">
                                                Smoking History:
                                            </span>
                                            {userData.smoking === "1"
                                                ? "Yes"
                                                : "No"}
                                        </p>
                                        <p className="text-black text-lg px-1">
                                            <span className="font-medium">
                                                Alcohol Consumption:
                                            </span>
                                            {userData.alcohol === "1"
                                                ? "Yes"
                                                : "No"}
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </>
            )}
        </>
    );
};

export default PatientDetails;
