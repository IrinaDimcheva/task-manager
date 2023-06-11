import mongoose from 'mongoose';

interface ITaskAttrs {
  title: string;
  description: string;
  // file?: string;
  userId: string;
}

interface ITaskDoc extends mongoose.Document {
  title: string;
  description: string;
  // file?: string;
  userId: string;
}

interface ITaskModel extends mongoose.Model<ITaskDoc> {
  build(attrs: ITaskAttrs): ITaskDoc;
}

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  // file: { 
  //   data: Buffer, 
  //   contentType: String 
  // },
  userId: {
    type: String,
    required: true
  }
});

taskSchema.statics.build = (attrs: ITaskAttrs) => {
  return new Task(attrs);
}

const Task = mongoose.model<ITaskDoc, ITaskModel>('Task', taskSchema);

export { Task };
