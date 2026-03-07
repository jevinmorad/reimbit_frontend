import { Field, FilterDrawerContainer } from "@/components/shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useCategoryStore } from "../api/CategoryStore";
import { CategorySelectPageRequest } from "../types";

interface CategoryFilterViewProps {
    openFilter: boolean;
    setOpenFilter: (open: boolean) => void;
}

export const CategoryFilterView = ({ openFilter, setOpenFilter }: CategoryFilterViewProps) => {
    const { postModel, handleFiltering } = useCategoryStore();

    const { control, handleSubmit, reset } = useForm<CategorySelectPageRequest>({
        resolver: zodResolver(CategorySelectPageRequest),
        defaultValues: postModel.filterModel || {},
        mode: "onSubmit"
    });

    useEffect(() => {
        if (openFilter) {
            reset(postModel.filterModel || {});
        }
    }, [openFilter, postModel.filterModel, reset]);

    const onSubmit = (data: CategorySelectPageRequest) => {
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
