/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import { lazy, Suspense } from "react";
import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, IonContent } from "@ionic/react";
import { Header } from "./components/Header";
import { IonReactRouter } from "@ionic/react-router";

import { QueryClient, QueryClientProvider } from "react-query";

const Home = lazy(() => import("./components/LandingPage"));
const Cars = lazy(() => import("./components/ListOfCars"));
const Activities = lazy(() => import("./components/Activities"));

const Control = lazy(() => import("./components/Control"));

export const theme = {
  primary: "#263B97",
  accent: "#8FAACD",
};

const queryClient = new QueryClient();

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <IonApp style={{ background: "#F9FAFF" }}>
      <Header />
      <IonContent scrollX={true} scrollY={true} className="overflow-scroll">
        <Suspense fallback={null}>
          <IonReactRouter>
            <IonRouterOutlet>
              <Route path="/home" component={Home} exact={true} />
              <Route path="/cars" component={Cars} exact={true} />
              <Route path="/activities" component={Activities} exact={true} />
              <Route path="/controls/:id" component={Control} exact={true} />
              <Route exact path="/" render={() => <Redirect to="/home" />} />
            </IonRouterOutlet>
          </IonReactRouter>
        </Suspense>
      </IonContent>
    </IonApp>
  </QueryClientProvider>
);

export default App;
