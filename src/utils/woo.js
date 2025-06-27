import axios from 'axios';
import {
    GET_PAGES_ENDPOINT,
    GET_POST_ENDPOINT,
    GET_POSTS_ENDPOINT,
    DEFAULT_ENDPOINT
} from './constants/endpoints';
import {WOOCOMMERCE_CONSUMER_KEY, WOOCOMMERCE_CONSUMER_SECRET} from "./constants/config";

export const createOrderWoo = async (productId, email, id, name) => {    
    const orderData = {
        payment_method: 'cod', // hoặc "bacs", "paypal", v.v.
        payment_method_title: 'Thanh toán khi giao hàng',
        set_paid: true, // true nếu bạn không cần xử lý cổng thanh toán
        billing: {
            first_name: name !== '' ? name : 'Guest',
            last_name: id,
            address_1: 'Thanh Trì',
            city: 'Hà Nội',
            country: 'VN',
            email: email,
            phone: '0123456789',
        },
        line_items: [
            {
                product_id: productId,
                quantity: 1,
            },
        ]
    };
    const apiUrl = `${DEFAULT_ENDPOINT}/wc/v3/orders`;
    try {
        const response = await axios.post(apiUrl, orderData, {
            auth: {
                username: WOOCOMMERCE_CONSUMER_KEY,
                password: WOOCOMMERCE_CONSUMER_SECRET
            },
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return {status: 1, data: response.data, message: "Bạn đã tham gia giải thành công!"};
        //return res.status(200).json(response.data);
    } catch (error) {
        const err = error.response?.data || error.message;
        return {status: 0, data: err, message: "Không thể tham gia giải. Vui lòng thử lại."};
    }
};
