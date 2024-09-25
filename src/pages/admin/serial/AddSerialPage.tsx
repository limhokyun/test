import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// 폼 유효성 검사를 위한 Zod 스키마
const formSchema = z.object({
    modelName: z.string().trim().min(1, "Name is required"),

    measurementItem: z.string().trim().min(1, "Measurement item number is required"),
});

export const AddSerial = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            modelName: "",

            measurementItem: "",
        },
    });

    const dummyData: any = [{ id: "1", modelNumber: "DL-302-1p" }];

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    return (
        <Form {...form}>
            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-medium">시리얼 등록</h3>
                    <p className="text-sm text-muted-foreground">시리얼 등록 부분</p>
                </div>
                <div className="shrink-0 bg-border h-[1px] w-full"></div>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="modelName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Serial No</FormLabel>
                                <FormControl>
                                    <Input placeholder="Input a Serial Number" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="measurementItem"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Sensors</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Select a Product" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {dummyData.map((data: any, index: number) => (
                                                    <SelectItem key={index} value={data.id}>
                                                        {data.modelNumber}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit">Submit</Button>
                </form>
            </div>
        </Form>
    );
};
