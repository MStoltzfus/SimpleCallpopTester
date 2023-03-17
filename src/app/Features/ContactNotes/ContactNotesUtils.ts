import { Providers, ProviderState } from "@microsoft/mgt-element";

//assuming a provider has already been initialized

const getToken = async () => {
  if (Providers.globalProvider.state === ProviderState.SignedIn) {
    const token = await Providers.globalProvider.getAccessToken({
      scopes: ["User.Read"],
    });
    return token;
  }
};

const apiUrl = "https://graph.microsoft.com/v1.0/me";

const graphCall = async () => {
  fetch(apiUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${await getToken()}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
};


export { graphCall }