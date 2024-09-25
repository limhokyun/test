import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// 폼 유효성 검사를 위한 Zod 스키마
const formSchema = z.object({
    // 회사 이름
    companyName: z.string().trim().min(1, "회사명은 필수 입력 항목입니다."),
    // 이메일
    email: z.string().trim().min(1, "이메일은 필수 입력 항목입니다."),
    // 전화번호
    phoneNumber: z.string().trim(),
    // 주소
    address: z.string().trim(),
});

export const AddCompanyPage = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            companyName: "",
            email: "",
            phoneNumber: "",
            address: "",
        },
    });

    const dummyData: any = [{ id: "1", modelNumber: "DL-302-1p" }];

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    return (
        <Form {...form}>
            <div className="space-y-6 lg:max-w-2xl">
                <div>
                    <h3 className="text-lg font-medium">회사 등록</h3>
                    <p className="text-sm text-muted-foreground">회사 등록 부분</p>
                </div>
                <div className="shrink-0 bg-border h-[1px] w-full"></div>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="companyName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>회사명</FormLabel>
                                <FormControl>
                                    <Input placeholder="회사명을 입력해 주세요." {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
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
                        name="phoneNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>전화번호</FormLabel>
                                <FormControl>
                                    <Input placeholder="전화번호를 입력해 주세요." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>주소</FormLabel>
                                <FormControl>
                                    <Input placeholder="주소를 입력해 주세요." {...field} />
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
