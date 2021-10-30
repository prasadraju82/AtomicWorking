import React, {useState, useEffect} from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import {v4 as uuidv4} from 'uuid';
import TaskService from '../../services/tasks';
import { Redirect, useHistory } from 'react-router-dom';
import Navigation from '../../components/Navigation';
import { useSelector } from "react-redux";
import ProjectsService from "../../services/projects";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

 const updateTaskStatus = (taskId, status) => {
    const taskPayLoad ={
        taskId: taskId,
        statusId: status
    }

    TaskService.updateTaskFromKanbanBoard(taskPayLoad).then((response) => {
        if(response.data.message === "Success"){
           toast("Task Status Updated Successfully");
        }
    }).catch((error) => {console.log(error)})
 }

 const onDragEnd = (result, columns, setColumns) => {
     if(!result.destination) return;

    const { source, destination} = result;
    
    if(source.droppableId !== destination.droppableId){
        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);

      

   
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

function KanbanBoard(props){
    const { user: currentUser } = useSelector((state) => state.auth);
    const [projects, setProjects] = useState([]);
    const [projectId, setProjectId] = useState([]);
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

    const {state} = history.location;
    

    useEffect(() => {
        
        setProjectId(state.projid)
        TaskService.getTaskForKanbanBoard(state.projid,1).then((response) => {
      
            setTasks(response.data);
        })
        
        //In progress
        TaskService.getTaskForKanbanBoard(state.projid,3).then((response) => {
   
            setInProgressTasks(response.data);
        })

       
        //re-Open
        TaskService.getTaskForKanbanBoard(state.projid,2).then((response) => {
     
            setReOpenTasks(response.data);
        })

        //Staging
        TaskService.getTaskForKanbanBoard(state.projid,4).then((response) => {

            setOnStagingTasks(response.data);
        })

        //To Deploy
        TaskService.getTaskForKanbanBoard(state.projid,5).then((response) => {

            setToDeployTask(response.data);
        })

        //On Live
        TaskService.getTaskForKanbanBoard(state.projid,6).then((response) => {

            setOnLiveTasks(response.data);
        })
    },[state.projid])

    useEffect(() => {
        const columnsFromBackend = 
        {
            [uuidv4()]:{
                name: 'Open',
                statusId: 1,
                items: tasks
            },
            [uuidv4()]:{
                name: 'Re-Open',
                statusId: 2,
                items: reOpenTask
            },
            [uuidv4()]:{
                name: 'In Progress',
                statusId: 3,
                items: inProgressTasks
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

       
        setColumns(columnsFromBackend);
    },[tasks, inProgressTasks, reOpenTask, onStagingTask, toDeployTask, onLiveTask])

    useEffect(() =>{
        getAllProjects();
    },[])

    if (!currentUser) {
        return <Redirect to="/" />;
    }

    const getAllProjects = () => {
        ProjectsService.getAllProjects().then(response =>
        {
            setProjects(response.data);
        })
    }

    const setProject = (projId) => {
        TaskService.getTaskForKanbanBoard(projId,1).then((response) => {

            setTasks(response.data);
        })
        
        //In progress
        TaskService.getTaskForKanbanBoard(projId,3).then((response) => {
            console.log(response);
            setInProgressTasks(response.data);
        })

        //re-Open
        TaskService.getTaskForKanbanBoard(projId,2).then((response) => {
            console.log(response);
            setReOpenTasks(response.data);
        })

        //Staging
        TaskService.getTaskForKanbanBoard(projId,4).then((response) => {
            console.log(response);
            setOnStagingTasks(response.data);
        })

        //To Deploy
        TaskService.getTaskForKanbanBoard(projId,5).then((response) => {
            console.log(response);
            setToDeployTask(response.data);
        })

        //On Live
        TaskService.getTaskForKanbanBoard(projId,6).then((response) => {
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
                name: 'Re-Open',
                statusId: 2,
                items: reOpenTask
            },
            [uuidv4()]:{
                name: 'In Progress',
                statusId: 3,
                items: inProgressTasks
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

        setProjectId(projId)
    }

    return(
    <div>
        <Navigation />
        <div>
            <div style={{width:'100%', marginLeft: '35px',  marginTop: '30px', fontFamily:'Arial'}}>
                Project Name 
            </div>
            <div style={{width:'20%', marginLeft: '35px',  marginTop: '5px',  marginBottom: '25px'}}>
                <select id="Select1" className="selcls" style={{width:'220px'}} value={projectId} onChange={event => {setProject(event.target.value)}}>
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
                            <div style={{margin:2, alignItems:'center'}}>
                            <div style={{textAlign: 'center', fontWeight:'bold', backgroundColor: '#eeeeee', marginBottom: '4px'}}>{ column.name }</div>
                                <Droppable droppableId={id} key={id}>
                                    {(provided, snapshot) => {
                                        return(
                                            <div 
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                style={{
                                                    background: snapshot.isDraggingOver ? 'lightblue' : 'lightgray',
                                                    padding: 4,
                                                    width: 210,
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
                                                                                <span style={{fontSize:'12px', fontVariant:'small-caps'}}>{item.content.taskType}</span> <span style={{fontSize:'12px', fontVariant:'small-caps', color:'#dcdcdc', marginLeft:'60px'}}>{item.content.taskPriority}</span>
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
        <ToastContainer position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover />
    </div>
    )
}

export default KanbanBoard;