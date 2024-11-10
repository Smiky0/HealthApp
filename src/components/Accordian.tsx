import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import DiabtesData from "./DiabtesData";
import LungsData from "./LungsData";
import HeartData from "./HeartData";
import BrainData from "./BrainData";
import LungCancerData from "./LungCancerData";

export default function Accordian() {
    return (
        <Accordion
            type="single"
            collapsible
            className="w-full flex flex-col gap-6 md:w-3/4 lg:w-1/2 mb-14"
        >
            <AccordionItem
                value="item-1"
                className="bg-gradient-to-r from-orange-300  to-yellow-200/60 rounded-3xl"
            >
                <AccordionTrigger>Calculate Diabetes</AccordionTrigger>
                <AccordionContent className="flex justify-center pb-0 sm:pb-10">
                    <DiabtesData />
                </AccordionContent>
            </AccordionItem>
            <AccordionItem
                value="item-2"
                className="bg-gradient-to-r from-blue-200 to-purple-200/60 rounded-3xl"
            >
                <AccordionTrigger>analyze lungs problem</AccordionTrigger>
                <AccordionContent className="flex justify-center pb-0 sm:pb-10">
                    <LungsData />
                </AccordionContent>
            </AccordionItem>
            <AccordionItem
                value="item-3"
                className="bg-gradient-to-r  from-green-200/60 to-yellow-200 rounded-3xl"
            >
                <AccordionTrigger>chances of heart failure</AccordionTrigger>
                <AccordionContent className="flex justify-center pb-0 sm:pb-10">
                    <HeartData />
                </AccordionContent>
            </AccordionItem>
            <AccordionItem
                value="item-4"
                className="bg-gradient-to-r from-green-200  to-purple-200/60 rounded-3xl"
            >
                <AccordionTrigger>Brain Tumor Detection</AccordionTrigger>
                <AccordionContent className="flex justify-center pb-0 sm:pb-10">
                    <BrainData />
                </AccordionContent>
            </AccordionItem>
            <AccordionItem
                value="item-5"
                className="bg-gradient-to-r from-pink-200  to-red-200/60 rounded-3xl"
            >
                <AccordionTrigger>Lung Cancer Prediction</AccordionTrigger>
                <AccordionContent className="flex justify-center pb-0 sm:pb-10">
                    <LungCancerData />
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}
