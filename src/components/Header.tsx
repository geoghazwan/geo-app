import React, { useState } from "react";
import {
  IonHeader,
  IonToolbar,
  IonButton,
  IonRouterLink,
  IonTitle,
  IonImg,
} from "@ionic/react";
import { Modal } from "./AddDriver";
import { Flex } from "@rebass/grid";

export const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Modal close={(): void => setOpen(false)} shown={open}></Modal>
      <IonHeader
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          alignItems: "center",
        }}
      >
        <IonToolbar>
          <IonTitle color={"tertiary"}>
            <IonRouterLink routerLink={"/home"}>
              <IonImg src={"/logo.png"} style={{ width: "100px" }}></IonImg>
            </IonRouterLink>
          </IonTitle>
        </IonToolbar>

        <IonToolbar>
          <Flex>
            <IonTitle color={"tertiary"} style={{ cursor: "pointer" }}>
              <IonRouterLink routerLink={"/home"}>Home</IonRouterLink>
            </IonTitle>
            <IonTitle style={{ cursor: "pointer" }} color={"tertiary"}>
              <IonRouterLink routerLink="/cars">Cars</IonRouterLink>
            </IonTitle>

            <IonTitle style={{ cursor: "pointer" }} color={"tertiary"}>
              <IonRouterLink routerLink="/activities">Activties</IonRouterLink>
            </IonTitle>
          </Flex>
        </IonToolbar>

        <IonToolbar>
          <Flex justifyContent="flex-end" style={{ paddingRight: "16px" }}>
            <IonButton onClick={(): void => setOpen(true)}>Sign up</IonButton>
          </Flex>
        </IonToolbar>
      </IonHeader>
    </>
  );
};
