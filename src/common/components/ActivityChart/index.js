import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {DEFAULT_ENDPOINT} from "../../../utils/constants/endpoints";

const ActivityChart = ({ userId }) => {
    const [range, setRange] = useState('daily');
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(
                `${DEFAULT_ENDPOINT}/camis/v1/activity-chart?user_id=${userId}&range=${range}`
            );
            console.log(res);
            const json = await res.json();
            setData(json);
        };

        fetchData();
    }, [userId, range]);

    const chartOptions = {
        title: {
            text: `Biểu đồ hoạt động (${range === 'monthly' ? 'tháng' : 'ngày'})`,
        },
        xAxis: {
            categories: data.map(d => d.label),
            title: {
                text: range === 'monthly' ? 'Tháng' : 'Ngày',
            },
        },
        yAxis: {
            title: {
                text: 'Quãng đường (km)',
            },
        },
        tooltip: {
            shared: true,
            valueSuffix: ' km',
        },
        credits: {
            enabled: false, // ✅ Tắt logo Highcharts
        },
        series: [
            {
                name: 'Quãng đường',
                data: data.map(d => d.distance),
                type: 'column',
                color: '#60a5fa',
            },
        ],
    };

    return (
        <div className="my-6">
            <div className="flex justify-between mb-4 mt-5">
                <h3 className="text-lg font-semibold">📊 Biểu đồ hoạt động</h3>
                <select
                    value={range}
                    onChange={e => setRange(e.target.value)}
                    className="border rounded px-2 py-1"
                    style={{width: "135px",fontSize: "16px"}}
                >
                    <option value="daily">Theo ngày</option>
                    <option value="monthly">Theo tháng</option>
                </select>
            </div>
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </div>
    );
};

export default ActivityChart;