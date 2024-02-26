import ChartComponent from "../../components/Chart";

export default function Income() {
    return (
<div className="bg-gray-100 h-auto pt-4 md:pt-10 w-full flex flex-col items-center">
    <ChartComponent className="w-full max-w-xl px-4" />

    <div className="stats shadow bg-white rounded-lg p-4 mt-4 w-full max-w-xl flex flex-col md:flex-row md:flex-wrap justify-center gap-4">
        <div className="stat place-items-center flex-1">
            <div className="stat-title">Visits</div>
            <div className="stat-value">31K</div>
            <div className="stat-desc">From January 1st to February 1st</div>
        </div>

        <div className="stat place-items-center flex-1">
            <div className="stat-title">Bookings</div>
            <div className="stat-value">4,200</div>
            <div className="stat-desc">↗︎ 40 (2%)</div>
        </div>

        <div className="stat place-items-center flex-1">
            <div className="stat-title">Revenue</div>
            <div className="stat-value">1,200</div>
            <div className="stat-desc">↘︎ 90 (14%)</div>
        </div>
    </div>

    <div className="stats shadow bg-white rounded-lg p-4 my-4 w-full max-w-xl">
        <div className="stat flex flex-col md:flex-row justify-between items-center">
            <div>
                <div className="stat-title">Account balance</div>
                <div className="stat-value">$89,400</div>
            </div>
            <div className="stat-actions mt-4 md:mt-0">
                <button className="btn btn-sm btn-success mr-2">Add funds</button>
            </div>
        </div>

        <div className="stat flex flex-col md:flex-row justify-between items-center">
            <div>
                <div className="stat-title">Current balance</div>
                <div className="stat-value">$89,400</div>
            </div>
            <div className="stat-actions mt-4 md:mt-0">
                <button className="btn btn-sm mr-2">Withdrawal</button>
                <button className="btn btn-sm">Deposit</button>
            </div>
        </div>
    </div>
</div>

    );
}
