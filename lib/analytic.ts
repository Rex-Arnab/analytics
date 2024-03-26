import axios from "axios";

export const fetchCarts = async () => {
  const cartResp = await axios.get("https://analytics.zithara.com/cart");
  const cartData = await cartResp.data;
  return cartData;
};

export const recordUser = async (sessionId: string, domain_id: string) => {
  const source = document.referrer;
  const fcm_token = Math.random().toString(36).substring(7);
  const randomGender = Math.random() > 0.5 ? "Male" : "Female";
  const randomMobileNumber = Math.floor(Math.random() * 10000000000);
  const resp = await axios.post("https://analytics.zithara.com/user", {
    _sessionId: sessionId,
    uid: "123",
    pid: "123",
    domain_id: domain_id,
    user: {
      user_id: "123",
      username: "John Doe",
      mobile: randomMobileNumber,
      email: "khanp4397@gmail.com",
      gender: randomGender,
      fcm_token: fcm_token
    },
    location: {
      speed: "0",
      heading: "0",
      altitude: "0",
      accuracy: "0",
      longitude: "0",
      altitude_accuracy: "0",
      latitude: "0"
    },
    device: {
      api: "0",
      os: "Android",
      manufacturer: "Samsung",
      name: "Samsung Galaxy S10",
      app: "com.example.app",
      zone: "Asia/Kolkata",
      source: source
    },
    action: "start",
    secrets: "123",
    action_id: "start-0"
  });
  return resp.data;
};

export const trackScreen = async (
  sessionId: string,
  domainId: string,
  action: string
) => {
  const resp = await axios.post("https://analytics.zithara.com/analytic", {
    _sessionId: sessionId,
    uid: "123",
    pid: "123",
    domain_id: domainId,
    action: action,
    action_id: "screen-01"
  });
  return resp.data;
};

export const trackEvent = async (
  sessionId: string,
  domainId: string,
  action: string
) => {
  const resp = await axios.post("https://analytics.zithara.com/analytic", {
    _sessionId: sessionId,
    uid: "123",
    pid: "123",
    domain_id: domainId,
    action: action,
    action_id: "event-03"
  });
  return resp.data;
};
