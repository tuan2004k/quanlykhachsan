export async function fetchPromotions(page = 1, pageSize = 10) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/KhuyenMai?page=${page}&pageSize=${pageSize}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.data.map(promo => ({
      maKhuyenMai: promo.maKhuyenMai,
      tenKhuyenMai: promo.tenKhuyenMai,
      moTaKhuyenMai: promo.moTaKhuyenMai,
      ngayBatDau: promo.ngayBatDau,
      ngayKetThuc: promo.ngayKetThuc,
      giaTriKhuyenMai: promo.giaTriKhuyenMai,
      ghiChu: promo.ghiChu,
      kieuKhuyenMai: promo.tenKieuKhuyenMai,
    })) || [];
  } catch (error) {
    console.error('Lỗi khi lấy danh sách khuyến mãi:', error.message);
    return [];
  }
}

export async function getPromotionById(id) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/KhuyenMai/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
    }

    const promo = await response.json();
    return {
      maKhuyenMai: promo.maKhuyenMai,
      tenKhuyenMai: promo.tenKhuyenMai,
      moTaKhuyenMai: promo.moTaKhuyenMai,
      ngayBatDau: promo.ngayBatDau,
      ngayKetThuc: promo.ngayKetThuc,
      giaTriKhuyenMai: promo.giaTriKhuyenMai,
      ghiChu: promo.ghiChu,
      kieuKhuyenMai: promo.tenKieuKhuyenMai || promo.kieuKhuyenMai,
    };
  } catch (error) {
    console.error(`Lỗi khi lấy khuyến mãi với ID ${id}:`, error.message);
    return null;
  }
}

export async function fetchPromotionTypes() {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/KhuyenMai`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.data.map(type => ({
      id: type.id,
      tenKieuKhuyenMai: type.tenKieuKhuyenMai,
    })) || [];
  } catch (error) {
    console.error('Lỗi khi lấy danh sách kiểu khuyến mãi:', error.message);
    return [];
  }
}

export async function createPromotion(promotion) {
  try {
    if (!promotion.tenKhuyenMai || !promotion.moTaKhuyenMai || !promotion.ngayBatDau || !promotion.ngayKetThuc || !promotion.giaTriKhuyenMai || !promotion.kieuKhuyenMai) {
      throw new Error('Thiếu các trường bắt buộc!');
    }

    const kieuKhuyenMaiByte = parseInt(promotion.kieuKhuyenMai);
    if (isNaN(kieuKhuyenMaiByte) || kieuKhuyenMaiByte < 0 || kieuKhuyenMaiByte > 255) {
      throw new Error('kieuKhuyenMai phải là số từ 0 đến 255!');
    }

    const payload = {
      model: "KhuyenMai",
      tenKhuyenMai: promotion.tenKhuyenMai,
      moTaKhuyenMai: promotion.moTaKhuyenMai,
      ngayBatDau: promotion.ngayBatDau,
      ngayKetThuc: promotion.ngayKetThuc,
      giaTriKhuyenMai: parseFloat(promotion.giaTriKhuyenMai),
      kieuKhuyenMai: kieuKhuyenMaiByte,
      ghiChu: promotion.ghiChu || '',
    };

    console.log('Dữ liệu gửi lên API:', payload);

    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/KhuyenMai`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json(); // Thử parse JSON
        console.error('Chi tiết lỗi từ API:', JSON.stringify(errorData, null, 2));
      } catch (jsonError) {
        // Nếu parse JSON thất bại, ghi log nội dung thô của phản hồi
        const errorText = await response.text();
        console.error('Không thể parse JSON từ phản hồi. Nội dung phản hồi:', errorText);
        throw new Error(`HTTP error! Status: ${response.status}, Response: ${errorText || 'Không có nội dung phản hồi'}`);
      }
      throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
    }

    const promo = await response.json();
    return {
      maKhuyenMai: promo.maKhuyenMai,
      tenKhuyenMai: promo.tenKhuyenMai,
      moTaKhuyenMai: promo.moTaKhuyenMai,
      ngayBatDau: promo.ngayBatDau,
      ngayKetThuc: promo.ngayKetThuc,
      giaTriKhuyenMai: promo.giaTriKhuyenMai,
      ghiChu: promo.ghiChu,
      kieuKhuyenMai: promo.tenKieuKhuyenMai || promo.kieuKhuyenMai,
    };
  } catch (error) {
    console.error('Lỗi khi tạo khuyến mãi:', error.message);
    return null;
  }
}

export async function updatePromotion(id, promotion) {
  try {
    const payload = {
      tenKhuyenMai: promotion.tenKhuyenMai,
      moTaKhuyenMai: promotion.moTaKhuyenMai,
      ngayBatDau: promotion.ngayBatDau,
      ngayKetThuc: promotion.ngayKetThuc,
      giaTriKhuyenMai: parseFloat(promotion.giaTriKhuyenMai),
      kieuKhuyenMai: parseInt(promotion.kieuKhuyenMai),
      ghiChu: promotion.ghiChu,
    };

    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/KhuyenMai/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
    }

    const promo = await response.json();
    return {
      maKhuyenMai: promo.maKhuyenMai,
      tenKhuyenMai: promo.tenKhuyenMai,
      moTaKhuyenMai: promo.moTaKhuyenMai,
      ngayBatDau: promo.ngayBatDau,
      ngayKetThuc: promo.ngayKetThuc,
      giaTriKhuyenMai: promo.giaTriKhuyenMai,
      ghiChu: promo.ghiChu,
      kieuKhuyenMai: promo.tenKieuKhuyenMai || promo.kieuKhuyenMai,
    };
  } catch (error) {
    console.error(`Lỗi khi cập nhật khuyến mãi với ID ${id}:`, error.message);
    return null;
  }
}

export async function deletePromotion(id) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/KhuyenMai/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error(`Lỗi khi xóa khuyến mãi với ID ${id}:`, error.message);
    return false;
  }
}