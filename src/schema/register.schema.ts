import * as zod from'zod'

export const registerFormSchema = zod.object({
    name: zod.string().min(1, 'must enter name'),
    email: zod.email('invalid-email').min(1, 'must enter an email'),
    password: zod.string().min(6, 'must at least enter 6 chars').max(9, 'max is 9 chars'),
    rePassword: zod.string().min(6, 'must at least enter 6 chars').max(9, 'max is 9 chars'),
    phone: zod.string().regex(/(\+2)?01[0125][0-9]{8}$/, 'must be egyptian phone number')
}).refine((values) => values.password === values.rePassword, {
    error: 'password and Password conformation must be identical ',
    path: ['rePassword']
})