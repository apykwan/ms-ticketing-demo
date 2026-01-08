'use client';

import { useState } from 'react';

import useRequest from '@/hooks/use-request';

export default function NewTicketPage () {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');

    const{ doRequest, errors } = useRequest({
        url: '/api/tickets',
        method: 'post',
        body: { title, price },
        onSuccess: (ticket) => console.log(ticket)
    });

    function onBlur() {
        const value = parseFloat(price);
        if (isNaN(value)) return;

        setPrice(value.toFixed(2));
    }

    function onSubmit(event) {
        event.preventDefault();

        doRequest();
    }
    return (
        <div>
            <h1>Create a Ticket</h1>
            <form className="p-3" onSubmit={onSubmit}>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input 
                        value={title}
                        onChange={e => setTitle(e.target.value)} 
                        className="form-control" 
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input 
                        value={price}
                        onBlur={onBlur}
                        onChange={e => setPrice(e.target.value)} 
                        className="form-control" 
                    />
                </div>
                {errors}
                <button className="btn btn-primary w-100">Submit</button>
            </form>
        </div>
    );
}