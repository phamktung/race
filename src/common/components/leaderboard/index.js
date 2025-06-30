import {apiAxiosAll} from "../../../utils/api";
import {DEFAULT_ENDPOINT} from "../../../utils/constants/endpoints";
import {useEffect, useState} from "react";

const Leaderboard = ({ eventId }) => {
    const [loading, setLoading] = useState(false);
    const [leaders, setLeaders] = useState([]);
    const [gender, setGender] = useState('all');
    const getLeaderboard = async ()=>{
        setLoading(true);

        try {
            const res = await apiAxiosAll(`${DEFAULT_ENDPOINT}/camis/v1/leaderboard`, {}, 'GET', {event_id:eventId, limit: 100, gender: gender});
            console.log('Leaderboard',res)
            if(res?.status === 200) {
                setLeaders(res.data);
            }
            /*const apiUrl = `${DEFAULT_ENDPOINT}/camis/v1/leaderboard?event_id=${postData.id}`;

            const response = await axios.get(apiUrl, {
                auth: {
                    username: WOOCOMMERCE_CONSUMER_KEY,
                    password: WOOCOMMERCE_CONSUMER_SECRET
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('getProduct',response.data);
            setProd(response.data);*/

            setLoading(false);
        } catch (e) {
            //console.log('errr',e);
            setLoading(false);
        }
    };

    useEffect(()=>{
        if(eventId){
            getLeaderboard().then()
        }
    }, [eventId, gender]);

    return (
        <>

            <h2 className="text-xl font-bold mb-4">🏁 Bảng xếp hạng</h2>
            <div className="mb-4">
                <label className="mr-4 font-medium">Lọc theo giới tính:</label>
                <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="gender-filter px-2 py-1 rounded"
                >
                    <option value="all">Tất cả</option>
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                    <option value="other">Khác</option>
                </select>
            </div>
            <div className="overflow-x-auto leaderboard-table">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="text-left p-2">#</th>
                        <th className="text-left p-2">Người chạy</th>
                        <th className="text-center p-2">Tổng km</th>
                        <th className="text-center p-2">Thời gian</th>
                        <th className="text-center p-2">Số hoạt động</th>
                    </tr>
                    </thead>
                    <tbody>
                    {leaders?.map((user) => (
                        <tr key={user.user_id} className="border-t">
                            <td className="p-2 font-semibold">{user.rank}</td>
                            <td className="p-2 flex items-center gap-2 leaderboard-table-name">
                                <img src={user.avatar} className="w-8 h-8 rounded-full" />
                                {user.name}
                            </td>
                            <td className="p-2 text-center">{user.total_distance.toFixed(2)} km</td>
                            <td className="p-2 text-center">{Math.floor(user.total_duration / 60)} phút</td>
                            <td className="p-2 text-center">{user.activity_count}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
export default Leaderboard