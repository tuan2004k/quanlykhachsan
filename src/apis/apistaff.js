export async function getStaff(page = 1, pageSize = 10) {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token không tồn tại');
    }

    const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/NhanVien?page=${page}&pageSize=${pageSize}`;
    console.log('Calling API:', apiUrl);
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.text(); // Dùng text để tránh lỗi JSON
      console.error('API Error:', errorData);
      throw new Error(errorData || `HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Raw API Response (getStaff):', data);

    const result = {
      data: Array.isArray(data.data) ? data.data : [],
      totalRecords: data.totalRecords || data.data?.length || 0,
      page: data.page || page,
      pageSize: data.pageSize || pageSize,
      totalPages: data.totalPages || Math.ceil((data.totalRecords || data.data?.length || 0) / (data.pageSize || pageSize)) || 1,
    };

    return result;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách nhân viên:', error.message);
    return { data: [], totalRecords: 0, page, pageSize, totalPages: 1 };
  }
}

export async function addStaff(staff) {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token không tồn tại');
    }

    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/NhanVien`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(staff),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || `HTTP error! Status: ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    if (response.status === 201 || !contentType || !contentType.includes('application/json')) {
      return staff; // Trả về staff đầu vào nếu không có body JSON
    }

    const data = await response.json();
    return data.data || staff; // Trả về data.data hoặc staff nếu không có data.data
  } catch (error) {
    console.error('Lỗi khi thêm nhân viên:', error.message);
    throw error;
  }
}

export async function updateStaff(staff) {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token không tồn tại');
    }

    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/NhanVien/${staff.maNhanVien}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(staff),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || `HTTP error! Status: ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    if (response.status === 204 || !contentType || !contentType.includes('application/json')) {
      return staff; // Trả về staff đầu vào nếu không có body JSON
    }

    const data = await response.json();
    return data.data || staff; // Trả về data.data hoặc staff nếu không có data.data
  } catch (error) {
    console.error('Lỗi khi cập nhật nhân viên:', error.message);
    throw error;
  }
}

export async function deleteStaff(maNhanVien) {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token không tồn tại');
    }

    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/NhanVien/${maNhanVien}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || `HTTP error! Status: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error('Lỗi khi xóa nhân viên:', error.message);
    throw error;
  }
}