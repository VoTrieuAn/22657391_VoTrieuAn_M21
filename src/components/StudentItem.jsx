import React from 'react'

const StudentItem =  ({ student, onEdit, onDelete, isMobile }) => {
    if (isMobile) {
      // Mobile view
      return (
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium">{student.name}</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(student)}
                className="cursor-pointer text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-md text-sm transition-colors"
              >
                Sửa
              </button>
              <button
                onClick={() => onDelete(student.id)}
                className="cursor-pointer text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md text-sm transition-colors"
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
      )
    }
  
    // Desktop view (table row)
    return (
      <tr className="hover:bg-gray-50">
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
              onClick={() => onEdit(student)}
              className="cursor-pointer text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-md transition-colors"
            >
              Sửa
            </button>
            <button
              onClick={() => onDelete(student.id)}
              className="cursor-pointer text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md transition-colors"
            >
              Xoá
            </button>
          </div>
        </td>
      </tr>
    )
  }

export default StudentItem
