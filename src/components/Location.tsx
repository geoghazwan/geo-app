import React, { useState } from "react";
import {
  IonModal,
  IonButton,
  IonInput,
  IonAlert,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonDatetime,
  IonList,
  IonText,
  IonIcon,
  IonCard,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  useIonToast,
} from "@ionic/react";
import "./modal.css";
import { closeSharp } from "ionicons/icons";
import { Flex } from "@rebass/grid";
import { useMutation, useQuery } from "react-query";
import { API_URL } from "../consts";
import { useHistory } from "react-router";

interface IModal {
  shown: boolean;
  close: () => void;
  geo: { lat: string; lon: string };
}
export const Modal: React.FC<IModal> = ({ shown, close, geo }) => {
  const [view, setView] = useState("");
  const [zoom, setZoom] = useState("");

  const [src, setSrc] = useState({
    path: `https://maps.google.com/maps?q=${geo.lat}, ${geo.lon}&t=&z=17&ie=UTF8&iwloc=&output=embed`,
    mode: "normal",
  });

  return (
    <IonModal
      showBackdrop
      onDidDismiss={close}
      isOpen={shown}
      cssClass="my-custom-class"
    >
      <Flex flexDirection={"column"} padding="1em">
        <IonButton
          onClick={(): void =>
            setSrc((prev): any => {
              if (prev.mode === "normal") {
                const path = prev.path.replace("t=&", "t=k&");
                return { path, mode: "sat" };
              }
              return { path: prev.path.replace("t=k&", "t=&") };
            })
          }
          color="primary"
        >
          Switch To {src.mode === "sat" ? "Normal" : "Satellite"}
        </IonButton>
        <IonButton
          onClick={close}
          style={{ marginBottom: "1em" }}
          color="danger"
        >
          Close
        </IonButton>

        <iframe
          width="600"
          height="500"
          id="gmap_canvas"
          src={src.path}
          frameBorder={0}
          scrolling="no"
          title="map"
          marginHeight={0}
          marginWidth={0}
        ></iframe>
      </Flex>
    </IonModal>
  );
};
