import React, { useState } from 'react';
import { IonAlert, IonButton, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonTitle, IonToolbar } from '@ionic/react';
import './AddTask.css'

const AddTask = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showAlert, setShowAlert] = useState(false);
  
    const handleSubmit = () => {
      if (!fullName || !email) {
        setShowAlert(true);
      } else {
        alert(`Submitted:\nName: ${fullName}\nEmail: ${email}`);
        setFullName('');
        setEmail('');
        setPassword('');
      }
    };
    
  return (
  <>
    <IonHeader>
      <IonToolbar>
        <IonTitle>
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          Add Task
          </div>
        </IonTitle>
      </IonToolbar>
    </IonHeader>
      <IonContent className="ion-padding form-container">
        {/* Name Input */}
        <IonItem className="input-item">
          <IonInput
            label="Name"
            type='text'
            labelPlacement="floating"
            value={fullName}
            onIonChange={e => setFullName(e.detail.value!)}
            className="custom-input"
          />
        </IonItem>

        {/* Email Input */}
        <IonItem className="input-item">
          <IonInput
            labelPlacement='floating'
            label="Email"
            type="email"
            value={email}
            onIonChange={e => setEmail(e.detail.value!)}
            className="custom-input"
          />
        </IonItem>

        {/* Password Input */}
        <IonItem className="input-item">
          <IonInput
            label="Password"
            labelPlacement="floating"
            type="password"
            value={password}
            onIonChange={e => setPassword(e.detail.value!)}
            className="custom-input"
          />
        </IonItem>

        {/* Submit Button */}
        <IonButton expand="block" className="submit-button" onClick={handleSubmit}>
          Submit
        </IonButton>

        {/* Validation Alert */}
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Validation Error"
          message="Please fill out all fields."
          buttons={['OK']}
        />
    </IonContent>
  </>
)};

export default AddTask
