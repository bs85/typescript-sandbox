import * as React from 'react';

class ApiClient {
    constructor(
        public baseURL,
    ) {}
}

const Context = React.createContext<ApiClient>((undefined as any) as ApiClient);

export const { Provider } = Context;

interface IWithApiClient {
    apiClient: ApiClient;
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export function withApiClient<
    P extends IWithApiClient,
    R = Omit<P, keyof IWithApiClient>,
>(
    Component: React.ComponentClass<P> | React.StatelessComponent<P>,
): React.SFC<R> {
    return function BoundComponent(props: R) {
        return (
            <Context.Consumer>
                {(value) => <Component {...props} apiClient={value} />}
            </Context.Consumer>
        );
    };
}
