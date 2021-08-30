import {
  IonText,
  IonButton,
  IonImg,
  IonContent,
  IonLoading,
  useIonToast,
} from "@ionic/react";
import { ReactBingmaps } from "react-bingmaps-plus";
import { Flex } from "@rebass/grid";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { Modal as Location } from "./Location";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router";
import styled from "styled-components";
import { API_URL } from "../consts";

const Card = styled.div`
  background-color: #fff;
  border: 1px solid #f2f2f2;
  padding: 1em;
  border-radius: 8px;
  margin-right: 1em;
  width: 40%;
`;

const Wrapper = styled.div`
  & .modal-wrapper {
    height: 98vh !important;
  }
`;

const Line = styled.span`
  height: 1px;
  background-color: #e8e8e8;
  margin-top: 16px;
  margin-bottom: 16px;
`;

const Control = (): JSX.Element => {
  const params: any = useParams();
  const [isOpen, setOpen] = useState(false);
  const handle = useFullScreenHandle();
  const [showed, setShown] = useState("");
  const [src, setBlob] = useState<any>();
  const [present, dismiss] = useIonToast();
  const { data, isLoading, refetch } = useQuery("car", () =>
    fetch(`${API_URL}/api/car/single/${params?.id}`).then((res) => res.json())
  );
  const stopCar = useMutation(() =>
    fetch(`${API_URL}/api/car/stop/${params?.id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((res) => res.json())
  );
  const startCar = useMutation(() =>
    fetch(`${API_URL}/api/car/start/${params?.id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((res) => res.json())
  );
  const captureImage = useMutation(() =>
    fetch(`${API_URL}/api/car/capture`)
      .then((res) => res.blob())
      .then((blob) => {
        setBlob(URL.createObjectURL(blob));
      })
  );

  if (isLoading || !data) return <IonLoading isOpen={true} />;

  return (
    <IonContent>
      <Flex flexDirection="row" mt="1em" mx="1em" flexWrap="wrap">
        <Card>
          <IonText
            color="secondary"
            style={{ fontSize: "20px", fontWeight: "700" }}
          >
            Details
          </IonText>
          <Flex flexDirection="column">
            <Flex mt="1.5em" justifyContent="space-between">
              <IonText color="Id" style={{ fontWeight: "700" }}>
                ID
              </IonText>
              <IonText color="Id">{data._id}</IonText>
            </Flex>
            <Line />

            <Flex justifyContent="space-between">
              <IonText color="Id" style={{ fontWeight: "700" }}>
                Location
              </IonText>
              <IonText color="Id">Damascus</IonText>
            </Flex>

            <Line />

            <Flex justifyContent="space-between">
              <IonText color="Id" style={{ fontWeight: "700" }}>
                Function
              </IonText>
              <IonText color="Id">{data.function}</IonText>
            </Flex>
            <Line />

            <Flex justifyContent="space-between">
              <IonText color="Id" style={{ fontWeight: "700" }}>
                Destination
              </IonText>
              <IonText color="Id">Daraa</IonText>
            </Flex>
            <Line />

            <Flex justifyContent="space-between">
              <IonText color="Id" style={{ fontWeight: "700" }}>
                Driver Name
              </IonText>
              <IonText color="Id">{data?.driver?.name}</IonText>
            </Flex>
          </Flex>
        </Card>

        <Card>
          <IonText
            color="secondary"
            style={{ fontSize: "20px", fontWeight: "700" }}
          >
            Actions
          </IonText>

          <Flex
            width={1}
            flexDirection="column"
            mt={"1.5em"}
            style={{ gap: "10px" }}
          >
            <IonButton
              onClick={async () => {
                captureImage.mutateAsync().then((res) => {
                  console.log({ rrrrr: res });
                });
              }}
              size="large"
              expand="block"
              color="primary"
            >
              Take Picture Of Driver
            </IonButton>
            {src && (
              <Flex flexDirection="column" width={1}>
                <IonImg
                  src={src}
                  style={{ marginTop: "10px", width: "100%" }}
                />
                <IonButton color="dark" onClick={(): void => setBlob("")}>
                  Close Image
                </IonButton>
              </Flex>
            )}

            <IonButton size="large" expand="block" color="danger">
              Shutdown Car
            </IonButton>

            <IonButton
              size="large"
              expand="block"
              color="success"
              onClick={(): void => {
                startCar.mutateAsync().then(async (): Promise<void> => {
                  await refetch();
                  present({
                    buttons: [
                      { text: "show location", handler: () => setOpen(true) },
                      { text: "hide", handler: () => dismiss() },
                    ],
                    message: `${data.function} car has started!`,
                    onDidDismiss: () => console.log("dismissed"),
                    onWillDismiss: () => console.log("will dismiss"),
                  });
                });
              }}
            >
              Start Car
            </IonButton>

            <IonButton
              size="large"
              expand="block"
              color="danger"
              onClick={(): void => {
                stopCar.mutateAsync().then(async (): Promise<void> => {
                  await refetch();
                  present({
                    buttons: [
                      { text: "show location", handler: () => setOpen(true) },
                      { text: "hide", handler: () => dismiss() },
                    ],
                    message: `${data.function} car has stopped!`,
                    onDidDismiss: () => console.log("dismissed"),
                    onWillDismiss: () => console.log("will dismiss"),
                  });
                });
              }}
            >
              Stop Car
            </IonButton>

            <IonButton
              onClick={async (): Promise<void> => {
                setShown("location");
                handle.enter();
              }}
              size="large"
              expand="block"
              color="secondary"
            >
              Car Location
            </IonButton>
            <IonButton
              onClick={async (): Promise<void> => {
                setShown("path");
                handle.enter();
              }}
              size="large"
              expand="block"
              color="dark"
            >
              Car Path
            </IonButton>
          </Flex>
        </Card>
      </Flex>
      <Wrapper>
        <Location
          close={(): void => setOpen(false)}
          shown={isOpen}
          geo={{
            lat: data?.location?.geo?.lat,
            lon: data?.location?.geo?.long,
          }}
        />
      </Wrapper>
      <FullScreen handle={handle}>
        {showed === "path" && (
          <ReactBingmaps
            bingmapKey="ArbnYp2XOhXHppjcXt5Oumig-8-UxAJVdt84t-yf9CfodGujDflYs3Q-izpj8BfV"
            zoom={60}
            id={2}
            mapTypeId={"aerial"}
            directions={{
              renderOptions: {
                itineraryContainer: "itineraryContainer",
                showInputPanel: "directionsPanel",
              },
              requestOptions: { routeMode: "driving", maxRoutes: 2 },
              wayPoints: [
                {
                  address: "Damascus, Syria",
                },
                {
                  address: "Hims, Syria",
                },
              ],
            }}
            center={[data?.location?.geo?.lat, data?.location?.geo?.long]}
          ></ReactBingmaps>
        )}
        {showed === "location" && (
          <ReactBingmaps
            bingmapKey="ArbnYp2XOhXHppjcXt5Oumig-8-UxAJVdt84t-yf9CfodGujDflYs3Q-izpj8BfV"
            zoom={60}
            mapTypeId={"aerial"}
            center={[data?.location?.geo?.lat, data?.location?.geo?.long]}
          ></ReactBingmaps>
        )}
      </FullScreen>
    </IonContent>
  );
};

export default Control;
