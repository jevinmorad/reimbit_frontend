import { Field, FilterDrawerContainer } from "@/components/shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useCAT_CategoryStore } from "../api/CAT_CategoryStore";
import { CAT_CategorySelectPageRequest } from "../types";

interface CAT_CategoryFilterViewProps {
    openFilter: boolean;
    setOpenFilter: (open: boolean) => void;
}

export const CAT_CategoryFilterView = ({ openFilter, setOpenFilter }: CAT_CategoryFilterViewProps) => {
    const { postModel, handleFiltering } = useCAT_CategoryStore();

    const { control, handleSubmit, reset } = useForm<CAT_CategorySelectPageRequest>({
        resolver: zodResolver(CAT_CategorySelectPageRequest),
        defaultValues: postModel.filterModel || {},
        mode: "onSubmit"
    });

    useEffect(() => {
        if (openFilter) {
            reset(postModel.filterModel || {});
        }
    }, [openFilter, postModel.filterModel, reset]);

    const onSubmit = (data: CAT_CategorySelectPageRequest) => {
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
