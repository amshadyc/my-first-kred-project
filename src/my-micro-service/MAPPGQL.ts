var student_data= {};
import Product from "./db-schemas/Product";
import * as assert from 'assert';
import Student from "./db-schemas/Student";
import { MyClass } from "@amalkred/my-first-npm-module-new";
export default class MAPPGQL {
    params: any
    constructor(params: any) {
        this.params = params;
    }

    async health() {
        return { status: "ok" }
    }

    async get_student(){
        let student_response_data = {
            name : "Bromin",
            age : 25,
            attendance: true
        }

        //amal = student_response_data;
        return student_data;
    }

    async update_student(args: any, req: any) {

        
        /*
        We will try to read request data f"/my-first-npm-module";rom `args` variable passed in the function parameter.For now ignore the `req` parameter .
        */
        
        let student_response_data = {
            name: args.name,
            age: args.age,
            attendance: args.attendance
        }
        student_data = student_response_data;
        return student_data;
    }



    
    async add_student(args: any, req: any) {
        await this.assert_nonempty(args, 'name,age,attendance'.split(','))

        let obj = await Student.updateOne(args, { $set: { ...args } }, { upsert: true }).exec();
        obj = await Student.findOne(args).lean().exec();
        return { success: true, ...obj };
    }
    


    async add_product(args: any, req: any) {
        await this.assert_nonempty(args, 'product,model,brand,shape,size,color,body_color'.split(','))

        let obj = await Product.updateOne(args, { $set: { ...args } }, { upsert: true }).exec();
        obj = await Product.findOne(args).lean().exec();
        return { success: true, ...obj };
    }
    private async assert_nonempty(obj: any, required_fields: string[]) {
        for (let key of required_fields) {
            assert.ok(obj[key], `Invalid value for - ${key} `);
        }
    }

    async get_products(args: any, req: any) {
        return Product.find({ ...args }).lean().exec();
    }


    async get_students_mongo(args: any, req: any) {
        return Student.find({ ...args }).lean().exec();
    }

    async test_mongo_queries(args: any, req: any) {

        //test your mongo queries here

        //let all_students = await Student.find();
        //console.log('All Students', all_students)
/*
        let filter_object = { age: { $lt: 20 } };
        let filtered_students = await Student.find(filter_object);
        console.log('Filtered Students', filtered_students);
*/
        let myClassObject = new MyClass();
        let message = myClassObject.create_hello_message('amal');
        console.log('message', message);
        return { success: true };
    }

}


