import { environment } from 'src/enviornments/environment';

const basePath = environment.backendApi;

export const backendApis = {
  videosApi: `${basePath}/videos`,
  usersApi: `${basePath}/users/self`,
};
