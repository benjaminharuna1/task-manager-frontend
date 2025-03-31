import React, { useState, useEffect } from "react";
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
// import LoginImage from './login.jpg';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [showCreateUserAlert, setShowCreateUserAlert] = useState(false);

  const [semail, setSemail] = useState("");
  const [spassword, setSpassword] = useState("");
  const [name, setName] = useState("");
  // const auth = getAuth();
  const history = useHistory();

    // CHECK FOR AUTH
    const checkuser = async () => {
      try {
          const response = await axios.get("http://localhost:4000/api/users/check").then(() => {
          window.location.href = "/home";  // Redirect only on error
          })
          
        } catch (error) {
          // setShowLoginAlert(true)
          console.error("User check failed:", error.response?.data || error.message);
      }
  };
  useEffect(() => {
          checkuser();
        }, []);
  
  // SIGNIN USERS
  const handleLogin = async () => {

  };
  
  // SIGNUP USERS
  const handleSignup = async () => {
      const body = {
        "name": name,
        "semail": semail,
        "spassword": spassword,
    }
    try {
        console.log("Sending data:", body); // Debugging
        const response = await axios.post("http://localhost:4000/api/users/create", body, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            setShowCreateUserAlert(true)
            setSemail('')
            setSpassword('')
            history.push('/home');
        })
        // console.log("Task added:", response.data)
        // setShowCreateUserAlert(false)
        // setEmail('')
        // setPassword('')
    } catch (error) {
      // const errrr = console.error("Error creating user:", error.response.data.details);
        alert(error.response.data.details);
    }

  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="add-toolbar">
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding form-container">
        <IonItem className="input-item">
          <IonInput
            label="Email"
            type="email"
            labelPlacement="floating"
            value={email}
            onIonChange={(e) => setEmail(e.detail.value!)}
          />
        </IonItem>

        <IonItem className="input-item">
          <IonInput
            label="Password"
            type="password"
            labelPlacement="floating"
            value={password}
            onIonChange={(e) => setPassword(e.detail.value!)}
          />
        </IonItem>

        <IonButton className="input-item ion-padding add-task-button" expand="block" onClick={handleLogin}>
          Login
        </IonButton>

          <IonText className="ion-padding" color={"light"}><h2>OR</h2></IonText>



        {/* FOR SIGNUP */}
        <IonItem className="input-item">
          <IonInput
            label="Name"
            type="text"
            labelPlacement="floating"
            value={name}
            onIonChange={(e) => setName(e.detail.value!)}
          />
        </IonItem>

        <IonItem className="input-item">
          <IonInput
            label="Email"
            type="email"
            labelPlacement="floating"
            value={semail}
            onIonChange={(e) => setSemail(e.detail.value!)}
          />
        </IonItem>

        <IonItem className="input-item">
          <IonInput
            label="Password"
            type="password"
            labelPlacement="floating"
            value={spassword}
            onIonChange={(e) => setSpassword(e.detail.value!)}
          />
        </IonItem>

        <IonButton className="input-item ion-padding add-task-button" color={"success"} expand="block" onClick={handleSignup}>
          Signup
        </IonButton>
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={error}
          duration={3000}
          color="danger"
        />

        <IonAlert color='success' isOpen={showCreateUserAlert}
                        onDidDismiss={
                            () => setShowCreateUserAlert(false)
                        }
                        header="User created successfully!"
                        message="You user account has been created successfully. You can now login"
                        buttons={
                            ['OK']
                    }></IonAlert>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
