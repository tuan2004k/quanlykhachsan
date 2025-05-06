export async function getStaff() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token không tồn tại');
      }
  
      const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/NhanVien`;
      console.log('Calling API:', apiUrl);
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('API Data:', data);
      return data;
    } catch (error) {
      console.error('Lỗi khi lấy danh sách nhân viên:', error.message);
      return { data: [] };
    }
  }
  
  export async function addStaff(staff) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/NhanVien`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(staff),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Lỗi khi thêm nhân viên:', error.message);
      throw error;
    }
  }
  
  export async function updateStaff(staff) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/NhanVien/${staff.maNhanVien}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(staff),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Lỗi khi cập nhật nhân viên:', error.message);
      throw error;
    }
  }
  
  export async function deleteStaff(maNhanVien) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/NhanVien/${maNhanVien}`, {
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
      console.error('Lỗi khi xóa nhân viên:', error.message);
      throw error;
    }
  }