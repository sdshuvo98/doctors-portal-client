import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';

const MyAppointments = () => {
    const navigate = useNavigate();
    const [user] = useAuthState(auth);
    const [appointment, setAppointment] = useState([]);


    useEffect(() => {
        if (user) {
            fetch(`https://secret-hollows-98453.herokuapp.com/appointment?patient=${user?.email}`, {
                method: "GET",
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => {
                    if (res.status === 401 || res.status === 403) {
                        signOut(auth)
                        localStorage.removeItem('accessToken')
                        navigate('/login')
                    }
                    return res.json()
                })
                .then(data => setAppointment(data))
        }
    }, [user, navigate])

    return (
        <section className='bg-slate-100 p-4 lg:p-8 h-screen'>
            <div className='flex justify-between mb-5'>
                <h1 className='text-xl font-semibold'>My Appointments</h1>
                <button className='btn btn-outline btn-sm'>Date</button>
            </div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* <!-- head --> */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Treatment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                appointment.map((a, index) => <tr key={a._id} className='hover'>
                                    <th>{index + 1}</th>
                                    <td>{a.patientName}</td>
                                    <td>{a.date}</td>
                                    <td>{a.slot}</td>
                                    <td>{a.treatment}</td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default MyAppointments;