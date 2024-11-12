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
import { Loader2 } from "lucide-react";

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

    const [bloodpressure, setBloodPressure] = useState<string>(
        initialData?.bloodpressure || ""
    );
    const [allergy, setAllergy] = useState<string>(initialData?.allergy || "");
    const [smoking, setSmoking] = useState<string>(initialData?.smoking || "");
    const [alcohol, setAlcohol] = useState<string>(initialData?.alcohol || "");

    // check if fields are empty
    // const [formFilled, setFormFilled] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [responseLoading, setResponseLoading] = useState(false);

    // set initial data if recieved
    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
            setAge(initialData.age);
            setGender(initialData.gender);
            setHeight(initialData.height);
            setWeight(initialData.weight);
            setBloodPressure(initialData.bloodpressure);
            setAllergy(initialData.allergy);
            setSmoking(initialData.smoking);
            setAlcohol(initialData.alcohol);
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
        bloodpressure,
        allergy,
        smoking,
        alcohol,
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // check if all fields are fileld
        const isFormComplete =
            name &&
            gender &&
            age &&
            height &&
            weight &&
            bloodpressure &&
            allergy &&
            smoking &&
            alcohol;

        if (!isFormComplete) {
            // setFormFilled(false);
            return;
        }
        // setFormFilled(true);
        try {
            setResponseLoading(true);
            const response = await fetch(
                import.meta.env.VITE_BACKEND_API_URL + "basic",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(userData),
                }
            );
            // console.log(JSON.stringify(userData));
            setFormSubmitted(true);
            if (!response.ok) {
                throw new Error("Failed to submit data");
            }
            onSubmit();
        } catch (error) {
            console.error("Error submitting data:", error);
        } finally {
            setResponseLoading(false);
        }
    };

    return (
        <>
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
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
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
                                            <SelectItem value="1">
                                                Male
                                            </SelectItem>
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
                                        onChange={(e) =>
                                            setHeight(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="name">Weight (in kg)</Label>
                                    <Input
                                        id="name"
                                        placeholder="Present Weight"
                                        value={weight}
                                        onChange={(e) =>
                                            setWeight(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex flex-col justify-center">
                        <p className="text-red-700 font-medium text-sm pb-2">
                            *All fields must to be filled.
                        </p>
                        {/* <Button
                            onClick={handleSubmit}
                            type="submit"
                            className="h-10 text-lg"
                        >
                            Submit
                        </Button> */}
                    </CardFooter>
                </Card>
            </div>
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
                                            <SelectItem value="1">
                                                Yes
                                            </SelectItem>
                                            <SelectItem value="0">
                                                No
                                            </SelectItem>
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
                                            <SelectItem value="1">
                                                Yes
                                            </SelectItem>
                                            <SelectItem value="0">
                                                No
                                            </SelectItem>
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
                                            <SelectItem value="1">
                                                Yes
                                            </SelectItem>
                                            <SelectItem value="0">
                                                No
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </form>
                        {formSubmitted && (
                            <div className="flex justify-center items-center mt-4 p-4 text-sm rounded-2xl bg-slate-300">
                                <p className="font-medium tracking-wide">
                                    Saved data! Refresh page if you don't see
                                    it..
                                </p>
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className="flex flex-col justify-center">
                        <p className="text-red-700 font-medium text-sm pb-2">
                            *All fields must to be filled.
                        </p>
                        {responseLoading ? (
                            <Button
                                disabled
                                onClick={handleSubmit}
                                type="submit"
                                className="h-10 text-lg"
                            >
                                <Loader2 className="animate-spin" />
                                Submit
                            </Button>
                        ) : (
                            <Button
                                onClick={handleSubmit}
                                type="submit"
                                className="h-10 text-lg"
                            >
                                Submit
                            </Button>
                        )}
                    </CardFooter>
                </Card>
            </div>
        </>
    );
}
