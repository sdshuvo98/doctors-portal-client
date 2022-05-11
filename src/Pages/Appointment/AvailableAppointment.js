import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import Service from './Service';

const AvailableAppointment = ({ date }) => {
    const [services, setServices] = useState([]);
    useEffect(() => {
        fetch('services.json')
            .then(res => res.json())
            .then(data => setServices(data))
    }, [])
    return (
        <section className='my-10'>
            <div>
                <p className='text-center text-secondary font-bold pb-10'>Available Appointments on {format(date, 'PP')}.</p>
            </div>
            <div className='px-4 md:px-10 grid grid-cols-1 lg:grid-cols-3 gap-10'>
                {
                    services.map(service => <Service key={service._id} service={service} />)
                }
            </div>
        </section>
    );
};

export default AvailableAppointment;