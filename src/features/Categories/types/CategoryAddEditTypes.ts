import z from "zod";

export const CategoryAddEditRequest = z.object({
    CategoryId: z.string().nullish(),
    CategoryName: z.string().min(1, "Category name is required"),
    Description: z.string().nullish(),
})

export type CategoryAddEditRequest = z.infer<typeof CategoryAddEditRequest>
