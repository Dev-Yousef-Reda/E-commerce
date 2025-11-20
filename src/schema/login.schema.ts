import * as zod from 'zod'

export const loginFormSchema = zod.object({
    email: zod.email('invalid-email').min(1, 'must enter an email'),
    password: zod.string().min(6, 'must at least enter 6 chars').max(12, 'max is 12 chars'),
})