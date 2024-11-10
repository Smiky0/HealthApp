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

interface PatientDetailsProps {
    onLoadComplete: () => void;
}

const PatientDetails: React.FC<PatientDetailsProps> = ({ onLoadComplete }) => {
    const [name, setName] = useState<string>("");
    const [age, setAge] = useState<string>("");
    const [gender, setGender] = useState<string>("");
    const [height, setHeight] = useState<string>("");
    const [weight, setWeight] = useState<string>("");
    const [bmi, setBmi] = useState<string>("");
    const [bloodps, setBloodPS] = useState("");
    const [allergy, setAllergy] = useState<string>("");
    const [smoking, setSmoking] = useState<string>("");
    const [alcohol, setAlcohol] = useState<string>("");
    const [userExists, setUserExists] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const userId = auth.currentUser?.uid;

    const fetchPatientDetails = async () => {
        try {
            const response = await fetch(
                "https://health-track-app-cm4e.onrender.com/getuserdata/" +
                    userId,
                // "https://run.mocky.io/v3/ec48f3ca-c6d0-47dd-bb45-a3f9759e794d",
                {
                    method: "GET",
                }
            );
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            } else if (response.status === 204) {
                setLoading(false);
                setUserExists(false);
                return;
            }

            const data = await response.json();
            onLoadComplete();
            setLoading(false);

            // Set individual states with the fetched data
            setName(data.name || "");
            setAge(data.age || "");
            setGender(data.gender || "");
            setHeight(data.height || "");
            setWeight(data.weight || "");
            setBmi(data.bmi || "");
            setBloodPS(data.bloodpressure || "");
            setAllergy(data.allergy || "");
            setSmoking(data.smoking || "");
            setAlcohol(data.alcohol || "");
        } catch (error) {
            setLoading(false);
            setError((error as Error).message);
        }
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
        <>
            <div className="flex flex-col w-full sm:w-3/4 gap-3 bg-white rounded-3xl">
                <Card>
                    <CardHeader>
                        <CardTitle>Personal Details:</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {error ? (
                            <p className="text-md text-medium text-red-700">
                                Error loading patient report: {error}
                            </p>
                        ) : (
                            <>
                                <p className="text-black text-lg capitalize px-1">
                                    <span className="font-medium">
                                        Full Name:
                                    </span>
                                    {" " + name}
                                </p>
                                <p className="text-black text-lg capitalize px-1">
                                    <span className="font-medium">Gender:</span>
                                    {" " +
                                        (gender === "1" ? " Male" : " Female")}
                                </p>
                                <p className="text-black text-lg capitalize px-1">
                                    <span className="font-medium">Age:</span>
                                    {" " + age}
                                </p>
                                <p className="text-black text-lg  px-1">
                                    <span className="font-medium">
                                        Height (in cm):
                                    </span>
                                    {" " + height}
                                </p>
                                <p className="text-black text-lg  px-1">
                                    <span className="font-medium">
                                        Weight (in kg):
                                    </span>
                                    {" " + weight}
                                </p>
                                <p className="text-black text-lg capitalize px-1">
                                    <span className="font-medium">BMI:</span>
                                    {" " + bmi}
                                </p>
                            </>
                        )}
                    </CardContent>
                </Card>
            </div>
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
                                        {" " + (allergy === "1" ? "Yes" : "No")}
                                    </p>
                                    <p className="text-black text-lg capitalize px-1">
                                        <span className="font-medium">
                                            Smoking History:
                                        </span>{" "}
                                        {" " + (smoking === "1" ? "Yes" : "No")}
                                    </p>
                                    <p className="text-black text-lg capitalize px-1">
                                        <span className="font-medium">
                                            Alcohol Consumption:
                                        </span>{" "}
                                        {" " + (alcohol === "1" ? "Yes" : "No")}
                                    </p>
                                </>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default PatientDetails;