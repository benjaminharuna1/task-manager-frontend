import React, { useState } from "react";
import {
  IonPage,
  IonContent,
  IonInput,
  IonItem,
  IonButton,
  IonToast,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonText,
  IonAlert,
} from "@ionic/react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const LogoutPage = () => {
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const history = useHistory();
  

  // SIGNOUT USERS
  try {
    console.log("Signing Out....:"); // Checks
    const response = axios.get("http://localhost:4000/api/users/signout")
    .then((response) => {
        setShowLogoutAlert(true)
        history.push('/login');
        console.log(response)
    })
} catch (error) {
  // const errrr = console.error("Error creating user:", error.response.data.details);
    alert(error.response.data.details);
    console.log(response)
    history.push('/home')
}

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="add-toolbar">
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding form-container">
        <IonAlert color='success' isOpen={showLogoutAlert} onDidDismiss={() => setShowLogoutAlert(false)}
            header="user logged out successfully!"
            message="You have logged out of your account successfully."
            buttons={['OK']}
            ></IonAlert>
      </IonContent>
    </IonPage>
  );
};

export default LogoutPage;
