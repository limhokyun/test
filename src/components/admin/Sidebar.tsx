import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
export const Sidebar = () => {
    const location = useLocation();
    // 현재 경로와 Link의 경로가 일치하는지 확인하는 함수
    const isActive = (path: string) => location.pathname.startsWith(path);
    return (
        <div className="pb-12 hidden lg:block">
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">제품 관리</h2>
                    <div className="space-y-1">
                        <Button className="w-full p-0" variant={isActive("/admin/model") ? "default" : "ghost"}>
                            <Link className="w-full h-full text-start px-4 py-2" to="/admin/model">
                                모델 관리
                            </Link>
                        </Button>
                    </div>
                </div>
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">회원 관리</h2>
                    <div className="space-y-1">
                        <Button className="w-full p-0" variant={isActive("/admin/company") ? "default" : "ghost"}>
                            <Link className="w-full h-full text-start px-4 py-2" to="/admin/company">
                                회사 관리
                            </Link>
                        </Button>

                        <Button className="w-full p-0" variant={isActive("/admin/field") ? "default" : "ghost"}>
                            <Link className="w-full h-full text-start px-4 py-2" to="/admin/field">
                                현장 관리
                            </Link>
                        </Button>

                        <Button className="w-full p-0" variant={isActive("/admin/serial") ? "default" : "ghost"}>
                            <Link className="w-full h-full text-start px-4 py-2" to="/admin/serial">
                                계측기 관리
                            </Link>
                        </Button>
                    </div>
                </div>
                <div className="py-2"></div>
            </div>
        </div>
    );
};
