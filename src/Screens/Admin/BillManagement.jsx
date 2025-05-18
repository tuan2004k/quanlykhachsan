import React, { useState, useEffect } from 'react';
import Sidebar from '../../Components/componentsAdmin/SideBar';
import Header from '../../Common/Header';

const BillCard = ({ bill }) => {
  const customer = bill.datPhong?.khachHang;
  const bookingDate = new Date(bill.datPhong?.ngayDatPhong).toLocaleDateString();
  const invoiceDate = new Date(bill.ngayXuatHoaDon).toLocaleDateString();
  const status = bill.tinhTrangThanhToan?.tenTinhTrang;
  const statusColor = status === 'Đã thanh toán' ? 'text-green-600' : 'text-red-500';

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 my-4 w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-semibold text-base truncate">
          {customer?.ho} {customer?.ten}
        </h2>
      </div>

      {/* Content */}
      <div className="flex flex-col md:flex-row md:space-x-4 text-sm text-gray-700">
            {/* Cột 1 - 30% */}
            <div className="md:basis-[30%] space-y-1">
              <p><strong>Ngày đặt:</strong> {bookingDate}</p>
              <p><strong>Ngày xuất:</strong> {invoiceDate}</p>
              <p><strong>Email:</strong> {customer?.email}</p>
              <p><strong>SDT:</strong> {customer?.sdt}</p>
            </div>

            {/* Cột 2 - 10% */}
            <div className="md:basis-[15%] space-y-1">
              <p><strong>Mã đặt phòng:</strong> {bill.datPhong?.maDatPhong}</p>
              <p><strong>Số phòng đặt:</strong> {bill.datPhong?.soPhongDat}</p>
            </div>

            {/* Cột 3 - 20% */}
            <div className="md:basis-[20%] space-y-1">
              <p><strong>Tiền phòng:</strong> {bill.tongTienPhong.toLocaleString()} VND</p>
              <p><strong>Tiền dịch vụ:</strong> {bill.tongTienDichVu.toLocaleString()} VND</p>
              <p><strong>Tổng tiền:</strong> {bill.tongTien.toLocaleString()} VND</p>
            </div>

            {/* Cột 4 - 20% */}
            <div className="md:basis-[20%]">
              <p><strong>Ghi chú:</strong> {bill.datPhong?.ghiChu}</p>
            </div>

            {/* Cột 5 - 20% */}
            <div className="md:basis-[15%]">
              <p><strong>Trạng thái:</strong></p>
              <p className={`${statusColor} font-semibold`}>{status}</p>
            </div>
        </div>
    </div>
  );
};

const BillManagement = () => {
  const [bills, setBills] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const res = await fetch(`http://103.167.89.178:5000/api/HoaDon?page=${currentPage}&pageSize=${pageSize}`);
        const data = await res.json();
        setBills(data.data || []);
        setTotalPages(2); // tạm thời fix cứng 2 trang
      } catch (err) {
        console.error('Lỗi khi fetch hóa đơn:', err);
      }
};
    fetchBills();
  }, [currentPage]);

  return (
    <div className="flex h-screen">
      <Sidebar/>
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-green-700 mb-10">
        Danh sách hóa đơn
      </h1>
      <div className="max-w-5xl mx-auto w-full">
        {bills.map((bill, index) => (
          <BillCard key={index} bill={bill} />
        ))}

        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-lg border text-sm font-medium ${
                currentPage === i + 1
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-800 hover:bg-gray-100'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  </div>
  );
};

export default BillManagement;