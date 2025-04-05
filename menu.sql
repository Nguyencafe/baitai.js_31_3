-- Tạo bảng menu
CREATE TABLE menu (
    id INT AUTO_INCREMENT PRIMARY KEY, -- ID tự tăng
    text VARCHAR(255) NOT NULL,        -- Tên menu
    url VARCHAR(255) DEFAULT '/',      -- URL của menu
    parent_id INT NULL,                -- ID của menu cha (nếu có)
    FOREIGN KEY (parent_id) REFERENCES menu(id) -- Khóa ngoại tham chiếu đến chính bảng menu
);

-- Chèn dữ liệu mẫu
INSERT INTO menu (text, url, parent_id) VALUES
('Menu 1', '/menu1', NULL),           -- Menu cấp 1
('Menu 2', '/menu2', NULL),           -- Menu cấp 1
('Submenu 1.1', '/submenu1.1', 1),    -- Menu cấp 2, con của Menu 1
('Submenu 1.2', '/submenu1.2', 1),    -- Menu cấp 2, con của Menu 1
('Submenu 2.1', '/submenu2.1', 2);    -- Menu cấp 2, con của Menu 2
