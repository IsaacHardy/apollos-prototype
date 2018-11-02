/* eslint-disable */
import takeScreenshot from './helpers';

describe('Login View', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  afterEach(async () => {
    takeScreenshot();
  });

  const goToLoginForm = async () => {
    await element(by.id('profileTab')).atIndex(0).tap();
    await expect(element(by.id('connectView'))).toBeVisible();
    await element(by.id('getConnected')).tap();
    await expect(element(by.id('loginView'))).toBeVisible();
  }  

  it('should start and display home tab', async () => {
    await expect(element(by.id('homeView'))).toBeVisible();
  });

  it('should display profile tab', async () => {
    await element(by.id('profileTab')).atIndex(0).tap();
    await expect(element(by.id('connectView'))).toBeVisible();
  });

  it('should display login screen with slide up', async () => {
    await goToLoginForm();
  });

  it('should display login screen with slide up then slide down', async () => {
    await goToLoginForm();
    await element(by.text('Cancel')).tap();
    await expect(element(by.id('connectView'))).toBeVisible();
  });
});

describe('Login / Register', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  afterEach(async () => {
    takeScreenshot();
  });

  const goToRegisterForm = async () => {
    await element(by.id('profileTab')).atIndex(0).tap();
    await expect(element(by.id('connectView'))).toBeVisible();
    await element(by.id('getConnected')).tap();
    await expect(element(by.id('loginView'))).toBeVisible();
    await element(by.text('Register')).atIndex(0).tap();
    await expect(element(by.id('registerSubmitButton'))).toBeVisible();
  }  

  it('should display the register form', async () => {
    await goToRegisterForm();
  });

  it('should display Invalid Email Address error', async () => {
    await goToRegisterForm();

    await expect(element(by.id('registerEmailInput'))).toBeVisible();
    await element(by.id('registerEmailInput')).tap();
    await element(by.id('registerEmailInput')).typeText('bademail');

    await expect(element(by.text('Invalid email address'))).toBeVisible();
  });

  it('should properly register a user', async () => {
    await goToRegisterForm();

    await expect(element(by.id('registerEmailInput'))).toBeVisible();
    await element(by.id('registerEmailInput')).tap();
    await element(by.id('registerEmailInput')).typeText('goodemail@gmail.com');

    await expect(element(by.id('registerPasswordInput'))).toBeVisible();
    await element(by.id('registerPasswordInput')).tap();
    await element(by.id('registerPasswordInput')).typeText('goodpassword\n');

    await expect(element(by.id('registerSubmitButton'))).toBeVisible();
    await element(by.id('registerSubmitButton')).tap();
  });
});