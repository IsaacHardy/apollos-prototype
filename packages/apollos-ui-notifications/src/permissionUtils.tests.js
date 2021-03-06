import { client } from './testUtils';
import {
  getPushPermissions,
  GET_NOTIFICATIONS_ENABLED,
  requestPushPermissions,
} from './permissionUtils';
import { defaults } from './store';

client.writeData({ data: defaults });

describe('getPushPermissions', () => {
  it('should return a boolean based on the result from OneSignal', async () => {
    const result = await getPushPermissions();
    expect(result).toEqual(true);
  });
});

describe('requestPushPermissions', () => {
  it('must update the store if OneSignal returns true', async () => {
    expect(
      client.readQuery({ query: GET_NOTIFICATIONS_ENABLED })
    ).toMatchSnapshot('Before calling mutation');

    const result = await requestPushPermissions({ client });
    expect(result).toEqual(true);
    // this doesn't work yet :(
    // the result is same as above, it looks like the client state isn't loading in time
    expect(
      client.readQuery({ query: GET_NOTIFICATIONS_ENABLED })
    ).toMatchSnapshot('After calling mutation');
  });
});
