import { Todo } from "./../../../todo.entity";
import todoMongoModel from "./todo.mongo.model";

export class TodoMongoRepository {
  private model;
  constructor() {
    this.model = todoMongoModel;
  }

  public async save(todo: Todo): Promise<any> {
    try{

      const newTodo = new this.model(todo);
      const savedTodo = await newTodo.save();
      return savedTodo;
    }
    catch(e){
      console.log(e)
    }
  }

  public async getAll(): Promise<any>{
    const todos = await this.model.find()
    return todos
  }
  
}
