import ApollosConfig from '@apollosproject/config';
import { AuthenticationError } from 'apollo-server';

export const enforceProtocol = ({ uri }) =>
  uri.startsWith('//') ? `https:${uri}` : uri;

export const createImageUrlFromGuid = ({ uri }) =>
  uri.split('-').length === 5
    ? `${ApollosConfig.ROCK.IMAGE_URL}?guid=${uri}`
    : enforceProtocol({ uri });

export const latLonDistance = ({
  latitude,
  longitude,
  campusLatitude,
  campusLongitude,
}) => {
  if (latitude === campusLatitude && longitude === campusLongitude) {
    return 0;
  }
  const radlat1 = (Math.PI * latitude) / 180;
  const radlat2 = (Math.PI * campusLatitude) / 180;
  const theta = longitude - campusLongitude;
  const radtheta = (Math.PI * theta) / 180;
  let dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  if (dist > 1) {
    dist = 1;
  }
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  return dist;
};

export const enforceCurrentUser = ({ func }) => async (
  root,
  args,
  context,
  info
) => {
  try {
    const currentPerson = await context.dataSources.Auth.getCurrentPerson();
    if (root.id !== currentPerson.id) {
      return null;
    }
  } catch (e) {
    if (!(e instanceof AuthenticationError)) {
      throw e;
    }
    return null;
  }
  return func(root, args, context, info);
};
