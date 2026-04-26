# 📚 Military System - REST API Documentation

Dokumentasi lengkap untuk berkomunikasi dengan Military Management System Backend API.

---

## 🚀 Konfigurasi Dasar

### Base URL
```
http://localhost:3000/api
```

### Autentikasi
API menggunakan **JWT (JSON Web Token)** dengan Bearer token. Setiap request (kecuali login/register) harus menyertakan header:
```
Authorization: Bearer <your_token>
```

Token berlaku selama **8 jam**.

### Content Type
Semua request harus menggunakan:
```
Content-Type: application/json
```

---

## 🔐 Authentication Endpoints

### 1. **Register User**
Mendaftar pengguna baru.

**Endpoint:** `POST /auth/register`

**Request Body:**
```json
{
  "name": "Nama Lengkap",
  "email": "user@example.com",
  "password": "password123",
  "unitId": 1
}
```

**Response (201):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "Nama Lengkap",
    "email": "user@example.com",
    "role": "user",
    "unitId": 1
  }
}
```

**Status Codes:**
- `201` - Register berhasil
- `400` - Field yang diperlukan tidak lengkap
- `409` - Email sudah terdaftar

---

### 2. **Login**
Login dan mendapatkan token.

**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "Nama Lengkap",
    "email": "user@example.com",
    "role": "user",
    "unitId": 1
  }
}
```

**Status Codes:**
- `200` - Login berhasil
- `400` - Email atau password tidak dikirim
- `401` - Email atau password salah

---

### 3. **Get Current User Profile**
Mendapatkan profil pengguna yang sedang login.

**Endpoint:** `GET /auth/me`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "id": 1,
  "name": "Nama Lengkap",
  "email": "user@example.com",
  "role": "user",
  "unitId": 1
}
```

---

## 👥 Users Management

⚠️ **Catatan:** Semua endpoint user memerlukan autentikasi dan **hanya bisa diakses oleh admin**.

### 1. **Get All Users**
**Endpoint:** `GET /users`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
[
  {
    "id": 1,
    "name": "Admin User",
    "email": "admin@example.com",
    "role": "admin",
    "unitId": 1
  },
  {
    "id": 2,
    "name": "Regular User",
    "email": "user@example.com",
    "role": "user",
    "unitId": 1
  }
]
```

---

### 2. **Create User**
**Endpoint:** `POST /users`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "User Baru",
  "email": "newuser@example.com",
  "password": "password123",
  "unitId": 1,
  "role": "user"
}
```

**Response (201):**
```json
{
  "id": 3,
  "name": "User Baru",
  "email": "newuser@example.com",
  "role": "user",
  "unitId": 1
}
```

---

### 3. **Update User**
**Endpoint:** `PUT /users/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body (Optional fields):**
```json
{
  "name": "Nama Baru",
  "email": "newemail@example.com",
  "password": "newpassword123",
  "role": "admin",
  "unitId": 2
}
```

**Response (200):**
```json
{
  "message": "User berhasil diupdate"
}
```

---

### 4. **Delete User**
**Endpoint:** `DELETE /users/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "message": "User berhasil dihapus"
}
```

---

## 🏢 Units Management

⚠️ **Catatan:** Semua endpoint unit memerlukan autentikasi dan **hanya bisa diakses oleh admin**.

### 1. **Get All Units**
**Endpoint:** `GET /units`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
[
  {
    "id": 1,
    "name": "Unit Alfa"
  },
  {
    "id": 2,
    "name": "Unit Bravo"
  }
]
```

---

### 2. **Create Unit**
**Endpoint:** `POST /units`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "Unit Charlie"
}
```

**Response (201):**
```json
{
  "id": 3,
  "name": "Unit Charlie"
}
```

---

### 3. **Update Unit**
**Endpoint:** `PUT /units/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "Unit Baru"
}
```

**Response (200):**
```json
{
  "message": "Unit berhasil diupdate"
}
```

---

### 4. **Delete Unit**
**Endpoint:** `DELETE /units/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "message": "Unit berhasil dihapus"
}
```

---

## 🏭 Warehouses Management

⚠️ **Catatan:** Semua endpoint warehouse memerlukan autentikasi dan **hanya bisa diakses oleh admin**.

### 1. **Get All Warehouses**
**Endpoint:** `GET /warehouses`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
[
  {
    "id": 1,
    "name": "Gudang Pusat",
    "unitId": 1
  },
  {
    "id": 2,
    "name": "Gudang Cabang",
    "unitId": 2
  }
]
```

---

### 2. **Create Warehouse**
**Endpoint:** `POST /warehouses`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "Gudang Baru",
  "unitId": 1
}
```

**Response (201):**
```json
{
  "id": 3,
  "name": "Gudang Baru",
  "unitId": 1
}
```

---

### 3. **Update Warehouse**
**Endpoint:** `PUT /warehouses/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "Gudang Diperbarui",
  "unitId": 1
}
```

**Response (200):**
```json
{
  "message": "Warehouse berhasil diupdate"
}
```

---

### 4. **Delete Warehouse**
**Endpoint:** `DELETE /warehouses/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "message": "Warehouse berhasil dihapus"
}
```

---

## 📦 Items Management

✅ **Autentikasi diperlukan**, tetapi **semua user** dapat mengakses endpoints ini.

### 1. **Get All Items**
**Endpoint:** `GET /items`

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters (Optional):**
- `warehouseId` - Filter items berdasarkan warehouse

**Response (200):**
```json
[
  {
    "id": 1,
    "name": "Senapan Mesin",
    "category": "Senjata",
    "stock": 50,
    "condition": "baik",
    "warehouseId": 1,
    "warehouseName": "Gudang Pusat"
  },
  {
    "id": 2,
    "name": "Amunisi 5.56mm",
    "category": "Amunisi",
    "stock": 1000,
    "condition": "baik",
    "warehouseId": 1,
    "warehouseName": "Gudang Pusat"
  }
]
```

---

### 2. **Get Item by ID**
**Endpoint:** `GET /items/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "id": 1,
  "name": "Senapan Mesin",
  "category": "Senjata",
  "stock": 50,
  "condition": "baik",
  "warehouseId": 1,
  "warehouseName": "Gudang Pusat"
}
```

---

### 3. **Create Item**
**Endpoint:** `POST /items`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "Rompi Anti Peluru",
  "category": "Perlindungan",
  "stock": 20,
  "condition": "baik",
  "warehouseId": 1
}
```

**Response (201):**
```json
{
  "id": 3,
  "name": "Rompi Anti Peluru",
  "category": "Perlindungan",
  "stock": 20,
  "condition": "baik",
  "warehouseId": 1
}
```

---

### 4. **Update Item**
**Endpoint:** `PUT /items/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body (Optional fields):**
```json
{
  "name": "Senapan Mesin Update",
  "category": "Senjata",
  "stock": 45,
  "condition": "baik",
  "warehouseId": 1
}
```

**Response (200):**
```json
{
  "message": "Item berhasil diupdate"
}
```

---

### 5. **Delete Item**
**Endpoint:** `DELETE /items/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "message": "Item berhasil dihapus"
}
```

---

### 6. **Update Item Status**
**Endpoint:** `PATCH /items/:id/status`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "condition": "rusak"
}
```

**Nilai condition yang valid:** `baik`, `rusak`, `perbaikan`

**Response (200):**
```json
{
  "message": "Status item berhasil diupdate"
}
```

---

### 7. **Repair Item**
**Endpoint:** `PATCH /items/:id/repair`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "description": "Perbaikan sistem operasi",
  "status": "selesai"
}
```

**Status repair yang valid:** `pending`, `proses`, `selesai`

**Response (200):**
```json
{
  "id": 1,
  "itemId": 1,
  "description": "Perbaikan sistem operasi",
  "status": "selesai"
}
```

---

## 📋 Requests Management

✅ **Autentikasi diperlukan**.

### 1. **Create Request**
Membuat permintaan untuk mengambil item.

**Endpoint:** `POST /requests`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "itemId": 1,
  "quantity": 5,
  "reason": "Keperluan operasi lapangan"
}
```

**Response (201):**
```json
{
  "id": 1,
  "userId": 2,
  "itemId": 1,
  "quantity": 5,
  "reason": "Keperluan operasi lapangan",
  "status": "pending"
}
```

---

### 2. **Get My Requests**
Mendapatkan semua request yang dibuat oleh user yang sedang login.

**Endpoint:** `GET /requests/my`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
[
  {
    "id": 1,
    "userId": 2,
    "itemId": 1,
    "quantity": 5,
    "reason": "Keperluan operasi lapangan",
    "status": "pending",
    "approvedBy": null,
    "userName": "Regular User",
    "itemName": "Senapan Mesin",
    "itemCategory": "Senjata",
    "warehouseId": 1,
    "approvedByName": null
  }
]
```

---

### 3. **Get Request by ID**
**Endpoint:** `GET /requests/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "id": 1,
  "userId": 2,
  "itemId": 1,
  "quantity": 5,
  "reason": "Keperluan operasi lapangan",
  "status": "pending",
  "approvedBy": null,
  "userName": "Regular User",
  "itemName": "Senapan Mesin",
  "itemCategory": "Senjata",
  "warehouseId": 1,
  "approvedByName": null
}
```

---

### 4. **Approve Request**
Menyetujui request (hanya admin).

**Endpoint:** `PATCH /requests/:id/approve`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{}
```

**Response (200):**
```json
{
  "message": "Request berhasil disetujui"
}
```

**Status Codes:**
- `200` - Disetujui
- `403` - Hanya admin yang bisa approve
- `404` - Request tidak ditemukan

---

### 5. **Reject Request**
Menolak request (hanya admin).

**Endpoint:** `PATCH /requests/:id/reject`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{}
```

**Response (200):**
```json
{
  "message": "Request berhasil ditolak"
}
```

**Status Codes:**
- `200` - Ditolak
- `403` - Hanya admin yang bisa reject
- `404` - Request tidak ditemukan

---

## 🔄 Returns Management

✅ **Autentikasi diperlukan**.

### 1. **Create Return**
Membuat return untuk item yang sudah dipinjam (setelah request diapprove).

**Endpoint:** `POST /returns`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "requestId": 1,
  "conditionAfter": "baik"
}
```

**Nilai conditionAfter yang valid:** `baik`, `rusak`

**Response (201):**
```json
{
  "id": 1,
  "requestId": 1,
  "conditionAfter": "baik"
}
```

**Status Codes:**
- `201` - Return berhasil dibuat
- `400` - requestId atau conditionAfter tidak dikirim
- `404` - Request tidak ditemukan

---

## 🔧 Error Handling

Semua error response mengikuti format:

```json
{
  "message": "Deskripsi error"
}
```

### HTTP Status Codes yang Umum:

| Code | Arti |
|------|------|
| `200` | OK - Request berhasil |
| `201` | Created - Resource berhasil dibuat |
| `400` | Bad Request - Data tidak valid |
| `401` | Unauthorized - Token tidak valid atau tidak ada |
| `403` | Forbidden - User tidak punya akses |
| `404` | Not Found - Resource tidak ditemukan |
| `409` | Conflict - Data sudah ada (e.g., email duplicate) |
| `500` | Internal Server Error - Error di server |

---

## 💡 Contoh Request Lengkap

### JavaScript (Fetch API)

```javascript
// Login
async function login() {
  const response = await fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: 'user@example.com',
      password: 'password123'
    })
  });
  
  const data = await response.json();
  const token = data.token;
  localStorage.setItem('token', token);
  return token;
}

// Get All Items
async function getItems() {
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:3000/api/items', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  
  return await response.json();
}

// Create Request
async function createRequest(itemId, quantity, reason) {
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:3000/api/requests', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      itemId,
      quantity,
      reason
    })
  });
  
  return await response.json();
}
```

### Axios

```javascript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

// Setup axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL
});

// Add token to all requests
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Login
async function login(email, password) {
  const { data } = await apiClient.post('/auth/login', { email, password });
  localStorage.setItem('token', data.token);
  return data;
}

// Get All Items
async function getItems() {
  const { data } = await apiClient.get('/items');
  return data;
}

// Create Request
async function createRequest(itemId, quantity, reason) {
  const { data } = await apiClient.post('/requests', {
    itemId,
    quantity,
    reason
  });
  return data;
}
```

---

## 📝 Catatan Penting

1. **JWT Token Expiration:** Token berlaku selama 8 jam, setelah itu user perlu login ulang.
2. **CORS:** API sudah diaktifkan CORS, sehingga bisa diakses dari domain manapun.
3. **Database:** Menggunakan MySQL dengan relasi yang sudah terdefinisi.
4. **Role-based Access:** 
   - **admin:** Dapat mengakses semua endpoint
   - **user:** Dapat membuat request dan melihat items, tetapi tidak bisa mengakses endpoints management (users, units, warehouses)
5. **Validation:** Server melakukan validasi terhadap data yang dikirim, pastikan format data sesuai.

---

## 🎯 Workflow Umum

### Alur Pengambilan Item:

1. **Login** → Dapatkan token
2. **Get Items** → Lihat item yang tersedia
3. **Get Item by ID** → Lihat detail item
4. **Create Request** → Buat permintaan pengambilan item
5. **Admin Approve** → Admin menyetujui request
6. **Create Return** → Kembalikan item setelah selesai digunakan

### Alur Admin Management:

1. **Login** (dengan role admin)
2. **Create/Get/Update/Delete Units** → Kelola unit
3. **Create/Get/Update/Delete Warehouses** → Kelola warehouse
4. **Create/Get/Update/Delete Items** → Kelola inventory
5. **Get Requests** → Lihat semua permintaan
6. **Approve/Reject Requests** → Proses permintaan

---

## 📞 Support

Jika ada pertanyaan atau masalah, silakan hubungi tim development atau lihat repository backend di:
https://github.com/athaadam/military-BE.git

---

**Last Updated:** April 2026  
**API Version:** 1.0.0
