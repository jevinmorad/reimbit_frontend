import z from "zod";

export const EXP_CategoryAddEditRequest = z.object({
    CategoryId: z.string().nullish(),
    CategoryName: z.string().min(1, "Category name is required"),
    Description: z.string().nullish(),
})

export type EXP_CategoryAddEditRequest = z.infer<typeof EXP_CategoryAddEditRequest>
