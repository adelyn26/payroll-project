import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BaseApi from "../services/BaseApi";


export const useRegistrationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [companyData, setCompanyData] = useState({
    companyName: "",
    rnc: "",
    sector: "",
    address: "",
    companyPhone: "",
    companyEmail: "",
    employeeCount: "",
  });

  const [adminData, setAdminData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "admin",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCompanyChange = (field, value) => {
    setCompanyData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleAdminChange = (field, value) => {
    setAdminData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

   const validateCompanyData = () => {
    const newErrors = {};

    if (!companyData.companyName) newErrors.companyName = 'El nombre de la empresa es requerido';
    if (!companyData.rnc) newErrors.rnc = 'El RNC es requerido';
    if (!companyData.sector) newErrors.sector = 'El sector es requerido';
    if (!companyData.address) newErrors.address = 'La dirección es requerida';
    if (!companyData.companyPhone) newErrors.companyPhone = 'El teléfono de la empresa es requerido';
    if (!companyData.companyEmail) newErrors.companyEmail = 'El email de la empresa es requerido';
    if (companyData.companyEmail && !/\S+@\S+\.\S+/.test(companyData.companyEmail)) {
      newErrors.companyEmail = 'El email no es válido';
    }
    if (!companyData.employeeCount) newErrors.employeeCount = 'La cantidad de empleados es requerida';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateAdminData = () => {
    const newErrors = {};

    if (!adminData.firstName) newErrors.firstName = 'El nombre es requerido';
    if (!adminData.lastName) newErrors.lastName = 'El apellido es requerido';
    if (!adminData.email) newErrors.email = 'El email es requerido';
    if (adminData.email && !/\S+@\S+\.\S+/.test(adminData.email)) {
      newErrors.email = 'El email no es válido';
    }
    if (!adminData.phone) newErrors.phone = 'El teléfono es requerido';
    if (!adminData.password) newErrors.password = 'La contraseña es requerida';
    if (adminData.password && adminData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    if (adminData.password !== adminData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const doRequest = async (url, data) => {
    const request = {
      nombre: adminData.firstName,
      apellido: adminData.lastName,
      email: adminData.email,
    }
    try {
      const response = await BaseApi.post(url, data);
      return response.data;
    } catch (error) {
      console.error("Error en la solicitud:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateAdminData()) {
      setIsLoading(true);
      // Simular proceso de registro
      setTimeout(() => {
        setIsLoading(false);
        // updateUserData({ company: companyData, admin: adminData });
        // navigate('/login');
      }, 2000);
    }
  };


  return {
    currentStep,
    setCurrentStep,
    companyData,
    handleCompanyChange,
    adminData,
    handleAdminChange,
    errors,
    setErrors,
    isLoading,
    setIsLoading,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    handleSubmit,
    validateCompanyData
  };
};
