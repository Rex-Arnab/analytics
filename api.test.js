const axios = require('axios');
const { generateRandomString, delay } = require("./lib/utils.js")
// const testUrl = "https://analytics.zithara.com"
const testUrl = "http://localhost:4441"
const sessionId = generateRandomString(5)

describe("Ping", () => {
    it("Checking If Server is Alive", async () => {
        const response = await axios.get(`${testUrl}`);
        expect(response.status).toBe(200);
    });
});

describe("User Analytics", () => {
    it("Record User Analytics", async () => {
        const response = await axios.post(`${testUrl}/analytic`, {
            _sessionId: sessionId,
            uid: "123",
            pid: "123",
            domain_id: "321",
            user: {
                user_id: "123",
                username: "John Doe",
                mobile: "1234567890",
                email: "khanp4397@gmail.com",
                gender: "Male",
                fcm_token: "123456789"
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
                source: 'facebook.com'
            },
            action: "start",
            secrets: "123",
            action_id: "start-0"
        });
        expect(response.status).toBe(200);
    })
});
describe("Tracking", () => {
    it("Track Screen Home", async () => {
        const response = await axios.post(`${testUrl}/analytic`, {
            _sessionId: sessionId,
            uid: "123",
            pid: "123",
            domain_id: "321",
            action: "Home Page",
            action_id: "screen-01"
        });
        expect(response.status).toBe(200);
    });
    it("Track Action", async () => {
        const response = await axios.post(`${testUrl}/analytic`, {
            _sessionId: sessionId,
            uid: "123",
            pid: "123",
            domain_id: "321",
            action: "Click",
            action_id: "action-02"
        });
        expect(response.status).toBe(200);
    });
    it("Track Event", async () => {
        const response = await axios.post(`${testUrl}/analytic`, {
            _sessionId: sessionId,
            uid: "123",
            pid: "123",
            domain_id: "321",
            name: "Click",
            category: "Button",
            action: "Click",
            value: "1",
            action_id: "event-03"
        });
        expect(response.status).toBe(200);
    });
    it("Track Search", async () => {
        const response = await axios.post(`${testUrl}/analytic`, {
            _sessionId: sessionId,
            uid: "123",
            pid: "123",
            domain_id: "321",
            keyword: "Apple",
            category: "Fruit",
            action_id: "search-04"
        });
        expect(response.status).toBe(200);
    });
    it("Track Link", async () => {
        const response = await axios.post(`${testUrl}/analytic`, {
            _sessionId: sessionId,
            uid: "123",
            pid: "123",
            domain_id: "321",
            link: "https://www.google.com",
            action_id: "link-05"
        });
        expect(response.status).toBe(200);
    });
    it("Track Download", async () => {
        const response = await axios.post(`${testUrl}/analytic`, {
            _sessionId: sessionId,
            uid: "123",
            pid: "123",
            domain_id: "321",
            download: "Ebook",
            url: "https://www.google.com",
            action_id: "download-06"
        });
        expect(response.status).toBe(200);
    });
});

describe("Ecommerce", () => {
    it("View Content", async () => {
        const response = await axios.post(`${testUrl}/analytic`, {
            _sessionId: sessionId,
            uid: "123",
            pid: "123",
            domain_id: "321",
            sku: "ABC123",
            product_id: Math.round(Math.random() * 100),
            product_name: "Product XYZ",
            product_category: "Electronics",
            product_variant: "Variant A",
            product_brand: "Brand ABC",
            price: 49.99,
            quantity: 2,
            action_id: "view_content-07"
        });
        expect(response.status).toBe(200);
    });
    it("Add to Cart", async () => {
        const response = await axios.post(`${testUrl}/analytic`, {
            _sessionId: sessionId,
            uid: "123",
            pid: "123",
            domain_id: "321",
            value: 100,
            items: [
                {
                    sku: "123",
                    product_name: "Apple",
                    product_category: "Fruit",
                    product_variant: "Green",
                    product_brand: "Apple",
                    price: 100,
                    quantity: 1
                }
            ],
            action_id: "add_to_cart-08"
        });
        expect(response.status).toBe(200);
    });
    it("Remove from Cart", async () => {
        const response = await axios.post(`${testUrl}/analytic`, {
            _sessionId: sessionId,
            uid: "123",
            pid: "123",
            domain_id: "321",
            value: 100,
            items: [
                {
                    sku: "123",
                    product_name: "Apple",
                    product_category: "Fruit",
                    product_variant: "Green",
                    product_brand: "Apple",
                    price: 100,
                    quantity: 1
                }
            ],
            action_id: "remove_from_cart-09"
        });
        expect(response.status).toBe(200);
    });
    it("Cart View", async () => {
        const response = await axios.post(`${testUrl}/analytic`, {
            _sessionId: sessionId,
            uid: "124",
            pid: "123",
            domain_id: "321",
            action_id: "cart_view-10"
        });
        expect(response.status).toBe(200);
    });
    it("Add to Wishlist", async () => {
        const response = await axios.post(`${testUrl}/analytic`, {
            _sessionId: sessionId,
            uid: "123",
            pid: "123",
            domain_id: "321",
            value: 100,
            items: [
                {
                    sku: "123",
                    product_name: "Apple",
                    product_category: "Fruit",
                    product_variant: "Green",
                    product_brand: "Apple",
                    price: 100,
                    quantity: 1
                }
            ],
            action_id: "add_to_wishlist-11"
        });
        expect(response.status).toBe(200);
    });
    it("Remove from Wishlist", async () => {
        const response = await axios.post(`${testUrl}/analytic`, {
            _sessionId: sessionId,
            uid: "123",
            pid: "123",
            domain_id: "321",
            value: 100,
            items: [
                {
                    sku: "123",
                    product_name: "Apple",
                    product_category: "Fruit",
                    product_variant: "Green",
                    product_brand: "Apple",
                    price: 100,
                    quantity: 1
                }
            ],
            action_id: "remove_from_wishlist-12"
        });
        expect(response.status).toBe(200);
    });
    it("Checkout", async () => {
        const response = await axios.post(`${testUrl}/analytic`, {
            _sessionId: sessionId,
            uid: "123",
            pid: "123",
            domain_id: "321",
            value: 100,
            offer_id: "123",
            offer_name: "Offer 123",
            coupon: "123",
            items: [
                {
                    sku: "123",
                    product_name: "Apple",
                    product_category: "Fruit",
                    product_variant: "Green",
                    product_brand: "Apple",
                    price: 100,
                    quantity: 1
                }
            ],
            action_id: "checkout-13"
        });
        expect(response.status).toBe(200);
    });
    it("Payment Information", async () => {
        const response = await axios.post(`${testUrl}/analytic`, {
            _sessionId: sessionId,
            uid: "123",
            pid: "123",
            domain_id: "321",
            value: 100,
            items: [
                {
                    sku: "123",
                    product_name: "Apple",
                    product_category: "Fruit",
                    product_variant: "Green",
                    product_brand: "Apple",
                    price: 100,
                    quantity: 1
                }
            ],
            offer_id: "123",
            offer_name: "Offer 123",
            coupon: "123",
            payment_type: 'cod',
            action_id: "payment_info-14"
        });
        expect(response.status).toBe(200);
    });
    it("Order Confirmation", async () => {
        const response = await axios.post(`${testUrl}/analytic`, {
            _sessionId: sessionId,
            uid: "123",
            pid: "123",
            domain_id: "321",
            action_id: "order_confirmed-15",
            order_id: "123",
            payment_type: "cod"
        });
        expect(response.status).toBe(200);
    });
});

describe("Advertisement", () => {
    it("Ad View", async () => {
        const response = await axios.post(`${testUrl}/analytic`, {
            _sessionId: sessionId,
            uid: "123",
            pid: "123",
            domain_id: "321",
            ad_id: "123",
            ad_name: "Ad 123",
            action_id: "ad_view-16"
        });
        expect(response.status).toBe(200);
    });
    it("Ad Close", async () => {
        const response = await axios.post(`${testUrl}/analytic`, {
            _sessionId: sessionId,
            uid: "123",
            pid: "123",
            domain_id: "321",
            ad_id: "123",
            ad_name: "Ad 123",
            action_id: "ad_close-17"
        });
        expect(response.status).toBe(200);
    });
    it("Ad Interaction", async () => {
        const response = await axios.post(`${testUrl}/analytic`, {
            _sessionId: sessionId,
            uid: "123",
            pid: "123",
            domain_id: "321",
            ad_id: "123",
            ad_name: "Ad 123",
            action_id: "ad_interaction-18"
        });
        expect(response.status).toBe(200);
    });
});

describe("Product", () => {
    it("View Top 5 Products", async () => {
        const response = await axios.get(`${testUrl}/product/top/pages?limit=5&sort=desc`);
        expect(response.status).toBe(200);
    });
});
