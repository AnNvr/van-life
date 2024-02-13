import ChartComponent from "../../components/Chart";

export default function Income() {
    return (
        <div className="bg-gray-100 h-auto items-center pt-4 md:pt-10 w-full flex flex-col">
            <ChartComponent className="w-full max-w-xl px-4" />

            <div className="stats shadow bg-white rounded-lg p-4 mt-4 w-full max-w-xl">
                <div className="stat place-items-center">
                    <div className="stat-title">Visits</div>
                    <div className="stat-value">31K</div>
                    <div className="stat-desc">
                        From January 1st to February 1st
                    </div>
                </div>

                <div className="stat place-items-center">
                    <div className="stat-title">Bookings</div>
                    <div className="stat-value">4,200</div>
                    <div className="stat-desc">↗︎ 40 (2%)</div>
                </div>

                <div className="stat place-items-center">
                    <div className="stat-title">Revenue</div>
                    <div className="stat-value">1,200</div>
                    <div className="stat-desc">↘︎ 90 (14%)</div>
                </div>
            </div>

            <div className="stats shadow bg-white rounded-lg p-4 my-4 w-full max-w-xl">
                <div className="stat">
                    <div className="stat-title">Account balance</div>
                    <div className="stat-value">$89,400</div>
                    <div className="stat-actions">
                        <button className="btn btn-sm btn-success">
                            Add funds
                        </button>
                    </div>
                </div>

                <div className="stat">
                    <div className="stat-title">Current balance</div>
                    <div className="stat-value">$89,400</div>
                    <div className="stat-actions">
                        <button className="btn btn-sm">Withdrawal</button>
                        <button className="btn btn-sm">deposit</button>
                    </div>
                </div>
            </div>

        </div>

        
    );
}
