import { useEffect, useState } from 'react';

type RaceEvent = {
    id: number;
    title: string;
    start_date: string;
    end_date: string;
    status: 'open' | 'closed';
    product_url?: string;
};

export default function RaceList() {
    const [events, setEvents] = useState<RaceEvent[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://sukientuanngoc.com/api/wp-json/race/v1/events')
            .then((res) => res.json())
            .then((data) => {
                setEvents(data);
                setLoading(false);
            });
    }, []);

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Các giải chạy đang diễn ra</h1>

            {loading ? (
                <p>Đang tải dữ liệu...</p>
            ) : (
                <div className="space-y-4">
                    {events.map((event) => (
                        <div
                            key={event.id}
                            className="border p-4 rounded-xl shadow-sm bg-white"
                        >
                            <h2 className="text-lg font-semibold">{event.title}</h2>
                            <p className="text-gray-600">
                                {event.start_date} → {event.end_date}
                            </p>
                            <p className="text-sm text-gray-500">
                                Trạng thái:{' '}
                                {event.status === 'open' ? (
                                    <span className="text-green-600">Đang mở</span>
                                ) : (
                                    <span className="text-red-600">Đã kết thúc</span>
                                )}
                            </p>

                            {event.status === 'open' && event.product_url && (
                                <a
                                    href={event.product_url}
                                    className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                                >
                                    Tham gia ngay
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}