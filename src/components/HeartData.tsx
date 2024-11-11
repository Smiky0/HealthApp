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
import { Input } from "./ui/input";
import { useState } from "react";
import { auth } from "./firebase";
import { Loader2 } from "lucide-react";

export default function HeartData() {
    const [chestpaintype, setChestPainType] = useState("");
    const [cholesterol, setCholesterol] = useState("");
    const [fastingbs, setFastingbs] = useState("");
    const [maxhr, setMaxhr] = useState("");
    const [exerciseangina, setExerciseAngina] = useState("");
    const [oldpeak, setOldpeak] = useState("");
    const [st_slope, setStSlope] = useState("");
    const [responseData, setResponseData] = useState<any>(null);
    const [jsondata, setJsondata] = useState<any>(null);

    const [responseLoading, setResponseLoading] = useState(false);

    const userid = auth.currentUser?.uid;

    const userData = {
        userid,
        chestpaintype,
        cholesterol,
        fastingbs,
        maxhr,
        exerciseangina,
        oldpeak,
        st_slope: st_slope,
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Check if all fields are filled
        const isFormComplete =
            chestpaintype &&
            cholesterol &&
            fastingbs &&
            maxhr &&
            exerciseangina &&
            oldpeak &&
            st_slope;

        if (!isFormComplete) {
            // setFormFilled(false);
            return;
        }

        try {
            setResponseLoading(true);
            const response = await fetch(
                import.meta.env.VITE_BACKEND_API_URL + "model/heartfailure",
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
            // console.log(response.json());

            const jsonresponse = await response.json();
            setResponseData(true);
            if (jsonresponse["heart"] === "Yes") {
                setJsondata("You need to get checked");
            } else if (jsonresponse["heart"] === "No") {
                setJsondata("You seem healthy");
            }
        } catch (error) {
            console.error("Error submitting data:", error);
        } finally {
            setResponseLoading(false);
        }
    };

    return (
        <div className="flex flex-col w-full sm:w-3/4 gap-3 bg-white rounded-3xl">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Heart Failure Prediction</CardTitle>
                    <CardDescription className="text-black/70">
                        Predicted by our AI model✨✨
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 w-full items-center gap-6">
                            {/* Chest Pain Type Select */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="chestPainType">
                                    Chest Pain Type
                                </Label>
                                <Select
                                    value={chestpaintype}
                                    onValueChange={setChestPainType}
                                >
                                    <SelectTrigger id="chestPainType">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        <SelectItem value="0">ASY</SelectItem>
                                        <SelectItem value="2">NAP</SelectItem>
                                        <SelectItem value="1">ATA</SelectItem>
                                        <SelectItem value="3">TA</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Cholesterol Input */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="cholesterol">Cholesterol</Label>
                                <Input
                                    id="cholesterol"
                                    placeholder="Cholesterol"
                                    value={cholesterol}
                                    onChange={(e) =>
                                        setCholesterol(e.target.value)
                                    }
                                />
                            </div>

                            {/* Fasting Blood Sugar Input */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="fastingBloodSugar">
                                    Fasting Blood Sugar
                                </Label>
                                <Input
                                    id="fastingBloodSugar"
                                    placeholder="Fasting Blood Sugar"
                                    value={fastingbs}
                                    onChange={(e) =>
                                        setFastingbs(e.target.value)
                                    }
                                />
                            </div>

                            {/* Max Heart Rate Input */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="maxHeartRate">
                                    Max Heart Rate
                                </Label>
                                <Input
                                    id="maxHeartRate"
                                    placeholder="Max Heart Rate"
                                    value={maxhr}
                                    onChange={(e) => setMaxhr(e.target.value)}
                                />
                            </div>

                            {/* Exercise Angina Select */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="exerciseAngina">
                                    Exercise Angina
                                </Label>
                                <Select
                                    value={exerciseangina}
                                    onValueChange={setExerciseAngina}
                                >
                                    <SelectTrigger id="exerciseAngina">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        <SelectItem value="1">Yes</SelectItem>
                                        <SelectItem value="0">No</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Old Peak Input */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="oldPeak">Old Peak</Label>
                                <Input
                                    id="oldPeak"
                                    placeholder="Old Peak"
                                    value={oldpeak}
                                    onChange={(e) => setOldpeak(e.target.value)}
                                />
                            </div>

                            {/* ST Slope Select */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="stSlope">ST Slope</Label>
                                <Select
                                    value={st_slope}
                                    onValueChange={setStSlope}
                                >
                                    <SelectTrigger id="stSlope">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        <SelectItem value="1">Flat</SelectItem>
                                        <SelectItem value="2">Up</SelectItem>
                                        <SelectItem value="0">Down</SelectItem>
                                    </SelectContent>
                                </Select>
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

                <CardFooter className="flex flex-col justify-between">
                    <p className="text-red-700 font-medium text-sm pb-2">
                        *All fields must be filled.
                    </p>
                    {responseLoading ? (
                        <Button
                            disabled
                            type="submit"
                            className="h-10 text-lg"
                            onClick={handleSubmit}
                        >
                            <Loader2 className="animate-spin" />
                            Predict with AI
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                            className="h-10 text-lg"
                            onClick={handleSubmit}
                        >
                            Predict with AI
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
}
