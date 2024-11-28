import React, { useState } from "react";
import { Select, Input } from "antd";
import "./AddOrderModal.css";

const { Option } = Select;

const AddOrderModal = ({ isVisible, onClose, title, save }) => {
  const [searchTerm, setSearchTerm] = useState(""); // Trạng thái tìm kiếm
  const [filteredProducts, setFilteredProducts] = useState([]); // Sản phẩm được lọc
  const [cart, setCart] = useState([]); // Giỏ hàng

  const productList = [
    { id: 1, name: "Sản phẩm A", image: "/product1.png", price: "100,000 VNĐ" },
    { id: 2, name: "Sản phẩm B", image: "/product2.png", price: "200,000 VNĐ" },
    { id: 3, name: "Sản phẩm C", image: "/product3.png", price: "300,000 VNĐ" },
    { id: 4, name: "Sản phẩm D", image: "/product4.png", price: "400,000 VNĐ" },
  ];

  // Lọc sản phẩm dựa trên từ khóa tìm kiếm
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = productList.filter((product) =>
      product.name.toLowerCase().includes(value)
    );
    setFilteredProducts(filtered);
  };

  // Thêm sản phẩm vào giỏ hàng
  const addToCart = (product) => {
    if (!cart.some((item) => item.id === product.id)) {
      setCart((prevCart) => [...prevCart, product]);
    }
    setSearchTerm(""); // Reset thanh tìm kiếm về rỗng
    setFilteredProducts([]); // Reset danh sách sản phẩm
  };
  

  // Xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Lưu đơn hàng
  const handleSaveOrder = () => {
    console.log("Đơn hàng đã lưu:", cart); // Kết nối xử lý lưu đơn hàng tại đây
    onClose(); // Đóng modal
  };

  if (!isVisible) return null;

  return (
    <div className="tc1">
      <div className="overlay1">
        <div className="modal1">
          <div className="modal-content">
            <h3 className="modal-title">{title}</h3>
            <div className="modal-body">
              {/* Cột bên trái: Thông tin */}
              <div className="modal-column left-column">
                <div className="header-row">
                  <label>Chi tiết đơn hàng</label>
                  <div className="toggle-container">
                    <label>Khách hàng mới</label>
                    <div className="toggle-switch">
                      <input type="checkbox" id="newCustomer" />
                      <label htmlFor="newCustomer"></label>
                    </div>
                  </div>
                </div>
                <form>
                  <div className="custom-select-container">
                    <Input
                      type="text"
                      className="custom-inputt"
                      placeholder="Nhập tên khách hàng"
                    />
                  </div>
                  <br />
                  <div style={{ display: "flex", gap: "16px" }} className="row3">
                    {/* Hình thức thanh toán */}
                    <Select
                      placeholder="Chọn hình thức thanh toán"
                      style={{ width: "600px" }}
                    >
                      <Option value="mastercard">MasterCard</Option>
                      <Option value="visa">Visa</Option>
                      <Option value="paypal">PayPal</Option>
                    </Select>

                    {/* Loại đơn hàng */}
                    <Select
                      showSearch
                      placeholder="Nhập hoặc chọn Loại đơn hàng"
                      style={{ width: "600px" }}
                    >
                      <Option value="order1">Loại đơn hàng 1</Option>
                      <Option value="order2">Loại đơn hàng 2</Option>
                      <Option value="order3">Loại đơn hàng 3</Option>
                    </Select>
                  </div>
                  <br />
                  <label>Ngày tháng năm đặt hàng</label>
                  <br />
                  <div className="days" style={{ display: "flex", gap: "16px" }}>
                    <input
                      type="date"
                      style={{
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        width: "100%",
                        height: "50px",
                      }}
                    />
                    <Input
                      type="time"
                      style={{
                        width: "100%",
                        height: "50px",
                        paddingLeft: "40px",
                        paddingRight: "40px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        fontSize: "16px",
                        textAlign: "center",
                        boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                  </div>
                  <label className="trangthai-title">Trạng Thái</label>
                  <br />
                  <Select placeholder="Chọn trạng thái" className="thanhtt">
                    <Option value="processing">Đang xử lý</Option>
                    <Option value="cancelled">Đã hủy</Option>
                    <Option value="delivered">Đã giao</Option>
                  </Select>
                  <br />
                  <textarea
                    placeholder="Ghi chú"
                    className="ghichu"
                  ></textarea>
                </form>
              </div>

              {/* Cột bên phải: Chọn sản phẩm */}
              {/* Cột bên phải: Chọn sản phẩm và giỏ hàng */}
              <div className="modal-column right-column">
    <h3>Sản phẩm</h3>
    <Input
      placeholder="Tìm kiếm sản phẩm..."
      value={searchTerm}
      onChange={handleSearch}
      style={{ width: "100%", marginBottom: 16 }}
    />
    <div className="product-list">
      {searchTerm.length > 0 && filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <div
            key={product.id}
            className="product-item"
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: "40px",
                height: "40px",
                marginRight: "10px",
              }}
            />
            <div>
              <strong>{product.name}</strong>
              <div style={{ color: "gray" }}>{product.price}</div>
            </div>
            <button
              onClick={() => addToCart(product)}
              style={{
                marginLeft: "auto",
                backgroundColor: "#1890ff",
                color: "#fff",
                border: "none",
                padding: "5px 10px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Thêm
            </button>
          </div>
        ))
      ) : searchTerm.length > 0 ? (
        <p>Không tìm thấy sản phẩm</p>
      ) : (
        <p>Nhập từ khóa để tìm kiếm sản phẩm</p>
      )}
    </div>

    {/* Hiển thị giỏ hàng */}
    <div className="cart-container">
      <h3>Giỏ hàng</h3>
      {cart.length > 0 ? (
        cart.map((item) => (
          <div
            key={item.id}
            className="cart-item"
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{
                width: "40px",
                height: "40px",
                marginRight: "10px",
              }}
            />
            <div>
              <strong>{item.name}</strong>
              <div style={{ color: "gray" }}>{item.price}</div>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              style={{
                marginLeft: "auto",
                backgroundColor: "#ff4d4f",
                color: "#fff",
                border: "none",
                padding: "5px 10px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Xóa
            </button>
          </div>
                    ))
                  ) : (
                    <p>Chưa có sản phẩm trong giỏ hàng</p>
                  )}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="cancel-btn" onClick={onClose}>
                Hủy
              </button>
              <button className="submit-btn" onClick={handleSaveOrder}>
                {save}
              </button>
            </div>
          </div>
        </div>
      </div>
  </div>
  );
};

export default AddOrderModal;
