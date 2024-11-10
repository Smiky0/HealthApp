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

import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { auth } from "./firebase";

export default function LungCancerData() {
    const [yellowFingers, setYellowFingers] = useState<string>("");
    const [anxiety, setAnxiety] = useState<string>("");
    const [chronicDisease, setChronicDisease] = useState<string>("");
    const [fatigue, setFatigue] = useState<string>("");
    const [wheezing, setWheezing] = useState<string>("");
    const [coughing, setCoughing] = useState<string>("");
    const [shortnessOfBreath, setShortnessOfBreath] = useState<string>("");
    const [swallowingDifficulty, setSwallowingDifficulty] =
        useState<string>("");
    const [chestPain, setChestPain] = useState<string>("");

    const [responseData, setResponseData] = useState<any>(null);
    const [jsondata, setJsondata] = useState<any>(null);

    // Track form validation state
    const [formFilled, setFormFilled] = useState(false);

    const userId = auth.currentUser?.uid;

    const userData = {
        userid: userId,
        yellow_fingers: yellowFingers,
        anxiety: anxiety,
        chronic_disease: chronicDisease,
        fatigue: fatigue,
        wheezing: wheezing,
        coughing: coughing,
        shortness_of_breath: shortnessOfBreath,
        swallowing_difficulty: swallowingDifficulty,
        chest_pain: chestPain,
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Check if all fields are filled
        if (
            yellowFingers &&
            anxiety &&
            chronicDisease &&
            fatigue &&
            wheezing &&
            coughing &&
            shortnessOfBreath &&
            swallowingDifficulty &&
            chestPain
        ) {
            setFormFilled(true);
        } else {
            setFormFilled(false);
            return;
        }

        if (formFilled) {
            console.log(userData);
            try {
                const response = await fetch(
                    "https://health-track-app-cm4e.onrender.com/model/lung",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(userData),
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to submit data");
                }

                // Handle successful form submission
                console.log("Data submitted successfully!");

                const jsonresponse = await response.json();
                setResponseData(true);
                if (jsonresponse["lung"] === "Yes") {
                    setJsondata("You need to get checked");
                } else if (jsonresponse["lung"] === "No") {
                    setJsondata("You seem healthy");
                }
                console.log(jsonresponse);
            } catch (error) {
                console.error("Error submitting data:", error);
            }
        }
    };

    return (
        <div className="flex flex-col w-full sm:w-1/2 gap-3 bg-white rounded-3xl">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Lung Cancer Prediction</CardTitle>
                    <CardDescription>
                        Predicted by our new AI model✨✨
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid w-full items-center gap-6">
                            {/* Yellow Fingers Select */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="yellow_fingers">
                                    Yellow Fingers
                                </Label>
                                <Select
                                    value={yellowFingers}
                                    onValueChange={setYellowFingers}
                                >
                                    <SelectTrigger id="yellow-fingers">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        <SelectItem value="1">Yes</SelectItem>
                                        <SelectItem value="0">No</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Anxiety Select */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="anxiety">Anxiety</Label>
                                <Select
                                    value={anxiety}
                                    onValueChange={setAnxiety}
                                >
                                    <SelectTrigger id="anxiety">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        <SelectItem value="1">Yes</SelectItem>
                                        <SelectItem value="0">No</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Chronic Disease Select */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="chronic_disease">
                                    Chronic Disease
                                </Label>
                                <Select
                                    value={chronicDisease}
                                    onValueChange={setChronicDisease}
                                >
                                    <SelectTrigger id="chronic-disease">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        <SelectItem value="1">Yes</SelectItem>
                                        <SelectItem value="0">No</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Fatigue Input */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="fatigue">Fatigue</Label>

                                <Select
                                    value={fatigue}
                                    onValueChange={setFatigue}
                                >
                                    <SelectTrigger id="fatigue">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        <SelectItem value="1">Yes</SelectItem>
                                        <SelectItem value="0">No</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Wheezing Input */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="wheezing">Wheezing</Label>

                                <Select
                                    value={wheezing}
                                    onValueChange={setWheezing}
                                >
                                    <SelectTrigger id="wheezing">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        <SelectItem value="1">Yes</SelectItem>
                                        <SelectItem value="0">No</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Coughing Input */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="coughing">Coughing</Label>

                                <Select
                                    value={coughing}
                                    onValueChange={setCoughing}
                                >
                                    <SelectTrigger id="coughing">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        <SelectItem value="1">Yes</SelectItem>
                                        <SelectItem value="0">No</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Shortness of Breath Input */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="shortness_of_breath">
                                    Shortness Of Breath
                                </Label>

                                <Select
                                    value={shortnessOfBreath}
                                    onValueChange={setShortnessOfBreath}
                                >
                                    <SelectTrigger id="shortness_of_breath">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        <SelectItem value="1">Yes</SelectItem>
                                        <SelectItem value="0">No</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Swallowing Difficulty Input */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="swallowing_difficulty">
                                    Swallowing Difficulty
                                </Label>

                                <Select
                                    value={swallowingDifficulty}
                                    onValueChange={setSwallowingDifficulty}
                                >
                                    <SelectTrigger id="swallowing_difficulty">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        <SelectItem value="1">Yes</SelectItem>
                                        <SelectItem value="0">No</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Chest Pain Input */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="chest_pain">Chest Pain</Label>

                                <Select
                                    value={chestPain}
                                    onValueChange={setChestPain}
                                >
                                    <SelectTrigger id="chest_pain">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        <SelectItem value="1">Yes</SelectItem>
                                        <SelectItem value="0">No</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </form>

                    {/* Display response data */}
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
                        type="submit"
                        className="h-10 text-lg"
                        onClick={handleSubmit}
                    >
                        Predict with AI
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
