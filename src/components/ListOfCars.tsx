import {
  IonIcon,
  IonRouterLink,
  IonText,
  IonLoading,
  IonContent,
} from "@ionic/react";
import { helpCircleOutline } from "ionicons/icons";
import { Flex } from "@rebass/grid";
import Table from "./Table";
import format from "date-fns/format";
import { addDays } from "date-fns/esm";
import { useQuery } from "react-query";
import { API_URL } from "../consts";

const car = {
  _id: "507f1f77bcf86cd799439011",
  driver: { name: "Ahmad" },
  function: "Delivery",
  date: new Date(),
  location: "Kafar Sousah",
  destination: "Mazzeh",
};

const car2 = {
  _id: "324f1b77bcf26cd799439021",
  driver: { name: "Salem" },
  function: "Truck",
  date: addDays(Date.now(), -2),
  location: "Soumaryyah",
  destination: "Baramkeh",
};

const car3 = {
  _id: "324f1b77bcf26cd799439021",
  driver: { name: "Samir" },
  function: "Workers pick up",
  date: addDays(Date.now(), -222),
  location: "Zahera",
  destination: "Bab Touma",
};
const car4 = {
  _id: "302f1b77bcw26cd711439021",
  driver: { name: "Khaled" },
  function: "Delivery",
  date: addDays(Date.now(), -400),
  location: "Jaramanah",
  destination: "Bab Sharqi",
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
    accessor: "registerationDte",
    Cell: (props: any) => {
      console.log({ props });
      return (
        <span className="number">
          {props.value
            ? format(new Date(props.value) as any, "MMM dd, yyyy")
            : "NA"}
        </span>
      );
    },
  },

  {
    Header: "Current Destination",
    accessor: "destination.geo.lat",
  },
  {
    Header: "More Info",
    accessor: "action",
    Cell: (props: any): JSX.Element => {
      return (
        <IonRouterLink routerLink={"/controls/" + props.original._id}>
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

const data = [car, car2, car3, car4];

const ListOfCars = (): JSX.Element => {
  const { data, isLoading, error } = useQuery("cars", () => {
    return fetch(`${API_URL}/api/car`).then((res) => res.json());
  });
  if (isLoading || !data) return <IonLoading isOpen={true} />;

  console.log({ data, isLoading, error });
  const cars = data.result;
  return (
    <IonContent>
      <Flex mx="16px" mt="100px" flexDirection="column" width={1}>
        <IonText
          style={{ fontSize: "35px", fontWeight: "bold", marginBottom: "1em" }}
          color="primary"
        >
          Working Cars
        </IonText>
        <Table data={cars} columns={columns}></Table>
      </Flex>
    </IonContent>
  );
};

export default ListOfCars;
