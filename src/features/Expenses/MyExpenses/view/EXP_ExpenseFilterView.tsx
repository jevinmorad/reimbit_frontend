import { Field, FilterDrawerContainer } from "@/components/shared"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useEXP_ExpenseStore } from "../api/EXP_ExpenseStore"
import { EXP_ExpenseSelectPageRequest } from "../types"

interface EXP_ExpenseFilterViewProps {
    openFilter: boolean
    setOpenFilter: (open: boolean) => void
}

export const EXP_ExpenseFilterView = ({ openFilter, setOpenFilter }: EXP_ExpenseFilterViewProps) => {
    const { postModel, handleFiltering } = useEXP_ExpenseStore()

    const { control, handleSubmit, reset } = useForm<EXP_ExpenseSelectPageRequest>({
        resolver: zodResolver(EXP_ExpenseSelectPageRequest),
        defaultValues: postModel.filterModel || {},
        mode: "onSubmit" // or onChange if we want instant feedback, but usually "Apply" implies submit
    })

    // Reset form when drawer opens to match store state, in case it was changed elsewhere or cleared
    useEffect(() => {
        if (openFilter) {
            reset(postModel.filterModel || {})
        }
    }, [openFilter, postModel.filterModel, reset])

    const onSubmit = (data: EXP_ExpenseSelectPageRequest) => {
        handleFiltering(data)
        setOpenFilter(false)
    }

    const onClearAll = () => {
        const emptyData = {} as EXP_ExpenseSelectPageRequest // Or explicit fields if needed
        reset(emptyData)
        // handleFiltering(emptyData) // Optional: clear filter immediately on Clear All? Reference suggests yes.
        handleFiltering(emptyData)
        // setOpenFilter(false) // Keep open? Reference: reset resets form, but maybe we want to keep it open to re-apply? 
        // Reference code: 
        // handleFiltering(getEmptyObject...);
        // setFriendlyFilter(null);
        // Doesn't explicitly close. I'll keep it open.
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