import React, {useState, useEffect} from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import {v4 as uuidv4} from 'uuid';
import TaskService from '../../services/tasks';
import { Redirect, useHistory } from 'react-router-dom';
import Navigation from '../../components/Navigation';
import { useSelector } from "react-redux";
import ProjectsService from "../../services/projects";

const itemsFromBackEnd3 = [
    {id: uuidv4(), content: 'Fifth Component'},
    {id: uuidv4(), content: 'Sixth Component'}
]

const itemsFromBackEnd4 = [
    {id: uuidv4(), content: 'Seventh Component'},
    {id: uuidv4(), content: 'Eighth Component'}
]

const itemsFromBackEnd5 = [
    {id: uuidv4(), content: 'Ninth Component'},
    {id: uuidv4(), content: 'Tenth Component'}
]

const itemsFromBackEnd6 = [
    {id: uuidv4(), content: 'Eleventh Component'},
    {id: uuidv4(), content: 'Twelth Component'}
]

const itemsFromBackEnd7 = [
    {id: uuidv4(), content: 'Thirteenth Component'},
    {id: uuidv4(), content: 'Forteenth Component'}
]

const itemsFromBackEnd8 = [
    {id: uuidv4(), content: 'Fifteenth Component'},
    {id: uuidv4(), content: 'Sixteenth Component'}
]

let itemsFromBackEnd = [
    // {id: uuidv4(), content: 'First Component'},
    // {id: uuidv4(), content: 'Second Component'}
]

let itemsFromBackEnd1 = [
    // {id: uuidv4(), content: 'Third Component'},
    // {id: uuidv4(), content: 'Fourth Component'}
]
//console.log(itemsFromBackEnd1);

 const updateTaskStatus = (taskId, status) => {
    const taskPayLoad ={
        taskId: taskId,
        statusId: status
    }

    TaskService.updateTaskByTaskId(taskPayLoad).then((response) => {
        if(response.data.message === "Success"){
           alert("Task Status Updated Successfully");
        }
    }).catch((error) => {console.log(error)})
 }

 const onDragEnd = (result, columns, setColumns) => {
     if(!result.destination) return;

    const { source, destination} = result;
    //console.log(columnsFromBackend);
    if(source.droppableId !== destination.droppableId){
        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);

        console.log(removed);

        console.log('destination .index' + destination.index);
        destItems.splice(destination.index, 0, removed)
        
        setColumns({
            ...columns,
            [source.droppableId]:{
                ...sourceColumn,
                items: sourceItems
            },
            [destination.droppableId]:{
                ...destColumn,
                items: destItems
            }
        })

        updateTaskStatus(removed.content.taskId, destColumn.statusId);
        //console.log(...columns);
        console.log(destColumn);
    }
    else{
        const column = columns[source.droppableId];
        const copiedItems = [...column.items];
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);

        setColumns({
            ...columns,
            [source.droppableId]:{
                ...column,
                items: copiedItems
            }
        })
    }
    
 }

function KanbanBoard(){
    const { user: currentUser } = useSelector((state) => state.auth);
    const [projects, setProjects] = useState([]);

    const[columns, setColumns] = useState({})

    const[tasks, setTasks] = useState([]);
    const[inProgressTasks, setInProgressTasks] = useState([]);
    const[reOpenTask, setReOpenTasks] =useState([]);
    const[onStagingTask, setOnStagingTasks] =useState([]);
    const[toDeployTask, setToDeployTask] =useState([]);
    const[onLiveTask, setOnLiveTasks] =useState([]);

    let history = useHistory();

    const gotoTaskDetails = (taskId) => {
        history.push('/taskdetails/taskdetails-master', { taskid: taskId });
    }

    useEffect(() => {
        
        // const openItem = [{id:'PTD-12', content:{taskId:'PTD-12',taskName:'Authenticate Login', taskType:'Enhancement', taskPriority:'Normal'}},
        //         {id:'PTD-11', content:{taskId:'PTD-11',taskName:'Add JWT Token', taskType:'Enhancement', taskPriority:'Normal'}},
        //         {id:'PTD-10', content:{taskId:'PTD-10',taskName:'Responsive Page', taskType:'Enhancement', taskPriority:'Normal'}}]

        let openItem = []
        TaskService.getTaskForKanbanBoard('6165c7ccde35c0ec76cae78c',1).then((response) => {
            console.log(response);
            setTasks(response.data);
        })
        
        

        // tasks.map((item, index) => {
        //     itemsFromBackEnd.push(item);
        // })

        TaskService.getTaskForKanbanBoard('6165c7ccde35c0ec76cae78c',2).then((response) => {
            console.log(response);
            setInProgressTasks(response.data);
        })

        const inProgressItem = [{id:'PTD-9', content:{taskId:'PTD-9',taskName:'Add excel in the report', taskType:'Enhancement', taskPriority:'Normal'}},
                {id:'PTD-8', content:{taskId:'PTD-8',taskName:'Implement MFA', taskType:'Enhancement', taskPriority:'Normal'}},
                {id:'PTD-7', content:{taskId:'PTD-7',taskName:'Page crashed on save', taskType:'Enhancement', taskPriority:'Normal'}}]

        // inProgressItem.map((item, index) => {
        //     itemsFromBackEnd1.push(item);
        // })

        // const itemsFromBackEnd = [
        //     // {id: uuidv4(), content: 'First Component'},
        //     // {id: uuidv4(), content: 'Second Component'}
        // ]
        alert('Hi');
        //re-Open
        TaskService.getTaskForKanbanBoard('6165c7ccde35c0ec76cae78c',3).then((response) => {
            console.log(response);
            setReOpenTasks(response.data);
        })

        //Staging
        TaskService.getTaskForKanbanBoard('6165c7ccde35c0ec76cae78c',4).then((response) => {
            console.log(response);
            setOnStagingTasks(response.data);
        })

        //To Deploy
        TaskService.getTaskForKanbanBoard('6165c7ccde35c0ec76cae78c',5).then((response) => {
            console.log(response);
            setToDeployTask(response.data);
        })

        //On Live
        TaskService.getTaskForKanbanBoard('6165c7ccde35c0ec76cae78c',6).then((response) => {
            console.log(response);
            setOnLiveTasks(response.data);
        })
    },[])

    useEffect(() => {
        const columnsFromBackend = 
        {
            [uuidv4()]:{
                name: 'Open',
                statusId: 1,
                items: tasks
            },
            [uuidv4()]:{
                name: 'In Progress',
                statusId: 2,
                items: inProgressTasks
            },
            [uuidv4()]:{
                name: 'Re-Open',
                statusId: 3,
                items: reOpenTask
            },
            [uuidv4()]:{
                name: 'On Staging',
                statusId: 4,
                items: onStagingTask
            },
            [uuidv4()]:{
                name: 'To Deploy',
                statusId: 5,
                items: toDeployTask
            },
            [uuidv4()]:{
                name: 'On Live',
                statusId: 6,
                items: onLiveTask
            },
        }

        console.log(columnsFromBackend);
        setColumns(columnsFromBackend);
    },[])

    useEffect(() => {
        
    },[])

    useEffect(() =>{
        getAllProjects();
    },[])

    if (!currentUser) {
        return <Redirect to="/login" />;
    }

    const getAllProjects = () => {
        ProjectsService.getAllProjects().then(response =>
        {
            setProjects(response.data);
        })
    }

    const setProject = (event) => {
        TaskService.getTaskForKanbanBoard('6165c7ccde35c0ec76cae78c',1).then((response) => {
            console.log(response);
            setTasks(response.data);
        })
        
        

        // tasks.map((item, index) => {
        //     itemsFromBackEnd.push(item);
        // })

        TaskService.getTaskForKanbanBoard('6165c7ccde35c0ec76cae78c',2).then((response) => {
            console.log(response);
            setInProgressTasks(response.data);
        })

        const inProgressItem = [{id:'PTD-9', content:{taskId:'PTD-9',taskName:'Add excel in the report', taskType:'Enhancement', taskPriority:'Normal'}},
                {id:'PTD-8', content:{taskId:'PTD-8',taskName:'Implement MFA', taskType:'Enhancement', taskPriority:'Normal'}},
                {id:'PTD-7', content:{taskId:'PTD-7',taskName:'Page crashed on save', taskType:'Enhancement', taskPriority:'Normal'}}]

        // inProgressItem.map((item, index) => {
        //     itemsFromBackEnd1.push(item);
        // })

        // const itemsFromBackEnd = [
        //     // {id: uuidv4(), content: 'First Component'},
        //     // {id: uuidv4(), content: 'Second Component'}
        // ]

        //re-Open
        TaskService.getTaskForKanbanBoard('6165c7ccde35c0ec76cae78c',3).then((response) => {
            console.log(response);
            setReOpenTasks(response.data);
        })

        //Staging
        TaskService.getTaskForKanbanBoard('6165c7ccde35c0ec76cae78c',4).then((response) => {
            console.log(response);
            setOnStagingTasks(response.data);
        })

        //To Deploy
        TaskService.getTaskForKanbanBoard('6165c7ccde35c0ec76cae78c',5).then((response) => {
            console.log(response);
            setToDeployTask(response.data);
        })

        //On Live
        TaskService.getTaskForKanbanBoard('6165c7ccde35c0ec76cae78c',6).then((response) => {
            console.log(response);
            setOnLiveTasks(response.data);
        })

        const columnsFromBackend = 
        {
            [uuidv4()]:{
                name: 'Open',
                statusId: 1,
                items: tasks
            },
            [uuidv4()]:{
                name: 'In Progress',
                statusId: 2,
                items: inProgressTasks
            },
            [uuidv4()]:{
                name: 'Re-Open',
                statusId: 3,
                items: reOpenTask
            },
            [uuidv4()]:{
                name: 'On Staging',
                statusId: 4,
                items: onStagingTask
            },
            [uuidv4()]:{
                name: 'To Deploy',
                statusId: 5,
                items: toDeployTask
            },
            [uuidv4()]:{
                name: 'On Live',
                statusId: 6,
                items: onLiveTask
            },
        }

        console.log(columnsFromBackend);
        setColumns(columnsFromBackend);
    }

    return(
    <div>
        <Navigation />
        <div>
            <div style={{width:'100%', marginLeft: '50px',  marginTop: '30px', fontFamily:'Arial'}}>
                Project Name <span style={{color:'red'}}>*</span>
            </div>
            <div style={{width:'20%', marginLeft: '50px',  marginTop: '5px'}}>
                <select id="Select1" className="selcls" style={{width:'220px'}} onChange={event => {setProject(event.target.value)}}>
                    {/* <option key = '0' value='0'>-Select-</option> */}
                    {projects.map(project => (
                        <option key={project._id} value={project._id}>
                            {project.projectName}
                        </option>
                    ))}
                </select>
            </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', height:'100%'}}>
            <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
                {Object.entries(columns).map(([id, column])=>{
                    return(
                        <div style={{ display:'flex', flexDirection:'column', alignItems:'center'}}>
                            <div style={{margin:2}}>
                                <h4>{ column.name }</h4>
                                <Droppable droppableId={id} key={id}>
                                    {(provided, snapshot) => {
                                        return(
                                            <div 
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                style={{
                                                    background: snapshot.isDraggingOver ? 'lightblue' : 'lightgray',
                                                    padding: 4,
                                                    width: 240,
                                                    minHeight: 500    
                                                }}
                                            >
                                                {column.items.map((item, index) => {
                                                    return(
                                                        <Draggable key = {item.id} draggableId={item.id} index={index}>
                                                            {(provided, snapshot) => {
                                                                return(
                                                                    <div 
                                                                        ref={provided.innerRef} 
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        style={{
                                                                            userSelect:'none',
                                                                            padding: 6,
                                                                            margin: '0 0 8px 0',
                                                                            minHeight: '50px',
                                                                            backgroundColor: snapshot.isDragging ? '#263B4A' : '#456C86',
                                                                            color: 'white',
                                                                            ...provided.draggableProps.style
                                                                        }}
                                                                        >
                                                                            <div onClick={() => gotoTaskDetails(item.content.taskId)}>
                                                                                {item.content.taskName}
                                                                            </div>
                                                                            <div>
                                                                                <span style={{fontSize:'12px', fontVariant:'small-caps'}}>{item.content.taskType}</span> <span style={{fontSize:'12px', fontVariant:'small-caps', color:'#dcdcdc'}}>Normal</span>
                                                                            </div>
                                                                            <div onClick={() => gotoTaskDetails(item.content.taskId)}>
                                                                                {item.content.taskId}
                                                                            </div>
                                                                            
                                                                    </div>
                                                                )
                                                            }}
                                                        </Draggable>
                                                    )
                                                })}
                                                {provided.placeholder}
                                            </div>
                                        );
                                    }}
                                </Droppable>
                            </div>     
                        </div>    
                    )
                })}
            </DragDropContext>
        </div>
    </div>
    )
}

export default KanbanBoard;