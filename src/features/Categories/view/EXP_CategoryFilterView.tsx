import { Field, FilterDrawerContainer } from "@/components/shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useEXP_CategoryStore } from "../api/EXP_CategoryStore";
import { EXP_CategorySelectPageRequest } from "../types";

interface EXP_CategoryFilterViewProps {
    openFilter: boolean;
    setOpenFilter: (open: boolean) => void;
}

export const EXP_CategoryFilterView = ({ openFilter, setOpenFilter }: EXP_CategoryFilterViewProps) => {
    const { postModel, handleFiltering } = useEXP_CategoryStore();

    const { control, handleSubmit, reset } = useForm<EXP_CategorySelectPageRequest>({
        resolver: zodResolver(EXP_CategorySelectPageRequest),
        defaultValues: postModel.filterModel || {},
        mode: "onSubmit"
    });

    useEffect(() => {
        if (openFilter) {
            reset(postModel.filterModel || {});
        }
    }, [openFilter, postModel.filterModel, reset]);

    const onSubmit = (data: EXP_CategorySelectPageRequest) => {
        handleFiltering(data);
        setOpenFilter(false);
    };

    const onClearAll = () => {
        reset({
            CategoryName: "",
        } as any);
        handleFiltering({});
    };

    return (
        <FilterDrawerContainer
            open={openFilter}
            onOpenChange={setOpenFilter}
            onSubmit={handleSubmit(onSubmit)}
            onClearAll={onClearAll}
            title="Filter Categories"
        >
            <Field.Text
                control={control}
                name="CategoryName"
                label="Category Name"
                placeholder="Filter by name..."
                gridProps={{ size: { xs: 12 } }}
            />
        </FilterDrawerContainer>
    );
};
