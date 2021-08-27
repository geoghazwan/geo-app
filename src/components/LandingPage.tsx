import React, { useState } from "react";
import {
  IonContent,
  IonButtons,
  IonButton,
  IonText,
  IonRouterLink,
} from "@ionic/react";
import { Modal } from "./Modal";
import { Flex } from "@rebass/grid";
import { ReactComponent } from "./svg.svg";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const Landing: React.FC = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <IonContent>
      <Modal shown={isOpen} close={(): void => setOpen(false)}></Modal>
      <Flex
        px={"100px"}
        justifyContent="space-between"
        alignItems="center"
        style={{
          transform: "translate(0px, -100px)",
          background: "url('/background.svg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        <Flex flexDirection="column">
          <IonText
            style={{ fontSize: "48px", fontWeight: "bold" }}
            color="tertiary"
          >
            GPS Tracking System
          </IonText>
          <IonText
            style={{
              fontSize: "35px",
              width: "500px",
              marginTop: "16px",
              marginBottom: "32px",
            }}
            color="tertiary"
          >
            Fully integratable systems for componaies and invidivuals to safely
            track a car or group of cars
          </IonText>

          <Flex justifyContent="flex-start">
            <IonButtons>
              <IonButton
                expand="block"
                fill="outline"
                color="primary"
                size="large"
                onClick={(): void => setOpen(true)}
                style={{ height: "50px", borderRadius: "8px !important" }}
              >
                Add New Car
              </IonButton>
              <IonRouterLink routerLink="/cars">
                <IonButton
                  style={{ height: "50px" }}
                  fill="solid"
                  expand="block"
                  color="primary"
                  size="large"
                >
                  List Cars
                </IonButton>
              </IonRouterLink>
            </IonButtons>
          </Flex>
        </Flex>
        <ReactComponent
          style={{ transform: "translate(140px, 25px)" }}
          width="1100px"
        />
      </Flex>
    </IonContent>
  );
};
export default Landing;
