import { gql, useQuery } from "@apollo/client";

import { GET_CLIENTS } from "../queries/clientQueries";
import ClientRow from './ClientRow'
import Loader from "./Loader";


const Clients = () => {
  const { loading, error, data } = useQuery(GET_CLIENTS);
  if(loading) return <Loader />
  if(error) return <p>Something went wrong</p>
  return <>{!loading && !error && (
    <table className="table table-hover mt-3">
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {data.clients.map((client) => (
                <ClientRow key={client.id} client={client}/>
            ))}
        </tbody>
    </table>
  )}</>;
};

export default Clients;