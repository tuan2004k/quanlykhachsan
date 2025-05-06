export async function getRooms(page = 1, pageSize = 10) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/Phong?page=${page}&pageSize=${pageSize}`, {
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
        console.log('Raw API Response (getRooms):', data);

        // Đảm bảo phản hồi có cấu trúc đầy đủ
        const result = {
            data: Array.isArray(data.data) ? data.data : [],
            totalRecords: data.totalRecords || data.data?.length || 0,
            page: data.page || page,
            pageSize: data.pageSize || pageSize,
            totalPages: data.totalPages || Math.ceil((data.totalRecords || data.data?.length || 0) / (data.pageSize || pageSize)) || 1,
        };

        return result;
    } catch (error) {
        console.error('Lỗi khi lấy danh sách phòng:', error.message);
        throw error; // Ném lỗi để xử lý ở component
    }
}

export async function addRoom(room) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/Phong`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(room),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data.data; // Giả định API trả về phòng vừa thêm trong data.data
    } catch (error) {
        console.error('Lỗi khi thêm phòng:', error.message);
        throw error; // Ném lỗi để xử lý ở component
    }
}

export async function updateRoom(room) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/Phong/${room.maPhong}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(room),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data.data; // Giả định API trả về phòng vừa cập nhật trong data.data
    } catch (error) {
        console.error('Lỗi khi cập nhật phòng:', error.message);
        throw error; // Ném lỗi để xử lý ở component
    }
}

export async function deleteRoom(maPhong) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/Phong/${maPhong}`, {
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

        return true; // Trả về true nếu xóa thành công
    } catch (error) {
        console.error('Lỗi khi xóa phòng:', error.message);
        throw error; // Ném lỗi để xử lý ở component
    }
}