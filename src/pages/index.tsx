import * as React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { User } from 'src/entity/User';

export const query = gql`
query {
    me {
        id
        email
    }
}
`

type Response = {
    me: User
}

export default () => <div>
    hihihi!!!
    <Query<Response> query={query}>{({loading, error, data, fetchMore}) => {
        return <div>{data && data.me && data.me.email}</div>
    }}</Query>

</div>