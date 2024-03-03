import mongoose from 'mongoose'
import { WorkSchema } from '../schema/work.schema'
import { IWorkSchema } from '../interface/works.interface'

export const WorkModule = mongoose.model<IWorkSchema>('works', WorkSchema)