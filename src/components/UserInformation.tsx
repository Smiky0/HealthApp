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

export default function UserInformation({
    onSubmit,
}: {
    onSubmit: () => void;
}) {
    const [fullName, setFullName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const userId = auth.currentUser?.uid;

        const userData = {
            userId,
            fullName,
            age,
            gender,
            height,
            weight,
        };

        try {
            // Send user data to your backend
            const response = await fetch(
                "api/basic",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(userData),
                }
            );
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
        <div className="flex flex-col w-full sm:w-1/2 gap-3 bg-white rounded-3xl">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Personal Details:</CardTitle>
                    <CardDescription>
                        Please enter correct details
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    value={fullName}
                                    onChange={(e) =>
                                        setFullName(e.target.value)
                                    }
                                    id="name"
                                    placeholder="Your Full Name"
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Your Age</Label>
                                <Input
                                    id="name"
                                    placeholder="Present Age"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="framework">Gender</Label>
                                <Select
                                    value={gender}
                                    onValueChange={setGender}
                                >
                                    <SelectTrigger id="framework">
                                        <SelectValue placeholder="Select Gender" />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        <SelectItem value="1">Male</SelectItem>
                                        <SelectItem value="0">
                                            Female
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Height (in cm)</Label>
                                <Input
                                    id="name"
                                    placeholder="Present Height"
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Weight (in kg)</Label>
                                <Input
                                    id="name"
                                    placeholder="Present Weight"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                />
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
