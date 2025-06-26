import axios from "axios";
import {
	GET_PAGES_ENDPOINT,
	GET_POST_ENDPOINT,
	GET_POSTS_ENDPOINT,
	DEFAULT_ENDPOINT
} from './constants/endpoints';
import {WOOCOMMERCE_API_URL, WOOCOMMERCE_CONSUMER_KEY, WOOCOMMERCE_CONSUMER_SECRET} from "./constants/config";

export async function eventOrder(req: Request) {
  try {
    const body = await req.json();

    const { full_name, email, product_id } = body;
    const [first_name, ...last_name_parts] = full_name.trim().split(' ');
    const last_name = last_name_parts.join(' ');

    const res = await fetch(`${DEFAULT_ENDPOINT}/wp-json/wc/v3/orders`, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`${WOOCOMMERCE_CONSUMER_KEY}:${WOOCOMMERCE_CONSUMER_SECRET}`).toString('base64'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        payment_method: 'vnpay', // hoặc momo, cod, etc.
        payment_method_title: 'Thanh toán qua VNPay',
        set_paid: false,
        billing: {
          first_name,
          last_name,
          email,
          address_1: 'N/A',
          city: 'Hà Nội',
          country: 'VN',
        },
        line_items: [
          {
            product_id,
            quantity: 1,
          },
        ],
      }),
    });

    const order = await res.json();

    if (!res.ok) {
      console.error('WooCommerce error:', order);
      //return NextResponse.json({ error: 'Tạo đơn hàng thất bại.' }, { status: 500 });
    }

    //return NextResponse.json({
      //order_id: order.id,
      //payment_url: order.payment_url, // Có thể dùng để redirect hoặc tiếp tục xử lý cổng thanh toán
    //});
  } catch (error) {
    console.error(error);
    //return NextResponse.json({ error: 'Lỗi server.' }, { status: 500 });
  }
}
/**
 * A method to call API with given settings
 *
 * @param {string} url
 * @param {object} data
 * @param {'GET' | 'POST' | 'PUT' | 'DELETE'} method
 * @param {object} params
 * @param {object} options
 * @return {*}
 */
export async function callApi(endpoint, method = "GET", body = null, headers = null) {
  if (!headers) {
    headers = {
      "content-type": "application/x-www-form-urlencoded",
      // "Access-Control-Allow-Origin": "*",
    };
  }

  let version = (function(){
    var ua= navigator.userAgent;
    var tem;
    var M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
      tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
      return 'IE '+(tem[1] || '');
    }
    if(M[1]=== 'Chrome'){
      tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
      if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M= M[2]? [M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
    return M.join(' ');
  })();

  let devicetype = (function(){
    var ua= navigator.userAgent;
    var tem;
    var M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
      tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
      return 'IE '+(tem[1] || '');
    }
    if(M[1]=== 'Chrome'){
      tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
      if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M= M[1]? [M[1]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
    return M.join(' ');
  })();

  let device = {
    'x-device': version,
    'x-devicetype': devicetype,
    'x-lang': 'vi',
    'x-via': 'Z'
  }
  headers = {...headers,...device}

  return axios({
    method,
    url: endpoint,
    /*data: qs.stringify(body),*/
    headers,
    timeout:   1000 * 20,
  }).then((res) => {
    return res;
  }).catch((error) => {


    if (error.response) {

      if (error.response.status === 503){
        if (error.response.data.status === 0 && error.response.data.code === 'SYS.001'){

          return '';
        }else {

          return error.response;
        }
      }else {

        return error.response;
      }
    }
  });
}


