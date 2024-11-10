import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { auth } from "./firebase";

export default function DiabetesData() {
    const [heartDisease, setHeartDisease] = useState<string>("");
    const [HbA1cLevel, setHbA1cLevel] = useState<string>("");
    const [bloodGlucoseLevel, setBloodGlucoseLevel] = useState<string>("");

    const [responseData, setResponseData] = useState<boolean>(false);
    const [jsondata, setJsondata] = useState<any>(null);

    // Track form validation state
    const [formFilled, setFormFilled] = useState(false);

    const userId = auth.currentUser?.uid;

    const userData = {
        userid: userId,
        heart_disease: heartDisease,
        HbA1c_level: HbA1cLevel,
        blood_glucose_level: bloodGlucoseLevel,
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Check if all fields are filled
        if (heartDisease && HbA1cLevel && bloodGlucoseLevel) {
            setFormFilled(true);
        } else {
            setFormFilled(false);
            return;
        }

        if (formFilled) {
            try {
                const response = await fetch(
                    "https://health-track-app-cm4e.onrender.com/model/diabetes",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(userData),
                    }
                );
                // console.log(JSON.stringify(userData));

                if (!response.ok) {
                    throw new Error("Failed to submit data");
                }
                // Handle successful form submission
                console.log("Data submitted successfully!");

                const jsonresponse = await response.json();
                setResponseData(true);
                if (jsonresponse["diabetes"] === "Yes") {
                    setJsondata("You need to get checked");
                } else if (jsonresponse["diabetes"] === "No") {
                    setJsondata("You seem healthy");
                }
                // console.log(jsonresponse);
            } catch (error) {
                console.error("Error submitting data:", error);
            }
        }
    };

    return (
        <div className="flex flex-col w-full sm:w-1/2 gap-3 bg-white rounded-3xl">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Diabetes Prediction</CardTitle>
                    <CardDescription>
                        Predicted by our new AI model✨✨
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid w-full items-center gap-4">
                            {/* Heart Disease Select */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="heart_disease">
                                    Heart Disease
                                </Label>
                                <Select
                                    value={heartDisease}
                                    onValueChange={setHeartDisease}
                                >
                                    <SelectTrigger id="heart-disease">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        <SelectItem value="1">Yes</SelectItem>
                                        <SelectItem value="0">No</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* HbA1c Level Input */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="HbA1c_level">HbA1c Level</Label>
                                <Input
                                    id="HbA1c_level"
                                    placeholder="Your HbA1c Level"
                                    value={HbA1cLevel}
                                    onChange={(e) =>
                                        setHbA1cLevel(e.target.value)
                                    }
                                />
                            </div>

                            {/* Blood Glucose Level Input */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="blood_glucose_level">
                                    Blood Glucose Level
                                </Label>
                                <Input
                                    id="blood_glucose_level"
                                    placeholder="Your Blood Glucose Level"
                                    value={bloodGlucoseLevel}
                                    onChange={(e) =>
                                        setBloodGlucoseLevel(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    </form>
                    {responseData && (
                        <div className="flex justify-center items-center mt-4 p-4 text-lg rounded-2xl bg-slate-300">
                            <p className="font-medium tracking-wide">
                                {jsondata}
                            </p>
                        </div>
                    )}
                </CardContent>

                <CardFooter className="flex flex-col justify-center">
                    <p className="text-red-700 font-medium text-sm pb-2">
                        *All fields must be filled.
                    </p>
                    <Button
                        onClick={handleSubmit}
                        type="submit"
                        className="h-10 text-lg"
                    >
                        Predict with AI
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
