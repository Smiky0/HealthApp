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
import { useState } from "react";

export default function HealthInformation({
    onSubmit,
}: {
    onSubmit: () => void;
}) {
    const [bloodpressure, setBloodPressure] = useState("");
    const [allergy, setAllergy] = useState("");
    const [smoking, setSmoking] = useState("");
    const [alcohol, setAlcohol] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const userId = auth.currentUser?.uid;

        const userData = {
            userId,
            bloodpressure,
            allergy,
            smoking,
            alcohol,
        };

        try {
            // Send user data to your backend
            const response = await fetch("api/basic", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });
            console.log(JSON.stringify(userData));

            if (!response.ok) {
                throw new Error("Failed to submit data");
            }

            // Call the onSubmit callback to trigger the refetch of patient data
            onSubmit();
        } catch (error) {
            console.error("Error submitting data:", error);
        }
    };
    return (
        <div className="flex flex-col w-full sm:w-1/2 gap-3 bg-white rounded-3xl mb-14">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Health Report:</CardTitle>
                    <CardDescription>
                        Please enter correct details
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Blood Pressure</Label>
                                <Input
                                    value={bloodpressure}
                                    onChange={(e) =>
                                        setBloodPressure(e.target.value)
                                    }
                                    id="name"
                                    placeholder="Your Blood Pressure"
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="framework">Allergy</Label>
                                <Select
                                    value={allergy}
                                    onValueChange={setAllergy}
                                >
                                    <SelectTrigger id="framework">
                                        <SelectValue placeholder="Select yes/no" />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        <SelectItem value="1">Yes</SelectItem>
                                        <SelectItem value="0">No</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="framework">Smoking</Label>
                                <Select
                                    value={smoking}
                                    onValueChange={setSmoking}
                                >
                                    <SelectTrigger id="framework">
                                        <SelectValue placeholder="Select yes/no" />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        <SelectItem value="1">Yes</SelectItem>
                                        <SelectItem value="0">No</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="framework">
                                    Alcohol Comsumption
                                </Label>
                                <Select
                                    value={alcohol}
                                    onValueChange={setAlcohol}
                                >
                                    <SelectTrigger id="framework">
                                        <SelectValue placeholder="Select yes/no" />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        <SelectItem value="1">Yes</SelectItem>
                                        <SelectItem value="0">No</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Button
                        onClick={handleSubmit}
                        type="submit"
                        className="h-10 text-lg"
                    >
                        Submit
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
