import React, { useState } from "react";
import addYears from "date-fns/addYears";
import {
  IonModal,
  IonInfiniteScroll,
  IonButton,
  IonInput,
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
  IonContent,
} from "@ionic/react";
import "./modal.css";
import { closeOutline, closeSharp, text } from "ionicons/icons";
import { Flex } from "@rebass/grid";
interface IModal {
  shown: boolean;
  close: () => void;
}
export const Modal: React.FC<IModal> = ({ shown, close }) => {
  const [name, setName] = useState("");
  const [car, setCar] = useState<number>();
  const [date, setDate] = useState<Date>(new Date());

  return (
    <IonModal
      showBackdrop
      onDidDismiss={close}
      isOpen={shown}
      cssClass="my-custom-class"
    >
      <IonList style={{ padding: "24px", display: "grid", gap: "10px" }}>
        <Flex mb="1.5em" justifyContent="space-between" width={1}>
          <IonText
            style={{ fontWeight: 700, fontSize: "20px" }}
            color="primary"
          >
            Add Driver{" "}
          </IonText>
          <IonIcon
            onClick={close}
            style={{ cursor: "pointer" }}
            size="large"
            color="dark"
            icon={closeSharp}
          ></IonIcon>
        </Flex>
        <IonCard>
          <IonItemDivider color="secondary">Full Name</IonItemDivider>
          <IonItem>
            <IonInput
              value={name}
              type="text"
              placeholder="Enter Your Full Name"
              onIonChange={(e) => setName(e.detail.value!)}
              clearInput
            ></IonInput>
          </IonItem>
        </IonCard>

        <IonCard>
          <IonItem>
            <IonLabel>Car</IonLabel>
            <IonSelect
              value={car}
              placeholder="Select One"
              onIonChange={(e) => setCar(e.detail.value)}
            >
              <IonSelectOption value="female">Female</IonSelectOption>
              <IonSelectOption value="male">Male</IonSelectOption>
            </IonSelect>
          </IonItem>
        </IonCard>

        <IonCard>
          <IonItemDivider color="secondary">Contract Expiration</IonItemDivider>
          <IonItem>
            <IonDatetime
              value={date.toDateString()}
              placeholder="Contract Expiration"
              max="2099-10-31"
              displayFormat="D MMM, YYYY"
              pickerFormat="DD MMM YYYY"
              onIonChange={(e) => {
                setDate(new Date(e.detail.value as any));
              }}
            ></IonDatetime>
          </IonItem>
        </IonCard>
      </IonList>
      <Flex mb="2em" mx="1.5em">
        <IonButton style={{ width: "100%" }} expand="full" color="primary">
          Submit
        </IonButton>
        <IonButton color="danger" style={{ width: "100%" }} onClick={close}>
          Close Modal
        </IonButton>
      </Flex>
    </IonModal>
  );
};
