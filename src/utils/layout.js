import {HEADER_FOOTER_ENDPOINT} from "./constants/endpoints";
import {apiAxios} from "./api";
/**
 * Get Pages.
 *
 * @return {Promise<void>}
 */
export const getHeaderFooterData = async () => {
    try {
        const res = await apiAxios(HEADER_FOOTER_ENDPOINT);
        //console.log('res---',res.status);
        if(res?.status === 200){
            return res.data
        } else {
            return [];
        }
    } catch (e) {
        console.log(e);
    }

}
