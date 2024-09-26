import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// 폼 유효성 검사를 위한 Zod 스키마
const formSchema = z.object({
    modelName: z.string().trim().min(1, "Name is required"),
    units: z
        .array(
            z.object({
                measurementRange: z
                    .array(
                        z.object({
                            min: z.string().trim().min(1, "Measurement range is required"),
                            max: z.string().trim().min(1, "Measurement range is required"),
                        })
                    )
                    .min(1) as any, // 배열 형식으로 유효성 검사
                measurementItem: z.string().trim().min(1, "Measurement item number is required"),
                unit: z.string().trim().min(1, "Unit is required"),
            })
        )
        .min(1) as any,
});

export const AddModelPage = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            modelName: "",
            units: [
                {
                    measurementRange: [{ min: "", max: "" }],
                    measurementItem: "",
                    unit: "",
                },
            ],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "units", // 배열 필드 이름
    });

    const appendRange = (index: number) => {
        const currentValues = form.getValues(`units.${index}.measurementRange`);
        form.setValue(`units.${index}.measurementRange`, [...currentValues, { min: "", max: "" }]);
    };

    const removeRange = (unitIndex: number, rangeIndex: number) => {
        const currentValues = form.getValues(`units.${unitIndex}.measurementRange`);
        const updatedValues = currentValues.filter((_: any, i: any) => i !== rangeIndex);
        form.setValue(`units.${unitIndex}.measurementRange`, updatedValues);
    };

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    return (
        <Form {...form}>
            <div className="space-y-6 lg:max-w-2xl">
                <div>
                    <h3 className="text-lg font-medium">센서 등록</h3>
                    <p className="text-sm text-muted-foreground">센서 등록 부분</p>
                </div>
                <div className="shrink-0 bg-border h-[1px] w-full"></div>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="modelName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>모델명</FormLabel>
                                <FormControl>
                                    <Input placeholder="모델명을 입력하세요." {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="space-y-4">
                        {/* <FormLabel>Measurement Range</FormLabel> */}
                        {fields.map((field: any, index) => (
                            <div key={field.id} className="space-y-4 border p-4">
                                {/* Measurement Range */}
                                <FormLabel>측정 가능 범위 입력</FormLabel>
                                {form.watch(`units.${index}.measurementRange`).map((_: any, rangeIndex: any) => (
                                    <div key={rangeIndex} className="flex space-x-4 items-center">
                                        <FormControl>
                                            <Input
                                                placeholder="측정 최소값"
                                                {...form.register(`units.${index}.measurementRange.${rangeIndex}.min`)} // min 필드 등록
                                                className="w-full"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                        <FormControl>
                                            <Input
                                                placeholder="측정 최대값"
                                                {...form.register(`units.${index}.measurementRange.${rangeIndex}.max`)} // max 필드 등록
                                                className="w-full"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                        <Button
                                            type="button"
                                            onClick={() => removeRange(index, rangeIndex)}
                                            variant="destructive"
                                            className="bg-red-500 hover:bg-red-600 text-white"
                                        >
                                            범위 삭제
                                        </Button>
                                    </div>
                                ))}
                                <Button variant="secondary" type="button" onClick={() => appendRange(index)}>
                                    범위 추가
                                </Button>

                                <FormField
                                    control={form.control}
                                    name={`units.${index}.measurementItem`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>측정 항목</FormLabel>
                                            <FormControl>
                                                <Input placeholder="측정 항목을 입력하세요" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name={`units.${index}.unit`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>단위</FormLabel>
                                            <FormControl>
                                                <Input placeholder="단위를 입력하세요" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    type="button"
                                    onClick={() => remove(index)}
                                    variant="destructive"
                                    className="bg-red-500 hover:bg-red-600 text-white"
                                >
                                    유닛 삭제
                                </Button>
                            </div>
                        ))}
                        <div className="flex item-center justify-center content-center">
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() =>
                                    append({
                                        measurementRange: [{ min: "", max: "" }],
                                        measurementItem: "",
                                        unit: "",
                                    })
                                }
                            >
                                유닛 추가
                            </Button>
                        </div>
                    </div>

                    <Button type="submit">등록하기</Button>
                </form>
            </div>
        </Form>
    );
};
