export default function NewTicketPage () {
    return (
        <div className="p-3">
            <h1>Create a Ticket</h1>
            <form>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input className="form-control" />
                </div>
                <button className="btn btn-primary w-100">Submit</button>
            </form>
        </div>
    );
}