"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var student_data = {};
const Product_1 = require("./db-schemas/Product");
const assert = require("assert");
const Student_1 = require("./db-schemas/Student");
const my_first_npm_module_new_1 = require("@amalkred/my-first-npm-module-new");
class MAPPGQL {
    constructor(params) {
        this.params = params;
    }
    async health() {
        return { status: "ok" };
    }
    async get_student() {
        let student_response_data = {
            name: "Bromin",
            age: 25,
            attendance: true
        };
        //amal = student_response_data;
        return student_data;
    }
    async update_student(args, req) {
        /*
        We will try to read request data f"/my-first-npm-module";rom `args` variable passed in the function parameter.For now ignore the `req` parameter .
        */
        let student_response_data = {
            name: args.name,
            age: args.age,
            attendance: args.attendance
        };
        student_data = student_response_data;
        return student_data;
    }
    async add_student(args, req) {
        await this.assert_nonempty(args, 'name,age,attendance'.split(','));
        let obj = await Student_1.default.updateOne(args, { $set: Object.assign({}, args) }, { upsert: true }).exec();
        obj = await Student_1.default.findOne(args).lean().exec();
        return Object.assign({ success: true }, obj);
    }
    async add_product(args, req) {
        await this.assert_nonempty(args, 'product,model,brand,shape,size,color,body_color'.split(','));
        let obj = await Product_1.default.updateOne(args, { $set: Object.assign({}, args) }, { upsert: true }).exec();
        obj = await Product_1.default.findOne(args).lean().exec();
        return Object.assign({ success: true }, obj);
    }
    async assert_nonempty(obj, required_fields) {
        for (let key of required_fields) {
            assert.ok(obj[key], `Invalid value for - ${key} `);
        }
    }
    async get_products(args, req) {
        return Product_1.default.find(Object.assign({}, args)).lean().exec();
    }
    async get_students_mongo(args, req) {
        return Student_1.default.find(Object.assign({}, args)).lean().exec();
    }
    async test_mongo_queries(args, req) {
        //test your mongo queries here
        //let all_students = await Student.find();
        //console.log('All Students', all_students)
        /*
                let filter_object = { age: { $lt: 20 } };
                let filtered_students = await Student.find(filter_object);
                console.log('Filtered Students', filtered_students);
        */
        let myClassObject = new my_first_npm_module_new_1.MyClass();
        let message = myClassObject.create_hello_message('amal');
        console.log('message', message);
        return { success: true };
    }
}
exports.default = MAPPGQL;
