import "./App.css";

import { Counter } from "./features/counter/Counter";
import { Quotes } from "./features/quotes/Quotes";
import { Routes, Route, Navigate } from "react-router-dom";
import { Serial } from "./pages/admin/serial/SerialPage";
import { AddSerial } from "./pages/admin/serial/AddSerialPage";
import { AdminLayout } from "./layout/admin/AdminLayout";
import { ModelPage } from "./pages/admin/model/ModelPage";
import { AddModelPage } from "./pages/admin/model/AddModelPage";
import { CompanyPage } from "./pages/admin/company/CompanyPage";
import { EmployeePage } from "./pages/admin/employee/EmployeePage";
import { FieldPage } from "./pages/admin/field/FieldPage";
import { AddCompanyPage } from "./pages/admin/company/AddCompanyPage";
import { SettingEmployeePage } from "./pages/admin/company/setting/employee/SettingEmployeePage";
import { AdminDashboardPage } from "./pages/admin/dashboard/DashboardPage";
import { AdminSettingLayout } from "./layout/admin/AdminSettingLayout";
import { SettingUnitPage } from "./pages/admin/company/setting/unit/SettingUnitPage";
import { SettingFieldPage } from "./pages/admin/company/setting/field/SettingFieldPage";
import { AddSettingEmployeePage } from "./pages/admin/company/setting/employee/AddSettingEmployeePage";
import { AddSettingUnitPage } from "./pages/admin/company/setting/unit/AddSettingUnitPage";
import { AddSeetingFieldPage } from "./pages/admin/company/setting/field/AddSettingFieldPage";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Navigate to="admin" replace />} />
                <Route path="/counter" element={<Counter />} />
                {/* nested routes */}
                <Route path="/admin" element={<AdminLayout />}>
                    {/* 그냥 /admin 경로로 접근하면 /admin/serial로 replace */}
                    <Route index element={<Navigate to="dashboard" replace />} />

                    <Route path="dashboard">
                        <Route index element={<AdminDashboardPage />} />
                    </Route>

                    <Route path="serial">
                        <Route index element={<Serial />} />
                        <Route path="add" element={<AddSerial />} />
                    </Route>
                    <Route path="model">
                        <Route index element={<ModelPage />} />
                        <Route path="add" element={<AddModelPage />} />
                    </Route>

                    <Route path="company">
                        <Route index element={<CompanyPage />} />
                        <Route path="add" element={<AddCompanyPage />} />

                        <Route path="setting/:id" element={<AdminSettingLayout />}>
                            <Route index element={<Navigate to="employee" replace />} />
                            <Route path="employee">
                                <Route index element={<SettingEmployeePage />} />
                                <Route path="add" element={<AddSettingEmployeePage />} />
                            </Route>
                            <Route path="unit">
                                <Route index element={<SettingUnitPage />} />
                                <Route path="add" element={<AddSettingUnitPage />} />
                            </Route>
                            <Route path="field">
                                <Route index element={<SettingFieldPage />} />
                                <Route path="add" element={<AddSeetingFieldPage />} />
                            </Route>
                        </Route>
                    </Route>

                    <Route path="employee">
                        <Route index element={<EmployeePage />} />
                    </Route>

                    <Route path="field">
                        <Route index element={<FieldPage />} />
                    </Route>
                </Route>
            </Routes>
        </>
    );
}

export default App;
