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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { auth } from "./firebase";

// Define validation schema with Zod
const formSchema = z.object({
    userid: z.string().optional(),
    chestpaintype: z.string(),
    cholesterol: z.string(),
    fastingbs: z.string(),
    maxhr: z.string(),
    exerciseangina: z.string(),
    oldpeak: z.string(),
    st_slope: z.string(),
});

export default function HeartData() {
    // Initialize useForm with zodResolver
    const userId = auth.currentUser?.uid;
    const { control, handleSubmit, reset } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            userid: userId,
            chestpaintype: "",
            cholesterol: "",
            fastingbs: "",
            maxhr: "",
            exerciseangina: "",
            oldpeak: "",
            st_slope: "",
        },
    });

    // Handle form submission
    const onSubmit = (data: any) => {
        console.log("Data: ", data);
        // Send data to backend
    };

    // Handle form reset
    const resetForm = () => {
        reset();
    };

    return (
        <div className="flex flex-col w-full sm:w-3/4 gap-3 bg-white rounded-3xl">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Heart Failure</CardTitle>
                    <CardDescription className="text-black/70">
                        Predicted by our new AI model✨✨
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {/* Wrap the entire form inside the form element */}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 w-full items-center gap-6">
                            {/* Chest Pain Type Select */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="chestPainType">
                                    Chest Pain Type
                                </Label>
                                <Controller
                                    name="chestpaintype"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger id="chestPainType">
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent position="popper">
                                                <SelectItem value="0">
                                                    ASY
                                                </SelectItem>
                                                <SelectItem value="2">
                                                    NAP
                                                </SelectItem>
                                                <SelectItem value="1">
                                                    ATA
                                                </SelectItem>
                                                <SelectItem value="3">
                                                    TA
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>

                            {/* Cholesterol Input */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="cholesterol">Cholesterol</Label>
                                <Controller
                                    name="cholesterol"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            placeholder="Cholesterol"
                                            {...field}
                                        />
                                    )}
                                />
                            </div>
                            {/* Fasting Blood Sugar Input */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="fastingBloodSugar">
                                    Fasting Blood Sugar
                                </Label>
                                <Controller
                                    name="fastingbs"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            placeholder="Fasting blood sugar"
                                            {...field}
                                        />
                                    )}
                                />
                            </div>
                            {/* Max HR Input */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="maxHR">Max Heart Rate</Label>
                                <Controller
                                    name="maxhr"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            placeholder="Maximum heart rate"
                                            {...field}
                                        />
                                    )}
                                />
                            </div>
                            {/* Exercise Angina Select */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="exerciseAngina">
                                    Exercise Induced Angina
                                </Label>
                                <Controller
                                    name="exerciseangina"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger id="exerciseAngina">
                                                <SelectValue placeholder="Select" />
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
                                    )}
                                />
                            </div>
                            {/* Old Peak Input */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="oldPeak">Old Peak</Label>
                                <Controller
                                    name="oldpeak"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            placeholder="Old Peak"
                                            {...field}
                                        />
                                    )}
                                />
                            </div>

                            {/* ST Slope Select */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="stSlope">ST Slope</Label>
                                <Controller
                                    name="st_slope"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger id="stSlope">
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent position="popper">
                                                <SelectItem value="1">
                                                    Flat
                                                </SelectItem>
                                                <SelectItem value="2">
                                                    Up
                                                </SelectItem>
                                                <SelectItem value="0">
                                                    Down
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
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
                        type="submit" // This ensures form submission is triggered
                        className="bg-black text-white"
                        variant="outline"
                        onClick={handleSubmit(onSubmit)}
                    >
                        Predict with AI
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
