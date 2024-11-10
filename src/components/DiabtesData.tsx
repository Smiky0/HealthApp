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

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { Input } from "./ui/input";
import { auth } from "./firebase";

// Define the validation schema with Zod
const formSchema = z.object({
    userid: z.string().optional(),
    heart_disease: z.string(),
    HbA1c_level: z.string(),
    blood_glucose_level: z.string(),
});

export default function DiabtesData() {
    const userId = auth.currentUser?.uid;
    // Initialize useForm with zodResolver
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            userid: userId,
            heart_disease: "",
            HbA1c_level: "",
            blood_glucose_level: "",
        },
    });

    // Handle form submission
    const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log("Data: ", data);
        // send data to backend
    };

    // Handle form reset
    const resetForm = () => {
        form.reset();
    };

    return (
        <div className="flex flex-col w-full sm:w-3/4 gap-3 bg-white rounded-3xl ">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Diabetes</CardTitle>
                    <CardDescription className="text-black/70">
                        Predicted by our new AI model✨✨
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 w-full items-center gap-6">
                            {/* Heart Disease Select */}
                            <div className="flex flex-col space-y-1.5">
                                <Label
                                    className="text-md"
                                    htmlFor="heart_disease"
                                >
                                    Heart Disease
                                </Label>
                                <Controller
                                    name="heart_disease"
                                    control={form.control}
                                    render={({ field }) => (
                                        <Select
                                            value={field.value} // Bind to the form value
                                            onValueChange={field.onChange} // Update value on change
                                        >
                                            <SelectTrigger id="heart-disease">
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent position="popper">
                                                <SelectItem value="yes">
                                                    Yes
                                                </SelectItem>
                                                <SelectItem value="no">
                                                    No
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>

                            {/* HbiAc Level Select */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">HbA1c Level</Label>
                                <Input
                                    id="name"
                                    placeholder="Your HbA1c Level"
                                />
                            </div>
                            {/* blood glucose level */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">
                                    Blood Glucose Level
                                </Label>
                                <Input
                                    id="name"
                                    placeholder="Your Blood Glucose Level"
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>

                <CardFooter className="flex justify-between">
                    {/* Reset Button */}
                    <Button
                        className="bg-red-400 hover:bg-red-800"
                        onClick={resetForm}
                    >
                        Reset
                    </Button>

                    {/* Predict Button */}
                    <Button
                        className="bg-black text-white"
                        variant="outline"
                        type="submit"
                        onClick={form.handleSubmit(onSubmit)} // Use form submission here
                    >
                        Predict with AI
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
