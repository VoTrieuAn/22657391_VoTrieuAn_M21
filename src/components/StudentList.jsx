import { useState } from 'react'

const StudentList = () => {
  // Sample student data
  const [students, setStudents] = useState([
    { id: 1, name: "Nguyễn Văn A", class: "10A1", age: 16 },
    { id: 2, name: "Trần Thị B", class: "11A2", age: 17 },
    { id: 3, name: "Lê Văn C", class: "12A3", age: 18 },
    { id: 4, name: "Phạm Thị D", class: "10A1", age: 16 },
    { id: 5, name: "Hoàng Văn E", class: "11A2", age: 17 },
  ])

  // Function to handle student deletion
  const handleDelete = (id) => {
    setStudents(students.filter((student) => student.id !== id))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Danh sách sinh viên</h1>

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
            {students.map((student) => (
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
                  <button
                    onClick={() => handleDelete(student.id)}
                    className="text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md transition-colors"
                  >
                    Xoá
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile view */}
      <div className="md:hidden space-y-4">
        {students.map((student) => (
          <div key={student.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">{student.name}</h3>
              <button
                onClick={() => handleDelete(student.id)}
                className="text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md text-sm transition-colors"
              >
                Xoá
              </button>
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
        ))}
      </div>

      {/* Empty state */}
      {students.length === 0 && (
        <div className="text-center py-8 bg-white rounded-lg shadow">
          <p className="text-gray-500">Không có sinh viên nào trong danh sách</p>
        </div>
      )}
    </div>
  )
}

export default StudentList
