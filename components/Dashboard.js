import React from 'react'
import Navbar from './Navbar'

function Dashboard({ posts }) {
    return (
        <>
            <Navbar />
            <table className="border-collapse border mx-auto border-gray-500 w-3/4 mt-10">
                <thead>
                    <tr className="bg-blue-200">
                        <th className="border border-gray-500 px-4 py-2" rowSpan={2} >Amount</th>
                        <th className="border w-3/4 flex-row border-gray-500 px-4 py-2" colSpan={5} style={{ textAlign: 'center' }}>
                            User Details
                        </th>
                        <th className="border border-gray-500 px-4 py-2" rowSpan={2} >Action</th>
                    </tr>
                    <tr className="bg-blue-200">
                        <th className="border border-gray-500 px-4 py-2 text-center">PFP</th>
                        <th className="border border-gray-500 px-4 py-2 text-center">Name</th>
                        <th className="border border-gray-500 px-4 py-2 text-center">Email</th>
                        <th className="border border-gray-500 px-4 py-2 text-center">UPI ID</th>
                        <th className="border border-gray-500 px-4 py-2 text-center">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {posts?.map((post) => (
                        <tr className="bg-blue-100" key={post?.id}>
                            <td className="border border-gray-500 px-4 py-2 text-center">₹ {post?.amount} </td>
                            <td className="border border-gray-500 px-4 py-2 text-center">
                                <img src={post?.pfp} alt="Profile Pic" className="rounded-full w-10 h-10 mx-auto" />
                            </td>
                            <td className="border border-gray-500 px-4 py-2 text-center">{post?.name}</td>
                            <td className="border border-gray-500 px-4 py-2 text-center">{post?.email}</td>
                            <td className="border border-gray-500 px-4 py-2 text-center">{post?.upi_id}</td>
                            <td className="border border-gray-500 px-4 py-2 text-center">{new Intl.DateTimeFormat('en-US', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                                hour12: true
                            }).format(new Date(post?.date))}</td>
                            <td className="border border-gray-500 px-4 py-2 text-center">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Pay with Google Pay
                                </button>

                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>

        </>
    )
}

export default Dashboard