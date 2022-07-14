
import { TaskStatus } from "./task-status.enum";

interface Task{
    id:string,
    title: string,
    status:TaskStatus,
    description: string,
    startTime: Date,
    endTime: Date,
}
export default Task;