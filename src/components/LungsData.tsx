import { useState, useRef } from "react";
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
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

export default function LungsData() {
    const [file, setFile] = useState<File | null>(null);
    const [base64, setBase64] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [responseData, setResponseData] = useState<boolean>(false);
    const [lungsData, setLungsData] = useState<any>(null);

    const [responseLoading, setResponseLoading] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            console.log(file);
            convertFileToBase64(selectedFile);
        }
    };

    const convertFileToBase64 = (file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result as string;
            setBase64(base64String.split("base64,")[1]);
        };
        reader.readAsDataURL(file);
    };

    const handlePredict = async () => {
        if (base64) {
            try {
                setResponseLoading(true);
                const response = await fetch(
                    import.meta.env.VITE_BACKEND_API_URL + "model/lungimage",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ img: base64 }),
                    }
                );

                const jsonresponse = await response.json();
                // console.log(jsonresponse);
                setResponseData(true);
                // console.log(jsonresponse);

                if (
                    jsonresponse["tuber"] === "normal" &&
                    jsonresponse["covid"] === "normal"
                ) {
                    setLungsData("You seem healthy");
                } else {
                    setLungsData("Need to get checked");
                }
            } catch (error) {
                console.error("Error submitting data:", error);
            } finally {
                setResponseLoading(false);
            }
        } else {
            console.log("No file selected or processing failed.");
        }
    };

    const handleReset = () => {
        setFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="flex flex-col w-full sm:w-3/4 gap-3 bg-white rounded-3xl">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Aanalyze Lungs X-Ray</CardTitle>
                    <CardDescription className="text-black/70">
                        Predicted by our new AI model✨✨
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Label htmlFor="picture">Upload X-Ray Photo</Label>
                    <div className="flex w-full max-w-sm items-center gap-1.5">
                        <Input
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            id="picture"
                            type="file"
                        />
                    </div>
                    {responseData && (
                        <div className="flex justify-center items-center mt-4 p-4 text-lg rounded-2xl bg-slate-300">
                            <p className="font-medium tracking-wide">
                                {lungsData}
                            </p>
                        </div>
                    )}
                </CardContent>

                <CardFooter className="flex justify-between">
                    <Button
                        onClick={handleReset}
                        className="bg-red-400 hover:bg-red-800"
                    >
                        Reset
                    </Button>
                    {responseLoading ? (
                        <Button
                            disabled
                            onClick={handlePredict}
                            className="bg-black text-white"
                            variant="outline"
                        >
                            <Loader2 className="animate-spin" />
                            Predict with AI
                        </Button>
                    ) : (
                        <Button
                            onClick={handlePredict}
                            className="bg-black text-white"
                            variant="outline"
                        >
                            Predict with AI
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
}
