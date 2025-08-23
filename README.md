<p align="center">
  <a href="https://docsify.js.org">
    <img alt="docsify" src="./frontend/src/assets/images/logo.png" width="260">
  </a>
</p>


<p align="center">
<img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white" />
<img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" />
<img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" />
<img src="https://img.shields.io/badge/laravel-%23FF2D20.svg?style=for-the-badge&logo=laravel&logoColor=white" />
<img src="https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white" />
</p>


Labrent - Sistem peminjaman barang pada laboratorium yang dapat digunakan oleh toolman dan siswa sebagai peminjam

## Features

- Login - Register [ with role permission ]
- CRUD Tools with manajemen stok
- Rental Manajement [ with accept or tools return ]
- Client Area

## Quick Start

Get going fast by using a static web server or GitHub Pages with this ready-to-use [Docsify Template](https://github.com/docsifyjs/docsify-template), review the [quick start tutorial](https://docsify.js.org/#/quickstart) or jump right into a CodeSandbox example site with the button below.

## Struktur Project

```bash
labrent/
│
├── backend/    # API server menggunakan Laravel (PHP 8.4.7)
│   ├── app/
│   ├── routes/
│   ├── database/
│   └── ...
│
├── frontend/   # UI aplikasi menggunakan React
│   ├── src/
│   ├── public/
│   └── ...
│
└── README.md   # Dokumentasi project
```

## Teknologi

- **Backend**: Laravel (PHP 8.4.7)
- **Frontend**: React
- **Database**: MySQL / MariaDB

## Cara Menjalankan

### 1. Backend (Laravel)

Masuk ke folder `backend`:

```bash
cd backend
```
```bash
composer install
```
```bash
cp .env.example .env
```
```bash
php artisan key:generate
```
```bash
php artisan migrate --seed
```
```bash
php artisan serve
```
`Now, backend run in http://localhost:8000`

### 2. Frontend (React)

Masuk ke folder `frontend`:

```bash
cd frontend
```
```bash
npm i
```
```bash
npm run dev
```
`Now, backend run in http://localhost:5173`
