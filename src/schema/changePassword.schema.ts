import * as zod from 'zod'

export const changePasswordSchema = zod.object({
    currentPassword: zod.string().min(6, 'must at least enter 6 chars').max(12, 'max is 12 chars'),
    password: zod.string().min(6, 'must at least enter 6 chars').max(12, 'max is 12 chars'),
    rePassword: zod.string().min(6, 'must at least enter 6 chars').max(12, 'max is 12 chars'),

}).refine((values) => values.rePassword === values.password, {
    error: ' new  password and new Password repeat must be identical ',
    path: ['repeatPassword']
})