import React, { useState, useEffect, useMemo } from "react";
import { Modal, Button, Checkbox, Input, Table } from "antd";
import "./Modal_timkiemdichvu.css";

const ServiceModal = ({ isVisible, onCancel, onConfirm, services = [] }) => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  // Lọc danh sách dịch vụ theo từ khóa
  const filteredServices = useMemo(() => {
    return services.filter((service) =>
      service.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [services, searchValue]);

  // Reset trạng thái khi modal đóng
  useEffect(() => {
    if (!isVisible) {
      setSelectedServices([]);
    }
  }, [isVisible]);

  // Hàm xử lý chọn hoặc bỏ chọn dịch vụ
  const handleSelect = (id) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  // Xác nhận lựa chọn và gửi dữ liệu lên component cha
  const handleOk = () => {
    const selectedServiceDetails = services.filter((service) =>
      selectedServices.includes(service.id)
    );
    onConfirm(selectedServiceDetails);
  };

  // Hủy lựa chọn và đóng modal
  const handleCancel = () => {
    setSelectedServices([]);
    onCancel();
  };

  // Cấu hình cột bảng
  const columns = [
    {
      title: "Hình ảnh",
      dataIndex: "image", // Trường dữ liệu hình ảnh
      key: "image",
      align: "left",
      width: "15%", // Đặt chiều rộng cho cột
      render: (image) => (
        <img
          src={image || "https://via.placeholder.com/40"} // Hiển thị hình ảnh mặc định nếu không có
          alt="Dịch vụ"
          style={{
            width: "40px",
            height: "40px",
            objectFit: "cover",
            borderRadius: "4px",
          }}
        />
      ),
    },
    {
      title: "Dịch vụ",
      dataIndex: "name",
      key: "name",
      align:"left",
      width: "30%",
      render: (text) => <span style={{ fontWeight: 500 }}>{text}</span>,
    },
    {
      title: "Giá (VND)",
      dataIndex: "price",
      key: "price",
      align:"left",
      render: (price) => price.toLocaleString(),
    },
    {
      title: "",
      key: "select",
      align:"left",
      render: (_, record) => (
        <Checkbox
          checked={selectedServices.includes(record.id)}
          onChange={() => handleSelect(record.id)}
        >
          Chọn
        </Checkbox>
      ),
    },
  ];

  return (
    <Modal
      title="Tìm kiếm dịch vụ"
      visible={isVisible}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Hủy
        </Button>,
        <Button key="confirm" type="primary" onClick={handleOk}>
          Hoàn tất chọn
        </Button>,
      ]}
      centered
      className="service-modal"
    >
      <Input
        placeholder="Tìm kiếm dịch vụ"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        style={{
          marginBottom: "16px",
          padding: "8px",
          borderRadius: "4px",
        }}
      />
      <Table
        dataSource={filteredServices.map((service) => ({
          ...service,
          key: service.id,
        }))}
        columns={columns}
        pagination={false}
        bordered
      />
    </Modal>
  );
};

export default ServiceModal;
