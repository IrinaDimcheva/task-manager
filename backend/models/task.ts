import mongoose from 'mongoose';

enum TaskStatus {
  Created = 'TO DO',
  Unfinished = 'IN PROGRESS',
  Finished = 'COMPLETE'
}

interface ITaskAttrs {
  title: string;
  description: string;
  userId: string;
}

interface ITaskDoc extends mongoose.Document {
  title: string;
  description: string;
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
  status: {
    type: String,
    required: true,
    enum: Object.values(TaskStatus),
    default: TaskStatus.Created
  },
  userId: {
    type: String,
    required: true
  }
}, { timestamps: true });

taskSchema.statics.build = (attrs: ITaskAttrs) => {
  return new Task(attrs);
}

const Task = mongoose.model<ITaskDoc, ITaskModel>('Task', taskSchema);

export { Task };
