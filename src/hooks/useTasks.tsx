import { useState, DragEvent } from "react";
import { useTaskStore } from "../stores";
import Swal from "sweetalert2";
import { TaskStatus } from "../interfaces";

interface Options{
    status:TaskStatus;
}

export const useTasks = ({status}:Options) => {

    const isDragging = useTaskStore(state => !!state.draggingTaskId);
    const onTaskDrop = useTaskStore(state => state.onTaskDrop);
    const addTask = useTaskStore(state => state.addTask);

    const [onDragOver, setOnDragOver] = useState(false);

    const handleAddTask = async () => {
        const { isConfirmed, value } = await Swal.fire({
            title: 'Nueva Tarea',
            input: 'text',
            inputLabel: "Nombre de la tarea",
            inputPlaceholder: "Ingrese el nombre de la tarea",
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return "Debe tener un nombre para la tarea"
                }
            }
        });

        if (!isConfirmed) return;
        addTask(value, status);
    }

    const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        console.log('dragOver')
        setOnDragOver(true);
    };

    const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        console.log('dragLeave');
        setOnDragOver(false);
    };

    const handleDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        console.log('drop');
        setOnDragOver(false);
        onTaskDrop(status);
    };


    return{
        //Properties
        isDragging,
        onDragOver,

        //Methods
        handleAddTask,
        handleDragOver,
        handleDragLeave,
        handleDrop,
    }
}