-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.7.33 - MySQL Community Server (GPL)
-- Server OS:                    Win64
-- HeidiSQL Version:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for db_poliklinik
CREATE DATABASE IF NOT EXISTS `db_poliklinik` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `db_poliklinik`;

-- Dumping structure for table db_poliklinik.obat_keluar
CREATE TABLE IF NOT EXISTS `obat_keluar` (
  `id_obat_keluar` int(11) NOT NULL AUTO_INCREMENT,
  `id_obat` int(11) DEFAULT NULL,
  `nama_obat` varchar(255) DEFAULT NULL,
  `jumlah` int(11) DEFAULT NULL,
  `harga_jual` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `id_pemeriksaan` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_obat_keluar`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Dumping data for table db_poliklinik.obat_keluar: ~0 rows (approximately)
/*!40000 ALTER TABLE `obat_keluar` DISABLE KEYS */;
INSERT IGNORE INTO `obat_keluar` (`id_obat_keluar`, `id_obat`, `nama_obat`, `jumlah`, `harga_jual`, `createdAt`, `updatedAt`, `id_pemeriksaan`) VALUES
	(1, 1, NULL, 4, NULL, '2022-02-06 18:02:39', '2022-02-06 18:02:39', 1);
/*!40000 ALTER TABLE `obat_keluar` ENABLE KEYS */;

-- Dumping structure for table db_poliklinik.sessions
CREATE TABLE IF NOT EXISTS `sessions` (
  `session_id` varchar(32) NOT NULL,
  `expires` datetime DEFAULT NULL,
  `data` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table db_poliklinik.sessions: ~0 rows (approximately)
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT IGNORE INTO `sessions` (`session_id`, `expires`, `data`, `createdAt`, `updatedAt`) VALUES
	('VTY5AdFkkKChX7hm91ZF3B51oZsrT7aR', '2022-02-13 18:44:25', '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"flash":{},"expires":"2022-02-13T18:44:25.335Z"}', '2022-02-06 18:44:25', '2022-02-06 18:44:25');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;

-- Dumping structure for table db_poliklinik.tb_catatan_medis
CREATE TABLE IF NOT EXISTS `tb_catatan_medis` (
  `id_catatan_medis` int(11) NOT NULL AUTO_INCREMENT,
  `id_pasien` int(11) DEFAULT NULL,
  `id_dokter` int(11) DEFAULT NULL,
  `keluhan` text,
  `diagnosa` text,
  `tgl_catatan` date DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id_catatan_medis`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

-- Dumping data for table db_poliklinik.tb_catatan_medis: ~1 rows (approximately)
/*!40000 ALTER TABLE `tb_catatan_medis` DISABLE KEYS */;
INSERT IGNORE INTO `tb_catatan_medis` (`id_catatan_medis`, `id_pasien`, `id_dokter`, `keluhan`, `diagnosa`, `tgl_catatan`, `createdAt`, `updatedAt`) VALUES
	(5, 2, NULL, 'Pilek demam123', 'menurunnya sistem imun', '2022-02-06', '2022-02-06 15:47:14', '2022-02-06 15:55:31'),
	(6, 2, NULL, 'Pilek demam', 'menurunnya sistem imun', '2022-02-02', '2022-02-06 17:06:16', '2022-02-06 17:06:16');
/*!40000 ALTER TABLE `tb_catatan_medis` ENABLE KEYS */;

-- Dumping structure for table db_poliklinik.tb_data_penyakit
CREATE TABLE IF NOT EXISTS `tb_data_penyakit` (
  `id_penyakit` int(11) NOT NULL AUTO_INCREMENT,
  `id_catatan_medis` int(11) DEFAULT NULL,
  `nama_penyakit` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id_penyakit`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table db_poliklinik.tb_data_penyakit: ~0 rows (approximately)
/*!40000 ALTER TABLE `tb_data_penyakit` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_data_penyakit` ENABLE KEYS */;

-- Dumping structure for table db_poliklinik.tb_dokter
CREATE TABLE IF NOT EXISTS `tb_dokter` (
  `id_dokter` int(11) NOT NULL AUTO_INCREMENT,
  `nama` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` text,
  `telepon` varchar(255) DEFAULT NULL,
  `alamat` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id_dokter`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Dumping data for table db_poliklinik.tb_dokter: ~0 rows (approximately)
/*!40000 ALTER TABLE `tb_dokter` DISABLE KEYS */;
INSERT IGNORE INTO `tb_dokter` (`id_dokter`, `nama`, `email`, `password`, `telepon`, `alamat`, `createdAt`, `updatedAt`) VALUES
	(1, 'dokter 1', 'dokter@gmail.com', '$2b$10$41HuL62jkhAUXE5XS983ruYGf3eear6/p6Rz/ksH3RUL0C2WsuE0i', '08888888', 'Banjarmasin', '2022-02-07 01:33:47', '2022-02-07 01:33:48');
/*!40000 ALTER TABLE `tb_dokter` ENABLE KEYS */;

-- Dumping structure for table db_poliklinik.tb_obat
CREATE TABLE IF NOT EXISTS `tb_obat` (
  `id_obat` int(11) NOT NULL AUTO_INCREMENT,
  `nama_obat` varchar(255) DEFAULT NULL,
  `jumlah` int(11) DEFAULT '0',
  `harga_jual` int(11) DEFAULT NULL,
  `harga_beli` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id_obat`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Dumping data for table db_poliklinik.tb_obat: ~0 rows (approximately)
/*!40000 ALTER TABLE `tb_obat` DISABLE KEYS */;
INSERT IGNORE INTO `tb_obat` (`id_obat`, `nama_obat`, `jumlah`, `harga_jual`, `harga_beli`, `createdAt`, `updatedAt`) VALUES
	(1, 'sanmol', 6, 5000, 3000, '2022-02-06 11:26:41', '2022-02-06 18:02:39');
/*!40000 ALTER TABLE `tb_obat` ENABLE KEYS */;

-- Dumping structure for table db_poliklinik.tb_obat_masuk
CREATE TABLE IF NOT EXISTS `tb_obat_masuk` (
  `id_obat_masuk` int(11) NOT NULL AUTO_INCREMENT,
  `id_obat` int(11) DEFAULT NULL,
  `jumlah` int(11) DEFAULT NULL,
  `supplier` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id_obat_masuk`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Dumping data for table db_poliklinik.tb_obat_masuk: ~0 rows (approximately)
/*!40000 ALTER TABLE `tb_obat_masuk` DISABLE KEYS */;
INSERT IGNORE INTO `tb_obat_masuk` (`id_obat_masuk`, `id_obat`, `jumlah`, `supplier`, `createdAt`, `updatedAt`) VALUES
	(1, 1, 10, 'Kimia Farma', '2022-02-06 11:57:11', '2022-02-06 11:57:11');
/*!40000 ALTER TABLE `tb_obat_masuk` ENABLE KEYS */;

-- Dumping structure for table db_poliklinik.tb_pasien
CREATE TABLE IF NOT EXISTS `tb_pasien` (
  `id_pasien` int(11) NOT NULL AUTO_INCREMENT,
  `nama` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `alamat` text,
  `telepon` varchar(255) DEFAULT NULL,
  `jenis_kelamin` enum('1','2') DEFAULT NULL,
  `tempat_lahir` varchar(100) DEFAULT NULL,
  `tgl_lahir` date DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `password` text,
  PRIMARY KEY (`id_pasien`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Dumping data for table db_poliklinik.tb_pasien: ~1 rows (approximately)
/*!40000 ALTER TABLE `tb_pasien` DISABLE KEYS */;
INSERT IGNORE INTO `tb_pasien` (`id_pasien`, `nama`, `email`, `alamat`, `telepon`, `jenis_kelamin`, `tempat_lahir`, `tgl_lahir`, `createdAt`, `updatedAt`, `password`) VALUES
	(2, 'Arul', 'konekup123@gmail.com', 'Jln sutoyo s banjarmasin', '081349490813', '1', 'Banjarmasin', '1994-05-04', '2022-02-06 14:25:05', '2022-02-06 14:25:05', '$2b$10$pv8DJ2UIkCb/aR816EfVXu54YN77S4mrj/5pHO0BvI59M5CJ7WUT.');
/*!40000 ALTER TABLE `tb_pasien` ENABLE KEYS */;

-- Dumping structure for table db_poliklinik.tb_pemeriksaan
CREATE TABLE IF NOT EXISTS `tb_pemeriksaan` (
  `id_pemeriksaan` int(11) NOT NULL AUTO_INCREMENT,
  `id_catatan_medis` int(11) DEFAULT NULL,
  `tinggi_badan` varchar(255) DEFAULT NULL,
  `berat_badan` varchar(255) DEFAULT NULL,
  `tekanan_darah` varchar(255) DEFAULT NULL,
  `kesimpulan` text,
  `tgl_pemeriksaan` date DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id_pemeriksaan`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Dumping data for table db_poliklinik.tb_pemeriksaan: ~1 rows (approximately)
/*!40000 ALTER TABLE `tb_pemeriksaan` DISABLE KEYS */;
INSERT IGNORE INTO `tb_pemeriksaan` (`id_pemeriksaan`, `id_catatan_medis`, `tinggi_badan`, `berat_badan`, `tekanan_darah`, `kesimpulan`, `tgl_pemeriksaan`, `createdAt`, `updatedAt`) VALUES
	(1, 5, '170 cm', '65 Kg', '120', 'perlu istirahat, diberi obat test', '2022-02-07', '2022-02-06 16:40:23', '2022-02-06 16:40:23'),
	(3, 6, '170 cm', '65 Kg', '120', 'perlu istirahat, diberi obat test', '2022-02-03', '2022-02-06 17:15:03', '2022-02-06 17:15:03');
/*!40000 ALTER TABLE `tb_pemeriksaan` ENABLE KEYS */;

-- Dumping structure for table db_poliklinik.tb_transaksi
CREATE TABLE IF NOT EXISTS `tb_transaksi` (
  `id_transaksi` int(11) NOT NULL AUTO_INCREMENT,
  `id_obat` int(11) DEFAULT NULL,
  `id_pemeriksaan` int(11) DEFAULT NULL,
  `tgl_transaksi` date DEFAULT NULL,
  `harga_obat` int(11) DEFAULT NULL,
  `harga_pemeriksaan` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `jumlah` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_transaksi`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Dumping data for table db_poliklinik.tb_transaksi: ~0 rows (approximately)
/*!40000 ALTER TABLE `tb_transaksi` DISABLE KEYS */;
INSERT IGNORE INTO `tb_transaksi` (`id_transaksi`, `id_obat`, `id_pemeriksaan`, `tgl_transaksi`, `harga_obat`, `harga_pemeriksaan`, `createdAt`, `updatedAt`, `jumlah`) VALUES
	(1, 1, 1, '2022-02-08', 20000, 50000, '2022-02-06 18:02:39', '2022-02-06 18:02:39', 4);
/*!40000 ALTER TABLE `tb_transaksi` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
