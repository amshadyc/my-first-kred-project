/**
 * Created by rohittalwar on 01/06/16.
 */
import * as mongoose from 'mongoose';

export interface IStudent {
    name: string
    age: string
    attendance: string

};
let Schema = mongoose.Schema;
let mySchema = new Schema({
    name: { type: String, required: true },
    age: { type: String, required: true },
    attendance: { type: String, required: true },
    data: {
        type: mongoose.SchemaTypes.Mixed
    },
});


export interface IStudentModel extends mongoose.Document { }

export default mongoose.model<IStudentModel>('students', mySchema);