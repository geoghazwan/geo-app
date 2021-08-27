import { IonContent, IonIcon, IonRouterLink, IonText } from "@ionic/react";
import { helpCircleOutline } from "ionicons/icons";
import { Flex } from "@rebass/grid";
import Table from "./Table";

const car = {
  _id: "1kskskkskskskksks",
  driver: { name: "Ahmad" },
  function: "Delivery",
  date: new Date(),
  location: "Damascus",
  destination: "Daraa",
};
const columns = [
  {
    Header: "Car ID",
    accessor: "_id", // String-based value accessors!
  },
  {
    Header: "Driver",
    accessor: "driver.name",
  },

  {
    Header: "Function",
    accessor: "function",
  },
  {
    Header: "Resgieration Date",
    accessor: "date",
    Cell: (props: any) => (
      <span className="number">{(props.value as Date).toDateString()}</span>
    ),
  },
  {
    Header: "Current Location",
    accessor: "location",
  },
  {
    Header: "Current Destination",
    accessor: "destination",
  },
  {
    Header: "More Info",
    accessor: "action",
    Cell: (): JSX.Element => {
      return (
        <IonRouterLink routerLink="/controls/fkkfdkdfkfkfdk">
          <IonIcon
            icon={helpCircleOutline}
            size="large"
            color="primary"
            style={{ cursor: "pointer" }}
          ></IonIcon>
        </IonRouterLink>
      );
    },
  },
];

const data = Array(120)
  .fill(null)
  .map(() => car);

const ListOfCars = (): JSX.Element => {
  return (
    <IonContent>
      <Flex mx="16px" mt="100px" flexDirection="column" width={1}>
        <IonText
          style={{ fontSize: "35px", fontWeight: "bold", marginBottom: "1em" }}
          color="primary"
        >
          Working Cars
        </IonText>
        <Table data={data} columns={columns}></Table>
      </Flex>
    </IonContent>
  );
};

export default ListOfCars;
