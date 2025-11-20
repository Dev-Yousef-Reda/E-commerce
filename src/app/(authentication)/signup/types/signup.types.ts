import { registerFormSchema } from '_/schema/register.schema'
import * as zod from 'zod'

export type registerDataType = zod.infer<typeof registerFormSchema>