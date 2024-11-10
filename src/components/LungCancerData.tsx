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
import { auth } from "./firebase";

// Define validation schema with Zod
const formSchema = z.object({
    userid: z.string().optional(),
    yellow_fingers: z.string(),
    anxiety: z.string(),
    chronic_disease: z.string(),
    fatigue: z.string(),
    wheezing: z.string(),
    coughing: z.string(),
    shortness_of_breath: z.string(),
    swallowing_difficulty: z.string(),
    chest_pain: z.string(),
});

export default function LungCancerData() {
    const userId = auth.currentUser?.uid;
    // Initialize useForm with zodResolver
    const { control, handleSubmit, reset } = useForm<
        z.infer<typeof formSchema>
    >({
        resolver: zodResolver(formSchema),
        defaultValues: {
            userid: userId,
            yellow_fingers: "",
            anxiety: "",
            chronic_disease: "",
            fatigue: "",
            wheezing: "",
            coughing: "",
            shortness_of_breath: "",
            swallowing_difficulty: "",
            chest_pain: "",
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
                    <CardTitle>Lung Cancer Prediction</CardTitle>
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
                                <Label htmlFor="yellow_fingers">
                                    Yellow Fingers
                                </Label>
                                <Controller
                                    name="yellow_fingers"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger id="yellow_fingers">
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

                            {/* Anxiety Input */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="anxiety">Anxiety</Label>
                                <Controller
                                    name="anxiety"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger id="anxiety">
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
                            {/* chronic disease Input */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="chronic_disease">
                                    Chronic Disease
                                </Label>
                                <Controller
                                    name="chronic_disease"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger id="chronic_disease">
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
                            {/* fatigue Input */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="fatigue">Fatigue</Label>
                                <Controller
                                    name="fatigue"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger id="fatigue">
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
                            {/* wheezing Input */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="wheezing">Wheezing</Label>
                                <Controller
                                    name="wheezing"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger id="wheezing">
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
                            {/* coughing Input */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="coughing">Coughing</Label>
                                <Controller
                                    name="coughing"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger id="coughing">
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
                            {/* shortness_of_breath Input */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="shortness_of_breath">
                                    Shortness Of Breath
                                </Label>
                                <Controller
                                    name="shortness_of_breath"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger id="shortness_of_breath">
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
                            {/* swallowing_difficulty Input */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="swallowing_difficulty">
                                    Swallowing Difficulty
                                </Label>
                                <Controller
                                    name="swallowing_difficulty"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger id="swallowing_difficulty">
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
                            {/* chest_pain Input */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="chest_pain">Chest Pain</Label>
                                <Controller
                                    name="chest_pain"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger id="chest_pain">
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
