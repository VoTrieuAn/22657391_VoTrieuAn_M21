import { useEffect, useRef, useState } from 'react'

const StudentList = () => {
  // Sample student data
  const [students, setStudents] = useState([
    { id: 1, name: "Nguyễn Văn A", class: "10A1", age: 16 },
    { id: 2, name: "Trần Thị B", class: "11A2", age: 17 },
    { id: 3, name: "Lê Văn C", class: "12A3", age: 18 },
    { id: 4, name: "Phạm Thị D", class: "10A1", age: 16 },
    { id: 5, name: "Hoàng Văn E", class: "11A2", age: 17 },
    { id: 6, name: "Vũ Thị F", class: "12A3", age: 18 },
    { id: 7, name: "Đặng Văn G", class: "10A1", age: 16 },
    { id: 8, name: "Bùi Thị H", class: "11A2", age: 17 },
  ])

  // Search state
  const [searchQuery, setSearchQuery] = useState("")

  // Class filter state
  const [classFilter, setClassFilter] = useState("")

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    class: "",
    age: "",
  })

  // Form validation state
  const [errors, setErrors] = useState({
    name: "",
    class: "",
    age: "",
  })

  // Edit modal state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingStudent, setEditingStudent] = useState(null)
  const modalRef = useRef(null)

  // Get unique classes for the dropdown
  const uniqueClasses = Array.from(new Set(students.map((student) => student.class))).sort()

  // Filter students based on search query and class filter
  const filteredStudents = students.filter((student) => {
    const matchesName = student.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesClass = classFilter === "" || student.class === classFilter
    return matchesName && matchesClass
  })

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  // Handle class filter change
  const handleClassFilterChange = (e) => {
    setClassFilter(e.target.value)
  }

  // Clear filters
  const clearFilters = () => {
    setSearchQuery("")
    setClassFilter("")
  }

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  // Validate form
  const validateForm = () => {
    let valid = true
    const newErrors = { ...errors }

    if (!formData.name.trim()) {
      newErrors.name = "Vui lòng nhập họ tên"
      valid = false
    }

    if (!formData.class.trim()) {
      newErrors.class = "Vui lòng nhập lớp"
      valid = false
    }

    if (!formData.age.trim()) {
      newErrors.age = "Vui lòng nhập tuổi"
      valid = false
    } else if (isNaN(Number(formData.age)) || Number(formData.age) <= 0) {
      newErrors.age = "Tuổi phải là số dương"
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  // Handle form submission for adding new student
  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      // Add new student
      const newStudent = {
        id: Math.max(0, ...students.map((s) => s.id)) + 1,
        name: formData.name,
        class: formData.class,
        age: Number(formData.age),
      }

      setStudents([...students, newStudent])

      // Reset form
      setFormData({
        name: "",
        class: "",
        age: "",
      })
    }
  }

  // Function to handle student deletion
  const handleDelete = (id) => {
    setStudents(students.filter((student) => student.id !== id))
  }

  // Function to open edit modal
  const handleEdit = (student) => {
    setEditingStudent(student)
    setFormData({
      name: student.name,
      class: student.class,
      age: student.age.toString(),
    })
    setIsEditModalOpen(true)
  }

  // Function to save edited student
  const handleSaveEdit = (e) => {
    e.preventDefault()

    if (validateForm() && editingStudent) {
      // Update student
      const updatedStudents = students.map((student) => {
        if (student.id === editingStudent.id) {
          return {
            ...student,
            name: formData.name,
            class: formData.class,
            age: Number(formData.age),
          }
        }
        return student
      })

      setStudents(updatedStudents)
      closeEditModal()
    }
  }

  // Function to close edit modal
  const closeEditModal = () => {
    setIsEditModalOpen(false)
    setEditingStudent(null)
    setFormData({
      name: "",
      class: "",
      age: "",
    })
    setErrors({
      name: "",
      class: "",
      age: "",
    })
  }

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeEditModal()
      }
    }

    if (isEditModalOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isEditModalOpen])

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        closeEditModal()
      }
    }

    if (isEditModalOpen) {
      document.addEventListener("keydown", handleEscKey)
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey)
    }
  }, [isEditModalOpen])

  // Determine if any filters are active
  const isFiltering = searchQuery !== "" || classFilter !== ""

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Danh sách sinh viên</h1>

      {/* Add Student Form */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Thêm sinh viên mới</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Họ tên
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${errors.name ? "border-red-500" : "border-gray-300"}`}
              placeholder="Nhập họ tên"
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="class" className="block text-sm font-medium text-gray-700 mb-1">
              Lớp
            </label>
            <input
              type="text"
              id="class"
              name="class"
              value={formData.class}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${errors.class ? "border-red-500" : "border-gray-300"}`}
              placeholder="Nhập lớp"
            />
            {errors.class && <p className="mt-1 text-sm text-red-600">{errors.class}</p>}
          </div>

          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
              Tuổi
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${errors.age ? "border-red-500" : "border-gray-300"}`}
              placeholder="Nhập tuổi"
              min="1"
            />
            {errors.age && <p className="mt-1 text-sm text-red-600">{errors.age}</p>}
          </div>

          <div>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Thêm sinh viên
            </button>
          </div>
        </form>
      </div>

      {/* Filters Section */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">Tìm kiếm và lọc</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search Bar */}
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Tìm kiếm theo tên
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="search"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Nhập tên sinh viên..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          {/* Class Filter */}
          <div>
            <label htmlFor="class-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Lọc theo lớp
            </label>
            <select
              id="class-filter"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={classFilter}
              onChange={handleClassFilterChange}
            >
              <option value="">Tất cả các lớp</option>
              {uniqueClasses.map((className) => (
                <option key={className} value={className}>
                  {className}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Clear Filters Button */}
        {isFiltering && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={clearFilters}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Xóa bộ lọc
            </button>
          </div>
        )}
      </div>

      {/* Filter Results Info */}
      {isFiltering && (
        <div className="mb-4 text-sm text-gray-600">
          {filteredStudents.length === 0 ? (
            "Không tìm thấy sinh viên nào phù hợp với bộ lọc."
          ) : (
            <div>
              Tìm thấy {filteredStudents.length} sinh viên
              {searchQuery && <span> có tên chứa "{searchQuery}"</span>}
              {classFilter && <span> thuộc lớp {classFilter}</span>}.
            </div>
          )}
        </div>
      )}

      {/* Desktop view */}
      <div className="hidden md:block overflow-hidden rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Tên
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Lớp
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Tuổi
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{student.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{student.class}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{student.age}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleEdit(student)}
                        className="text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-md transition-colors"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDelete(student.id)}
                        className="text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md transition-colors"
                      >
                        Xoá
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                  {isFiltering
                    ? "Không tìm thấy sinh viên nào phù hợp với bộ lọc."
                    : "Không có sinh viên nào trong danh sách."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile view */}
      <div className="md:hidden space-y-4">
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student) => (
            <div key={student.id} className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium">{student.name}</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(student)}
                    className="text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-md text-sm transition-colors"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(student.id)}
                    className="text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md text-sm transition-colors"
                  >
                    Xoá
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-500">
                <div>
                  <span className="font-medium">Lớp:</span> {student.class}
                </div>
                <div>
                  <span className="font-medium">Tuổi:</span> {student.age}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white p-4 rounded-lg shadow text-center text-gray-500">
            {isFiltering
              ? "Không tìm thấy sinh viên nào phù hợp với bộ lọc."
              : "Không có sinh viên nào trong danh sách."}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div ref={modalRef} className="bg-white rounded-lg shadow-lg w-full max-w-md mx-auto overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Sửa thông tin sinh viên</h3>
                <button onClick={closeEditModal} className="text-gray-500 hover:text-gray-700" aria-label="Đóng">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSaveEdit} className="space-y-4">
                <div>
                  <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700 mb-1">
                    Họ tên
                  </label>
                  <input
                    type="text"
                    id="edit-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Nhập họ tên"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="edit-class" className="block text-sm font-medium text-gray-700 mb-1">
                    Lớp
                  </label>
                  <input
                    type="text"
                    id="edit-class"
                    name="class"
                    value={formData.class}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md ${
                      errors.class ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Nhập lớp"
                  />
                  {errors.class && <p className="mt-1 text-sm text-red-600">{errors.class}</p>}
                </div>

                <div>
                  <label htmlFor="edit-age" className="block text-sm font-medium text-gray-700 mb-1">
                    Tuổi
                  </label>
                  <input
                    type="number"
                    id="edit-age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md ${
                      errors.age ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Nhập tuổi"
                    min="1"
                  />
                  {errors.age && <p className="mt-1 text-sm text-red-600">{errors.age}</p>}
                </div>

                <div className="flex justify-end space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={closeEditModal}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Huỷ
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Lưu
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default StudentList
