import z from "zod";

export const CAT_CategoryAddEditRequest = z.object({
    CategoryId: z.string().nullish(),
    CategoryName: z.string().min(1, "Category name is required"),
    Description: z.string().nullish(),
})

export type CAT_CategoryAddEditRequest = z.infer<typeof CAT_CategoryAddEditRequest>
