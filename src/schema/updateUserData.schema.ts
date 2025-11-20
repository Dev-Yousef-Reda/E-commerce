import * as zod from 'zod'

export const updateUserDataSchema = zod.object({
    email: zod.email('invalid-email').min(1, 'must enter an email'),
    name: zod.string().min(6, 'must at least enter 6 chars').max(16, 'max is 16 chars'),
    phone: zod.string().regex(/(\+2)?01[0125][0-9]{8}$/, 'must be egyptian phone number')
})