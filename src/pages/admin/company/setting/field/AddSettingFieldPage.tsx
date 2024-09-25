import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export type Field = {
    id: string;
    fieldName: string;
    location: string;
    units: any[];
};
// 폼 유효성 검사를 위한 Zod 스키마
const formSchema = z.object({
    // 장소 이름
    fieldName: z.string().trim().min(1, "회사명은 필수 입력 항목입니다."),
    // 장소
    location: z.string().trim().min(1, "이메일은 필수 입력 항목입니다."),
    // 유닛
    units: z.string().trim().min(1, "유닛은 필수 선택 항목입니다."),
});

export const AddSeetingFieldPage = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fieldName: "",
            location: "",
            units: "",
        },
    });

    const dummyData: any = [{ id: "1", unitName: "DL302ACR0061HBU00017" }];

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }
    return (
        <Form {...form}>
            <div className="space-y-6 lg:max-w-2xl">
                <div>
                    <h3 className="text-lg font-medium">현장 등록</h3>
                    <p className="text-sm text-muted-foreground">현장 등록 부분</p>
                </div>
                <div className="shrink-0 bg-border h-[1px] w-full"></div>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="fieldName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>이름</FormLabel>
                                <FormControl>
                                    <Input placeholder="이름을 입력해 주세요." {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>이메일</FormLabel>
                                <FormControl>
                                    <Input placeholder="이메일을 입력해 주세요." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="units"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Sensors</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a Product" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {dummyData.map((data: any, index: number) => (
                                                    <SelectItem key={index} value={data.id}>
                                                        {data.unitName}
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

                    <Button type="submit">등록하기</Button>
                </form>
            </div>
        </Form>
    );
};
