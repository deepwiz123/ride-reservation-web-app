"use client";

import { useState } from "react";

interface CustomerDetails {
  name: string;
  email: string;
  phone: string;
}

export default function FirstStep({ onNext }: { onNext: (data: CustomerDetails) => void }) {
  const [formData, setFormData] = useState<CustomerDetails>({
    name: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    let tempErrors: { [key: string]: string } = {};
    if (!formData.name) tempErrors.name = "Name is required.";
    if (!formData.email) tempErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "Invalid email format.";
    if (!formData.phone) tempErrors.phone = "Phone number is required.";
    else if (!/^\d{10}$/.test(formData.phone)) tempErrors.phone = "Enter a valid 10-digit phone number.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onNext(formData);
    }
  };

  return (
    <div className="max-w-lg h-full mx-auto p-6 bg-white shadow-2xl rounded-2xl">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Enter Your Details</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {["name", "email", "phone"].map((field) => (
          <div key={field}>
            <input
              type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
              name={field}
              placeholder={field === "name" ? "Full Name" : field === "email" ? "Email Address" : "Phone Number"}
              value={(formData as any)[field]}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                errors[field] ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
          </div>
        ))}

        <button
          type="submit"
          disabled={!formData.name || !formData.email || !formData.phone}
          className={`w-full text-lg font-semibold py-3 rounded-lg transition ${
            formData.name && formData.email && formData.phone
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Next →
        </button>
      </form>
    </div>
  );
}
