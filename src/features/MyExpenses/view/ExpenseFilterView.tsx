import { Field, FilterDrawerContainer } from "@/components/shared"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useExpenseStore } from "../api/ExpenseStore"
import { ExpenseSelectPageRequest } from "../types"

interface ExpenseFilterViewProps {
    openFilter: boolean
    setOpenFilter: (open: boolean) => void
}

export const ExpenseFilterView = ({ openFilter, setOpenFilter }: ExpenseFilterViewProps) => {
    const { postModel, handleFiltering } = useExpenseStore()

    const { control, handleSubmit, reset } = useForm<ExpenseSelectPageRequest>({
        resolver: zodResolver(ExpenseSelectPageRequest),
        defaultValues: postModel.filterModel || {},
        mode: "onSubmit"
    })

    useEffect(() => {
        if (openFilter) {
            reset(postModel.filterModel || {})
        }
    }, [openFilter, postModel.filterModel, reset])

    const onSubmit = (data: ExpenseSelectPageRequest) => {
        handleFiltering(data)
        setOpenFilter(false)
    }

    const onClearAll = () => {
        reset({
            Title: "",
            FromDate: undefined,
            ToDate: undefined,
        } as any)
        handleFiltering({})
    }

    return (
        <FilterDrawerContainer
            open={openFilter}
            onOpenChange={setOpenFilter}
            onSubmit={handleSubmit(onSubmit)}
            onClearAll={onClearAll}
            title="Filter Expenses"
        >
            <Field.Text
                control={control}
                name="Title"
                label="Title"
                placeholder="Expense Title"
                gridProps={{ size: { xs: 12, sm: 12, md: 12, lg: 12, xl: 12 } }}
            />
            <div className="grid grid-cols-2 gap-4">
                <Field.Date
                    control={control}
                    name="FromDate"
                    label="From Date"
                    gridProps={{ size: { xs: 12, sm: 12, md: 12, lg: 12, xl: 12 } }}
                    placeholder="Pick a date"
                />
                <Field.Date
                    control={control}
                    name="ToDate"
                    label="To Date"
                    gridProps={{ size: { xs: 12, sm: 12, md: 12, lg: 12, xl: 12 } }}
                    placeholder="Pick a date"
                />
            </div>
        </FilterDrawerContainer>
    )
}