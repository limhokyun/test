import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// 폼 유효성 검사를 위한 Zod 스키마
const formSchema = z.object({
    unitName: z.string().trim().min(1, "유닛 이름은 필수 항목입니다."),

    model: z.string().trim().min(1, "모델은 필수 선택 항목입니다."),

    field: z.string(),
});

export const AddSettingUnitPage = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            unitName: "",
            model: "",
            field: " ",
        },
    });

    const dummyData: any = [{ id: "1", modelName: "DL-302-1p" }];

    const dummyFieldData: any = [{ id: "1", fieldName: "증자" }];

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    return (
        <Form {...form}>
            <div className="space-y-6 lg:max-w-2xl">
                <div>
                    <h3 className="text-lg font-medium">유닛 등록</h3>
                    <p className="text-sm text-muted-foreground">유닛 등록 부분</p>
                </div>
                <div className="shrink-0 bg-border h-[1px] w-full"></div>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="unitName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>유닛 이름</FormLabel>
                                <FormControl>
                                    <Input placeholder="유닛 이름을 등록해 주세요." {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="model"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>모델 선택</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a Product" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {dummyData.map((data: any, index: number) => (
                                                    <SelectItem key={index} value={data.id}>
                                                        {data.modelName}
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
                    <FormField
                        control={form.control}
                        name="field"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>위치 선택</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a Product" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {dummyFieldData.map((data: any, index: number) => (
                                                    <SelectItem key={index} value={data.id}>
                                                        {data.fieldName}
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
                    <div>여기 아래에 field 정하면 location 까지 선택하는 부분 추가 구현 필요</div>
                    <Button type="submit">Submit</Button>
                </form>
            </div>
        </Form>
    );
};
