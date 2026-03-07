import { DashboardContent } from "@/components/dashboard-content";
import { EmployeeAddEditView } from "../view/EmployeeAddEditView";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save } from "lucide-react";
import { useRef, useState } from "react";
import type { DataModalButtons } from "@/components/shared";

const EmployeeAddEditPage = () => {
    const navigate = useNavigate();
    const formRef = useRef<DataModalButtons>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
        <DashboardContent>
            <div className="flex items-center space-x-4 mb-6">
                <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="h-8 w-8 rounded-full">
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Add Employee</h2>
                    <p className="text-muted-foreground">Create a new employee profile</p>
                </div>
            </div>

            <div className="bg-card border rounded-xl p-6 shadow-sm mb-6">
                <EmployeeAddEditView
                    ref={formRef}
                    onLoading={setIsSubmitting}
                    onClose={() => navigate("/Employees")}
                />
            </div>

            <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => navigate("/Employees")} disabled={isSubmitting}>
                    Cancel
                </Button>
                <Button onClick={() => formRef.current?.onSubmit()} disabled={isSubmitting} className="min-w-[120px]">
                    <Save className="h-4 w-4 mr-2" />
                    Save Employee
                </Button>
            </div>
        </DashboardContent>
    );
};

export default EmployeeAddEditPage;
