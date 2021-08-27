import React, { useState } from "react";
import {
  IonModal,
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
  IonSpinner,
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
}

export const Modal: React.FC<IModal> = ({ shown, close }) => {
  const { data } = useQuery("drivers", () =>
    fetch(`${API_URL}/api/driver`).then((res) => res.json())
  );
  const [func, setFunc] = useState("");
  const history = useHistory();
  const [driver, setDriver] = useState("");
  const [model, setModel] = useState("");
  const [speed, setSpeed] = useState<number>();
  const [date, setDate] = useState<Date>(new Date());

  const addNewCar = useMutation(() =>
    fetch(`${API_URL}/api/car/create`, {
      method: "post",
      body: JSON.stringify({
        name: String(model),
        function: func,
        driver,
        contractExpiration: date,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((res) => res.json())
  );

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
            Add Car{" "}
          </IonText>
          <IonIcon
            onClick={close}
            style={{ cursor: "pointer" }}
            size="large"
            color="dark"
            icon={closeSharp}
          ></IonIcon>
        </Flex>
        <Flex alignItems="center">
          <IonCard>
            <IonItemDivider color="secondary">
              Modal (any identifier)
            </IonItemDivider>
            <IonItem>
              <IonInput
                value={model}
                type="text"
                placeholder="Enter Model"
                onIonChange={(e) => setModel(e.detail.value!)}
                clearInput
              ></IonInput>
            </IonItem>
          </IonCard>

          <IonCard>
            <IonItemDivider color="secondary">
              Function (what is it supposed to do)
            </IonItemDivider>
            <IonItem>
              <IonInput
                value={func}
                type="text"
                placeholder="Enter Func"
                onIonChange={(e) => setFunc(e.detail.value!)}
                clearInput
              ></IonInput>
            </IonItem>
          </IonCard>
        </Flex>
        <Flex alignItems="center">
          <IonCard style={{ width: "100%" }}>
            <IonItemDivider color="secondary">
              Maximum allowed speed
            </IonItemDivider>
            <IonItem>
              <IonInput
                value={speed}
                type="number"
                placeholder="Max Speed"
                onIonChange={(e) => setSpeed(+e.detail.value! as any)}
                clearInput
              ></IonInput>
            </IonItem>
          </IonCard>

          <IonCard style={{ width: "100%" }}>
            <IonItemDivider color="secondary">
              Contract Expiration
            </IonItemDivider>
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
        </Flex>

        <IonCard>
          <IonItem>
            <IonLabel>Driver</IonLabel>
            <IonSelect
              value={driver}
              placeholder="Select One"
              onIonChange={(e) => setDriver(e.detail.value)}
            >
              {data?.result?.map((option: any) => {
                return (
                  <IonSelectOption key={option._id} value={option?._id}>
                    {option?.name}
                  </IonSelectOption>
                );
              })}
            </IonSelect>
          </IonItem>
        </IonCard>
      </IonList>
      <Flex mb="2em" mx="1.5em">
        <IonButton
          onClick={async (): Promise<void> => {
            await addNewCar.mutateAsync();
            history.push("/cars");
          }}
          style={{ width: "100%" }}
          expand="full"
          color="primary"
        >
          {addNewCar.isLoading ? <IonSpinner></IonSpinner> : "Submit"}
        </IonButton>
        <IonButton color="danger" style={{ width: "100%" }} onClick={close}>
          Close Modal
        </IonButton>
      </Flex>
    </IonModal>
  );
};
