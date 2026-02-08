import { Field } from "@/components/shared/Field"
import { FilterDrawerContainer } from "@/components/shared/FilterDrawerContainer"
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
        defaultValues: { ...postModel?.filterModel },
    })

    // Reset form when store filter changes (e.g. cleared externally)
    useEffect(() => {
        reset(postModel?.filterModel || {})
    }, [postModel?.filterModel, reset])

    const onSubmit = (data: EXP_ExpenseSelectPageRequest) => {
        handleFiltering(data)
        setOpenFilter(false)
    }

    const onClearAll = () => {
        reset({})
        handleFiltering({})
        setOpenFilter(false)
    }

    return (
        <FilterDrawerContainer
            keepOpen={openFilter}
            setOpenFilter={setOpenFilter}
            onSubmit={handleSubmit(onSubmit)}
            onClearAll={onClearAll}
            postModel={postModel}
        >
            <Field.Text
                control={control}
                name="title"
                label="Title"
                placeholder="Filter by title..."
                gridProps={{ size: { xs: 12, sm: 12, md: 12, lg: 12, xl: 12 } }}
            />
            <Field.Text
                control={control}
                name="status"
                label="Status"
                placeholder="Filter by status..."
                gridProps={{ size: { xs: 12, sm: 12, md: 12, lg: 12, xl: 12 } }}
            />
            <div className="grid grid-cols-2 gap-4">
                <Field.Date
                    control={control}
                    name="fromDate"
                    label="From Date"
                    gridProps={{ size: { xs: 12, sm: 12, md: 12, lg: 12, xl: 12 } }}
                    placeholder="Pick a date"
                />
                <Field.Date
                    control={control}
                    name="toDate"
                    label="To Date"
                    gridProps={{ size: { xs: 12, sm: 12, md: 12, lg: 12, xl: 12 } }}
                    placeholder="Pick a date"
                />
            </div>
        </FilterDrawerContainer>
    )
}