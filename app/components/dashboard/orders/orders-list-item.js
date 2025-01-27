"use client";

import Link from "next/link";

export default function OrdersListItem(props) {
    const getStatusColor = (status) => {
        switch (status) {
            case "PENDING":
                return "text-orange-500";
            case "PAID":
                return "text-[#0aba90]";
            case "DELIVERED":
                return "text-[#0aba90]";
            default:
                return "text-red-500";
        }
    };

    return (
        <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4 items-start">
                <div>
                    <p className="text-base font-semibold leading-tight mb-2">
                        Order Number
                    </p>
                    <p className="text-[12px]">{props.orderId}</p>
                </div>
                <div>
                    <p className="text-base font-semibold leading-tight mb-2">
                        Order Date
                    </p>
                    <p className="text-base">{props.orderDate}</p>
                </div>
                <div>
                    <p className="text-base font-semibold leading-tight mb-2">
                        Payment Status
                    </p>
                    <p
                        className={`text-base ${getStatusColor(
                            props.paymentStatus
                        )}`}
                    >
                        {props.paymentStatus}
                    </p>
                </div>
                <div>
                    <p className="text-base font-semibold leading-tight mb-2">
                        Order Status
                    </p>
                    <p
                        className={`text-base ${getStatusColor(
                            props.orderStatus
                        )}`}
                    >
                        {props.orderStatus}
                    </p>
                </div>
                <div>
                    <p className="text-base font-semibold leading-tight mb-2">
                        Order Total
                    </p>
                    <p className="text-base">${props.totalAmount}</p>
                </div>
                <div>
                    <Link href={`/dashboard/orders/${props.orderId}`}>
                        <button
                            className="py-4 px-6 rounded-full bg-transparent border-white border-2 text-[15px] shadow hover:shadow-[0_0_15px_0px_#FFFF] duration-200 ease-in-out"
                            title="ORDER DETAILS"
                        >
                            ORDER DETAILS
                        </button>
                    </Link>
                </div>
            </div>
            <hr className="border-none h-[2px] bg-white mb-8 mt-8" />
        </div>
    );
}
