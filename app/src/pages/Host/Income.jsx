export default function Income() {
    return (
        <div className="bg-gray-100 h-screen w-full md:w-auto flex flex-col">
            <div className="stats shadow p-4">
            
            <div className="stat place-items-center">
                <div className="stat-title">Visits</div>
                <div className="stat-value">31K</div>
                <div className="stat-desc">From January 1st to February 1st</div>
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

            <div className="stats p-4">

            <div className="stat">
                <div className="stat-title">Account balance</div>
                <div className="stat-value">$89,400</div>
                <div className="stat-actions">
                <button className="btn btn-sm btn-success">Add funds</button>
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
    )
}