import {HEADER_FOOTER_ENDPOINT} from "./constants/endpoints";
import {apiAxiosAll} from "./api";
/**
 * Get Pages.
 *
 * @return {Promise<void>}
 */
export const getHeaderFooterData = async () => {
    try {
        const res = await apiAxiosAll(HEADER_FOOTER_ENDPOINT);
        //console.log('res---',res);
        if(res?.status === 200){
            return res.data
        } else {
            return [];
        }
        return [];
    } catch (e) {
        //console.log('errr',e);
    }

}
