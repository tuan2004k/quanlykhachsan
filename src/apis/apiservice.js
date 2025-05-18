export async function getServices(page = 1, pageSize = 10) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/DichVu?page=${page}&pageSize=${pageSize}`, {
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
        console.log('Raw API Response (getServices):', data);

        const result = {
            data: Array.isArray(data.data) ? data.data : [],
            totalRecords: data.totalRecords || data.data?.length || 0,
            page: data.page || page,
            pageSize: data.pageSize || pageSize,
            totalPages: data.totalPages || Math.ceil((data.totalRecords || data.data?.length || 0) / (data.pageSize || pageSize)) || 1,
        };

        return result;
    } catch (error) {
        console.error('Lỗi khi lấy danh sách dịch vụ:', error.message);
        return { data: [], totalRecords: 0, page, pageSize, totalPages: 1 };
    }
}

export async function addService(service) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/DichVu`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(service),
        });

        if (!response.ok) {
            const errorData = await response.text(); // Dùng text để tránh lỗi JSON
            throw new Error(errorData || `HTTP error! Status: ${response.status}`);
        }

        // Kiểm tra xem phản hồi có body không
        const contentType = response.headers.get('content-type');
        if (response.status === 201 || !contentType || !contentType.includes('application/json')) {
            return service; // Trả về service đầu vào nếu không có body
        }

        const data = await response.json();
        return data.data || service; // Trả về data.data hoặc service nếu không có data.data
    } catch (error) {
        console.error('Lỗi khi thêm dịch vụ:', error.message);
        throw error;
    }
}

export async function updateService(service) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/DichVu/${service.maDichVu}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(service),
        });

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(errorData || `HTTP error! Status: ${response.status}`);
        }

        const contentType = response.headers.get('content-type');
        if (response.status === 204 || !contentType || !contentType.includes('application/json')) {
            return service;
        }

        const data = await response.json();
        return data.data || service;
    } catch (error) {
        console.error('Lỗi khi cập nhật dịch vụ:', error.message);
        throw error;
    }
}

export async function deleteService(maDichVu) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/DichVu/${maDichVu}`, {
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
        console.error('Lỗi khi xóa dịch vụ:', error.message);
        throw error;
    }
}