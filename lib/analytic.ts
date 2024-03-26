import axios from "axios";

let sessionId = "";
let domainId = "";
export const fetchCarts = async () => {
  const cartResp = await axios.get("https://analytics.zithara.com/cart");
  const cartData = await cartResp.data;
  return cartData;
};

export const recordUser = async (session_id: string, domain_id: string) => {
  const source = document.referrer;
  const fcm_token = Math.random().toString(36).substring(7);
  const randomGender = Math.random() > 0.5 ? "Male" : "Female";
  const randomMobileNumber = Math.floor(Math.random() * 10000000000);

  sessionId = session_id;
  domainId = domain_id;
  const resp = await axios.post("https://analytics.zithara.com/user", {
    _sessionId: session_id,
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
  session_id: string,
  domain_id: string,
  action: string
) => {
  sessionId = session_id;
  domainId = domain_id;
  const resp = await axios.post("https://analytics.zithara.com/analytic", {
    _sessionId: session_id,
    uid: "123",
    pid: "123",
    domain_id: domain_id,
    action: action,
    action_id: "screen-01"
  });
  return resp.data;
};

export const trackEvent = async (
  session_id: string,
  domain_id: string,
  action: string
) => {
  sessionId = session_id;
  domainId = domain_id;
  const resp = await axios.post("https://analytics.zithara.com/analytic", {
    _sessionId: session_id,
    uid: "123",
    pid: "123",
    domain_id: domain_id,
    action: action,
    action_id: "event-03"
  });
  return resp.data;
};

interface ProductType {
  id: string;
  name: string;
  category: string;
  price: number;
}

export const trackViewContent = async (product: ProductType) => {
  const { id, name, category, price } = product;
  const resp = await axios.post("https://analytics.zithara.com/analytic", {
    _sessionId: sessionId,
    uid: "123",
    pid: "123",
    domain_id: domainId,
    sku: "ABC123",
    product_id: id,
    product_name: name,
    product_category: category,
    product_variant: "Variant A",
    product_brand: "Brand ABC",
    price: price,
    quantity: 1,
    action_id: "view_content-07"
  });
  return resp.data;
};

export const trackAddToCart = async (product: ProductType) => {
  const { id, name, category, price } = product;
  const resp = await axios.post("https://analytics.zithara.com/analytic", {
    _sessionId: sessionId,
    uid: "123",
    pid: "123",
    domain_id: domainId,
    value: 100,
    items: [
      {
        sku: "ABC123",
        product_id: id,
        product_name: name,
        product_category: category,
        product_variant: "Green",
        product_brand: "Apple",
        price: price,
        quantity: 1
      }
    ],
    action_id: "add_to_cart-08"
  });
  return resp.data;
};

export const trackRemoveFromCart = async (product: ProductType) => {
  const { id, name, category, price } = product;
  const resp = await axios.post("https://analytics.zithara.com/analytic", {
    _sessionId: sessionId,
    uid: "123",
    pid: "123",
    domain_id: domainId,
    value: 100,
    items: [
      {
        sku: "ABC123",
        product_id: id,
        product_name: name,
        product_category: category,
        product_variant: "Green",
        product_brand: "Apple",
        price: price,
        quantity: 1
      }
    ],
    action_id: "remove_from_cart-09"
  });
  return resp.data;
};

export const trackAddToWishlist = async (product: ProductType) => {
  const { id, name, category, price } = product;
  const resp = await axios.post("https://analytics.zithara.com/analytic", {
    _sessionId: sessionId,
    uid: "123",
    pid: "123",
    domain_id: domainId,
    value: 100,
    items: [
      {
        sku: "ABC123",
        product_id: id,
        product_name: name,
        product_category: category,
        product_variant: "Green",
        product_brand: "Apple",
        price: price,
        quantity: 1
      }
    ],
    action_id: "add_to_wishlist-11"
  });
  return resp.data;
};

export const trackRemoveFromWishlist = async (product: ProductType) => {
  const { id, name, category, price } = product;
  const resp = await axios.post("https://analytics.zithara.com/analytic", {
    _sessionId: sessionId,
    uid: "123",
    pid: "123",
    domain_id: domainId,
    value: 100,
    items: [
      {
        sku: "ABC123",
        product_id: id,
        product_name: name,
        product_category: category,
        product_variant: "Green",
        product_brand: "Apple",
        price: price,
        quantity: 1
      }
    ],
    action_id: "remove_from_wishlist-12"
  });
  return resp.data;
};

export const trackCheckout = async (product: ProductType) => {
  const { id, name, category, price } = product;
  const resp = await axios.post("https://analytics.zithara.com/analytic", {
    _sessionId: sessionId,
    uid: "123",
    pid: "123",
    domain_id: domainId,
    value: 100,
    items: [
      {
        sku: "ABC123",
        product_id: id,
        product_name: name,
        product_category: category,
        product_variant: "Green",
        product_brand: "Apple",
        price: price,
        quantity: 1
      }
    ],
    offer_id: "123",
    offer_name: "Offer 123",
    coupon: "123",
    action_id: "checkout-13"
  });
  return resp.data;
};
