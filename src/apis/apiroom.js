// apiroom.js
import { API_ENDPOINTS } from '../constant/endpoints'; // Đường dẫn phải đúng

export async function getRooms() {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/Phong`, {
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
        return data.data || []; // ← Quan trọng: Trả về mảng rỗng nếu `data.data` là undefined
    } catch (error) {
        console.error('Lỗi khi lấy danh sách phòng:', error.message);
        return []; // ← Trả về mảng rỗng nếu có lỗi
    }
}