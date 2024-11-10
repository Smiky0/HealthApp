import { useState, useEffect } from "react";
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

interface UserDetails {
    name: string;
    age: string;
    gender: string;
    height: string;
    weight: string;
}

export default function UserInformation({
    onSubmit,
    initialData,
}: {
    onSubmit: () => void;
    initialData?: UserDetails;
}) {
    const [name, setName] = useState<string>(initialData?.name || "");
    const [age, setAge] = useState<string>(initialData?.age || "");
    const [gender, setGender] = useState<string>(initialData?.gender || "");
    const [height, setHeight] = useState<string>(initialData?.height || "");
    const [weight, setWeight] = useState<string>(initialData?.weight || "");

    // check if fields are empty
    const [formFilled, setFormFilled] = useState(false);

    // set initial data if recieved
    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
            setAge(initialData.age);
            setGender(initialData.gender);
            setHeight(initialData.height);
            setWeight(initialData.weight);
        }
    }, [initialData]);
    const userid = auth.currentUser?.uid;

    const userData = {
        userid,
        name,
        gender,
        age,
        height,
        weight,
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // check if all fields are fileld
        if (name && gender && age && height && weight) {
            setFormFilled(true);
        } else {
            setFormFilled(false);
            return;
        }

        if (formFilled) {
            try {
                const response = await fetch(
                    "https://health-track-app-cm4e.onrender.com/basic",
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
                onSubmit();
            } catch (error) {
                console.error("Error submitting data:", error);
            }
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
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    id="name"
                                    placeholder="Your Full Name"
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
                                <Label htmlFor="name">Your Age</Label>
                                <Input
                                    id="name"
                                    placeholder="Present Age"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                />
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
                <CardFooter className="flex flex-col justify-center">
                    <p className="text-red-700 font-medium text-sm pb-2">
                        *All fields must to be filled.
                    </p>
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
