import React from 'react';
import { IonApp, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet, setupIonicReact, IonNavLink } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import axios from 'axios';

import { Route, Redirect } from 'react-router';

import { homeOutline, chatboxEllipsesOutline, logOutOutline, lockClosedOutline } from 'ionicons/icons';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import './pages/GlobalStyle.css';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import Ai from './pages/Ai';

setupIonicReact();

const handleLogout = async () => {
  try {
      const response = await axios.get("https://task-manager-xwav.onrender.com/api/users/signout");
      console.log("Logout response:", response.data);

      // Redirect or refresh after logout (optional)
      alert('Logout successful')
      window.location.href = "/login"; // Change to your login route
  } catch (error) {
    console.error("Logout failed:", (error as Error).message);

  }
};

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Redirect exact path="/" to="/login" />
          {/*
          Use the render method to reduce the number of renders your component will have due to a route change.

          Use the component prop when your component depends on the RouterComponentProps passed in automatically.
        */}
          <Route path="/home" render={() => <HomePage />} exact={true} />
          <Route path="/chatbot" render={() => <Ai />} exact={true} />
          <Route path="/login" render={() => <LoginPage />} exact={true} />

        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/home">
            <IonIcon icon={homeOutline} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>

          <IonTabButton tab="chatbot" href="/chatbot">
            <IonIcon icon={chatboxEllipsesOutline} />
            <IonLabel>ChatBot</IonLabel>
          </IonTabButton>
            
          <IonTabButton tab="logout" onClick={handleLogout}>
            <IonIcon icon={logOutOutline} />
            <IonLabel>Logout</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
