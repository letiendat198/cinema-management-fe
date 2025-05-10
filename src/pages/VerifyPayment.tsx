import { IconCheck, IconRotateClockwise2, IconX } from "@tabler/icons-react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { getOrderById } from "../api/OrderAPI";
import { useEffect, useRef, useState } from "react";

// http://localhost:5173/verify-payment?vnp_Amount=14000000&vnp_BankCode=NCB&vnp_BankTranNo=VNP14948074&vnp_CardType=ATM&vnp_OrderInfo=Thanh%2Btoan%2Bhoa%2Bdon%2B6811c8ba1139e3179e7de475&vnp_PayDate=20250509204454&vnp_ResponseCode=00&vnp_TmnCode=BJU30Q9Z&vnp_TransactionNo=14948074&vnp_TransactionStatus=00&vnp_TxnRef=6811c8ba1139e3179e7de475-20250509204342&vnp_SecureHash=f3a34db15b671a9410130f85dce1d5f25c529a84811ad64a0ed145c0c726cd6a4644f952111a0edf09a16777247decda47a6f94caa859924896ed9c47a11c3d1

enum PaymentStatus {
    Ok,
    Pending,
    Failed
}

function VerifyPayment() {
    const [params, setParams] = useSearchParams();
    const [status, setStatus] = useState<PaymentStatus>(PaymentStatus.Pending);
    const retry = useRef(0);
    
    const navigate = useNavigate();

    useEffect(() => {
        if (params.get('vnp_TransactionStatus') == '00') setStatus(PaymentStatus.Ok);
        else if (params.get('vnp_TransactionStatus') == '01') setStatus(PaymentStatus.Pending);
        else setStatus(PaymentStatus.Failed);

        // const checkOrder = setInterval(() => {
        //     retry.current += 1;
        //     let orderId = params.get('vnp_TxnRef')?.split('-')[0];
        //     getOrderById(orderId).then(data => {
        //         if (data.status == 'completed') setStatus(PaymentStatus.Ok);
        //     })

        //     if (retry.current == 5) clearInterval(checkOrder);
        // }, 5000);

        // return () => {
        //     clearInterval(checkOrder);
        // }
    }, [])

    if (status == PaymentStatus.Pending) {
        return (
            <div className="flex flex-col justify-center items-center">
                <div className="flex justify-center items-center border-4 border-yellow-400 rounded-full p-2 bg-yellow-50">
                    <IconRotateClockwise2 size={70} className="text-yellow-400" />    
                </div>
                <p className="text-2xl font-semibold">Verifying your transaction...</p>
                <p>Please wait a few moments</p>
            </div>
        )    
    }
    else if (status == PaymentStatus.Ok) {
        setTimeout(() => {
            navigate('/my-ticket');
        }, 5000);

        return (
            <div className="flex flex-col justify-center items-center">
                <div className="flex justify-center items-center border-4 border-green-400 rounded-full p-2 bg-green-50">
                    <IconCheck size={70} className="text-green-400" />    
                </div>
                <p className="text-2xl font-semibold">Transaction completed</p>
                <p>You will soon be redirected... Or click {<Link className="text-primary" to='/my-ticket'>here</Link>}</p>
            </div>
        )  
    }
    else {
        let respCode = params.get('vnp_ResponseCode');
        return (
            <div className="flex flex-col justify-center items-center">
                <div className="flex justify-center items-center border-4 border-red-400 rounded-full p-2 bg-red-50">
                    <IconX size={70} className="text-red-400" />    
                </div>
                <p className="text-2xl font-semibold">Transaction failed</p>
                <p>Reason: {respCode ? StatusCodeLookup[respCode] : 'Unknown'}</p>
                <p>Error code: {params.get('vnp_ResponseCode')}</p>
                <p>Go to {<Link className="text-primary" to='/my-ticket'>My ticket</Link>} to retry</p>
            </div>
        )  
    }
}

interface Lookup {
    [index: string]: string
}

let StatusCodeLookup: Lookup = {
    '00': 'Giao dịch thành công',
    '07': 'Trừ tiền thành công. Giao dịch bị nghi ngờ (liên quan tới lừa đảo, giao dịch bất thường).',
    '09': 'Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng chưa đăng ký dịch vụ InternetBanking tại ngân hàng.',
    '10': '	Giao dịch không thành công do: Khách hàng xác thực thông tin thẻ/tài khoản không đúng quá 3 lần',
    '11': 'Giao dịch không thành công do: Đã hết hạn chờ thanh toán. Xin quý khách vui lòng thực hiện lại giao dịch.',
    '12': 'Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng bị khóa.',
    '13': '	Giao dịch không thành công do Quý khách nhập sai mật khẩu xác thực giao dịch (OTP). Xin quý khách vui lòng thực hiện lại giao dịch.',
    '24': 'Giao dịch không thành công do: Khách hàng hủy giao dịch',
    '51': '	Giao dịch không thành công do: Tài khoản của quý khách không đủ số dư để thực hiện giao dịch',
    '65': 'Giao dịch không thành công do: Tài khoản của Quý khách đã vượt quá hạn mức giao dịch trong ngày.',
    '75': 'Ngân hàng thanh toán đang bảo trì.',
    '79': '	Giao dịch không thành công do: KH nhập sai mật khẩu thanh toán quá số lần quy định. Xin quý khách vui lòng thực hiện lại giao dịch',
    '99': 'Unknown'
}

export default VerifyPayment;