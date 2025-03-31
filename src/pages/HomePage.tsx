import React, {useEffect, useRef, useState} from 'react';
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonFab,
    IonFabButton,
    IonIcon,
    IonButton,
    IonModal,
    IonButtons,
    IonAlert,
    IonInput,
    IonItem,
    IonTextarea,
    IonSelectOption,
    IonSelect,
    IonLabel,
    IonImg,
    IonSpinner
} from
'@ionic/react';
import { Camera, CameraResultType } from '@capacitor/camera';
import {addOutline, closeOutline, heart, pencilOutline, trashBin, trashBinOutline} from 'ionicons/icons';
import axios from 'axios';
import './HomePage.css';


const HomePage = () => {
    const [selectedTask, setSelectedTask] = useState<any>(null);
    const [showModal, setShowModal] = useState(false);
    const [showAddTask, setShowAddTask] = useState(false);
    const [showLoginAlert, setShowLoginAlert] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [tasksUpdated, setTasksUpdated] = useState(false);
    const [userid, setUserid] = useState();
    const [useremail, setUseremail] = useState();

      // CHECK FOR AUTH
      const checkuser = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/users/check");
            setUserid(response.data.userid)
            setUseremail(response.data.useremail)
          } catch (error) {
            // setShowLoginAlert(true)
            console.error("User check failed:", error)
            window.location.href = "/login";  // Redirect only on error
        }
    };


    // CAMERA CAPTURE
      const [photo, setPhoto] = useState<string | null>(null);
    
      const takePicture = async () => {
        try {
          const photo = await Camera.getPhoto({
            quality: 90,
            allowEditing: false,
            resultType: CameraResultType.Uri,
          });
          setPhoto(photo.dataUrl!);
          console.log(photo.webPath);
        } catch (error) { 
          console.log('Camera error:', error);
        }
      };
    

    const fetchTasks = async () => {
      try {
          const response = await axios.get("http://localhost:4000/api/tasks");
          setTasks(response.data);
          setLoading(false)
          // console.log(response.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
            setLoading(false)
        }
    }
    useEffect(() => {
        // Get Tasks
        fetchTasks();
        checkuser();
      }, [tasksUpdated]);
      
      const openTaskModal = (task: any) => {
          setSelectedTask(task);
          setShowModal(true);
      };


      
      const hiddenTaskId = useRef < HTMLIonInputElement > (null); //Task ID
      // FOR DELETE TASK
      const deleteTask = async () => {
            const taskid = hiddenTaskId.current ?. value;
            // console.log(taskid);
            try {
                const taskid = hiddenTaskId.current ?. value;
                console.log("Sending ID:", taskid); // Debugging
                const response = await axios.delete(`http://localhost:4000/api/tasks/${taskid}`);
                // console.log("Task deleted successfully:", response.data);
                setShowModal(false)
                setShowDeleteAlert(true)
                setTasksUpdated(prev => !prev);
            } catch (error) {
                console.error("Error deleting task:", error);
                console.log("Error deleting task:", taskid);
            }
  }

      
    // FOR ADD TASK
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const hiddenInputRef = useRef < HTMLIonInputElement > (null);
    const [showAlert, setShowAlert] = useState(false);
    const [showSuccessfulAlert, setShowSuccessfulAlert] = useState(false);
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    const [updatedStatus, setUpdatedStatus] = useState<string>((selectedTask as any)?.status || "");
    const [loading, setLoading] = useState(true);


    const addTask = async () => {
        if (!title || !description) {
            setShowAlert(true);
            return
        } else {
            const body = {
                "title": title,
                "description": description,
                "userid": hiddenInputRef.current ?. value,
                "status": 'pending'
            }
            try {
                console.log("Sending data:", body); // Debugging
                const response = await axios.post("http://localhost:4000/api/tasks", body, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then((response) => {
                    setShowAddTask(false)
                    setShowSuccessfulAlert(true)
                    setTasksUpdated(prev => !prev);
                })
                // console.log("Task added:", response.data)
                setShowAddTask(false)
                setTitle('')
                setDescription('')
            } catch (error) {
                console.error("Error adding task:", error);
            }
        }
    };

    // UPDATE TASK STATUS
    const updateTaskStatus = async () => {
      if (!selectedTask) return;
      const selectedTaskIDD = selectedTask.id
      try {
        await axios.put(`http://localhost:4000/api/tasks/${selectedTask.id}`, {
          status: updatedStatus,
        });
    
        alert("Task status updated successfully!");
        setTasksUpdated(prev => !prev);
        setShowModal(false);
      } catch (error) {
        console.error("Error updating task");
      }
    };
     


    return (<IonPage> {/* Header
    <IonHeader>
      <IonToolbar className="custom-toolbar">
        <IonTitle>
          <div style={{
                display: 'flex',
                justifyContent: 'center'
            }}>Task Manager</div>
        </IonTitle>
      </IonToolbar>
    </IonHeader> */}
        {/* Content */}
        <IonContent className="ion-padding">
            <h1 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
              color: '#007AFF',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
              display: 'flex',
              justifyContent: 'center'
            }}>
              📋 Welcome to Task Manager 📋
            </h1>

            {/* Task Cards */}
            {loading ? (
              <div style={{ textAlign: 'center', color:'#ffffff', marginTop: '40px' }}>
                <IonSpinner name="crescent" color='primary' />
                <p style={{
                  color: '#2866b6'
                }}>Loading Tasks...</p>
              </div>
            ) : (
            tasks.map((task: any) => (<IonCard key={
                    task.id
                }
                className="task-card"
                onClick={() => openTaskModal(task)
            }>
                <IonCardHeader>
                    <IonCardTitle className="task-title"> {task.title} </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    <span className={
                        `status-label ${
                            task.status.toLowerCase()
                        }`
                    }> {
                        task.status
                    }</span>
                </IonCardContent>
            </IonCard>)))
        }
            {/* Floating Add Task Button */}
            <IonFab vertical="bottom" horizontal="end" slot="fixed">
                <IonFabButton onClick={
                        () => setShowAddTask(true)
                    }
                    color='dark'>
                    <IonIcon icon={addOutline}/>
                </IonFabButton>
            </IonFab>
            {/* ADD TASK MODAL */}
            <IonModal isOpen={showAddTask}
                onDidDismiss={
                    () => setShowAddTask(false)
            }>
                <IonHeader>
                    <IonToolbar className='add-toolbar'>
                        <IonTitle>Add Task</IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={
                                () => setShowAddTask(false)
                            }>Close</IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    <IonItem className="input-item">
                        <IonInput label="Title" type="text" labelPlacement="floating"
                            value={title}
                            onIonChange={
                                e => setTitle(e.detail.value ?? '')
                            }
                            className="custom-input"/>
                    </IonItem>
                    <IonItem className="input-item">
                        <IonTextarea label="Task Description" labelPlacement="floating"
                            value={description}
                            onIonChange={
                                e => setDescription(e.detail.value ?? '')
                            }
                            className="custom-input"></IonTextarea>
                    </IonItem>
                    <IonButton expand="block" shape='round' color='medium' className='ion-padding' onClick={takePicture}>
                        Upload Image
                      </IonButton>
              
                      {photo && (
                        <IonImg src={photo} style={{ marginTop: '20px', borderRadius: '12px' }} />
                      )}
                    <IonItem className="input-item"
                        style={
                            {display: "none"}
                    }>
                        <IonInput ref={hiddenInputRef}
                            type="text"
                            value={userid} 
                              />
                            
                    </IonItem>
                    {/* Submit Button */}
                    <IonButton expand="block" className="add-task-button ion-padding"
                        onClick={addTask}>
                        Submit
                    </IonButton>
                </IonContent>
            </IonModal>
            {/* Validation Alert */}
            <IonAlert isOpen={showAlert}
                onDidDismiss={
                    () => setShowAlert(false)
                }
                header="Validation Error"
                message="Please fill out all fields."
                buttons={
                    ['OK']
                }/> {/* ALERT IF DATA ADDED SUCCESSFULLY */}
            <IonAlert color='success' isOpen={showSuccessfulAlert}
                onDidDismiss={
                    () => setShowSuccessfulAlert(false)
                }
                header="Task created successfully!"
                message="You have created a new task successfully!"
                buttons={
                    ['OK']
            }></IonAlert>

                <IonAlert color='danger' isOpen={showDeleteAlert}
                onDidDismiss={
                    () => setShowDeleteAlert(false)
                }
                header="Task deleted successfully!"
                message="You have deleted a task successfully!"
                buttons={
                    ['OK']
            }></IonAlert>

            {/* PLEASE LOGIN ALERT */}
            <IonAlert color='danger' isOpen={showLoginAlert}
                onDidDismiss={
                    () => setShowLoginAlert(false)
                }
                header="Invalid Login!"
                message="Please Login to view tasks!"
                buttons={
                    ['OK']
            }></IonAlert>

            {/* Task Details Modal */}
            <IonModal isOpen={showModal}
                onDidDismiss={
                    () => setShowModal(false)
            }>
                <IonContent className="ion-padding"> 
                  {
                    selectedTask && (<>
                        <h2 className="modal-title" style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}> {
                          selectedTask.title
                      }
                      <IonButton shape='round' className='close-task'
                            onClick={
                                () => setShowModal(false)
                        }>
                            <IonIcon icon={closeOutline}
                                slot="start"/>
                            Close
                        </IonButton>
                      </h2>
                        <p className="modal-description"> {
                            selectedTask.description
                        }</p>
                        <span >

                          <IonItem color='dark'>
                            <IonLabel>{selectedTask.status}  </IonLabel>
                            <IonSelect
                              value={updatedStatus}
                              onIonChange={(e) => setUpdatedStatus(e.detail.value)}
                            >
                              <IonSelectOption value="Pending">Pending</IonSelectOption>
                              <IonSelectOption value="InProgress">InProgress</IonSelectOption>
                              <IonSelectOption value="Completed">Completed</IonSelectOption>
                            </IonSelect>
                            <IonButton shape="round" className='' color="light" onClick={updateTaskStatus}>
                              <IonIcon slot="start" icon={pencilOutline}></IonIcon>
                              Update Status
                            </IonButton>

                          </IonItem>
 

                          <span className='ion-padding'  style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '1rem'
                          }}>
                            
                            <IonItem className="input-item"
                                style={
                                    {display: "none"}}>
                                <IonInput ref={hiddenTaskId}
                                    type="text"
                                    value={ selectedTask.id }  />
                            </IonItem>
                            <IonButton color={'danger'} shape="round" onClick={deleteTask}>
                              <IonIcon slot="start" icon={trashBinOutline}></IonIcon>
                              Delete
                            </IonButton>
                          </span>
                        </span>
                        
                    </>)
                } </IonContent>
            </IonModal>
        </IonContent>
    </IonPage>);
};
export default HomePage;