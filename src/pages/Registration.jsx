import React, { useState } from "react";
import Logo from "../images/logo.png";
import Background from "../images/background.png";
import { Button } from "../components/Button.jsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/Card";
import { Input } from "../components/Input.jsx";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  Eye,
  EyeOff,
  Shield,
  CheckCircle,
  Sparkles,
  Crown,
  Users,
  Zap,
  FileText,
  Hash,
  Briefcase,
  Factory,
  Info
} from "lucide-react";
import { Badge } from "../components/Badge.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/Select.jsx";
import { Label } from "../components/Label.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import { Sectors, EmployeeCounts } from "../mocks/registrationData.js";

export default function Registration() {
  const navigate = useNavigate();
  const location = useLocation();

  const plan = location.state?.plan;

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

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     // Aquí puedes manejar el envío del formulario
  //     console.log(formData);
  //   };

  const handleNextStep = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    }
  };
  const getPlanIcon = (planId) => {
    switch (planId) {
      case "basico":
        return Users;
      case "profesional":
        return Zap;
      case "empresarial":
        return Crown;
      default:
        return User;
    }
  };

  const getPlanColor = (planId) => {
    switch (planId) {
      case "basico":
        return "from-blue-500 to-indigo-500";
      case "profesional":
        return "from-orange-500 to-red-500";
      case "empresarial":
        return "from-purple-500 to-pink-500";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 relative overflow-hidden">
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-6 text-orange-600 hover:text-orange-700 hover:bg-orange-50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a Planes
          </Button>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full mb-4">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">
                ¡Registro empresarial!
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 via-orange-500 to-red-500 bg-clip-text text-transparent mb-4">
              {currentStep === 1
                ? "Datos de tu Empresa"
                : "Administrador Principal"}
            </h1>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {currentStep === 1
                ? "🏢 Primero registremos los datos de tu empresa para personalizar tu experiencia"
                : "👨‍💼 Ahora crear el perfil del administrador que gestionará el sistema"}
            </p>

            {/* Progress indicator */}
            <div className="flex items-center justify-center mt-6 space-x-4">
              <div className="flex items-center ">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep >= 1
                      ? "bg-orange-400 text-white"
                      : "bg-gray-200 text-gray-400"
                  } transition-all duration-300`}
                >
                  <Building2 className="w-4 h-4" />
                </div>
                <span
                  className={`text-sm font-medium  ${
                    currentStep >= 1 ? "text-orange-500" : "text-gray-400"
                  }`}
                >
                  Empresa
                </span>
              </div>

              <div
                className={`w-8 h-1 rounded-full
                ${currentStep === 2 ? "bg-orange-400" : "bg-gray-300"} transition-all duration-300`}
              >
                {/* Línea de progreso */}
              </div>

              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full  flex items-center justify-center ${
                    currentStep === 2
                      ? "bg-orange-400 text-white"
                      : "bg-gray-300 text-gray-400"
                  } transition-all duration-300`}
                >
                  <User className="w-4 h-4" />
                </div>
                <span
                  className={` ml-2 text-sm font-medium ${
                    currentStep === 2 ? "text-orange-600" : "text-gray-400"
                  }`}
                >
                  Administrador
                </span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Selected Plan Card */}
            {plan && (
              <div className="lg:col-span-1">
                <Card className="sticky top-8 bg-gradient-to-br from-white/80 to-orange-50/80 backdrop-blur-sm border-2 border-orange-200 shadow-xl">
                  <CardHeader className="text-center pb-4">
                    <div className="flex items-center justify-center mb-4">
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${getPlanColor(
                          plan.id
                        )} flex items-center justify-center shadow-lg`}
                      >
                        {React.createElement(getPlanIcon(plan.id), {
                          className: "w-8 h-8 text-white",
                        })}
                      </div>
                    </div>

                    <CardTitle className="text-xl text-gray-800 mb-2">
                      🎯 Plan Seleccionado
                    </CardTitle>
                    <div className="text-xl text-gray-800 mb-2">
                      <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1 text-sm font-semibold shadow-lg mb-4">
                        {plan.name}
                      </Badge>
                    </div>
                    <div className="text-center">
                      <span className="text-3xl font-bold text-orange-600">
                        ${plan.price}
                      </span>
                      <span className="text-gray-500">/mes</span>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-800 text-sm mb-3">
                        ✨ Lo que incluye:
                      </h4>
                      {plan.features.slice(0, 4).map((feature, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">
                            {feature}
                          </span>
                        </div>
                      ))}
                      {plan.features.length > 4 && (
                        <div className="text-xs text-gray-500 mt-2">
                          +{plan.features.length - 4} características más
                        </div>
                      )}
                    </div>
                    {/* Progress summary */}
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <h5 className="font-semibold text-gray-700 text-sm mb-2">
                        📋 Progreso del registro:
                      </h5>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <div
                            className={`w-4 h-4 rounded-full flex items-center justify-center ${
                              currentStep >= 1 ? "bg-green-100" : "bg-gray-100"
                            }`}
                          >
                            {currentStep >= 1 ? (
                              <CheckCircle className="w-3 h-3 text-green-600" />
                            ) : (
                              <Building2 className="w-3 h-3 text-gray-400" />
                            )}
                          </div>
                          <span
                            className={
                              currentStep >= 1
                                ? "text-green-600"
                                : "text-gray-500"
                            }
                          >
                            Datos empresariales
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div
                            className={`w-4 h-4 rounded-full flex items-center justify-center ${
                              currentStep >= 2 ? "bg-orange-100" : "bg-gray-100"
                            }`}
                          >
                            <User
                              className={`w-3 h-3 ${
                                currentStep >= 2
                                  ? "text-orange-600"
                                  : "text-gray-400"
                              }`}
                            />
                          </div>
                          <span
                            className={
                              currentStep >= 2
                                ? "text-orange-600"
                                : "text-gray-500"
                            }
                          >
                            Administrador
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
             {/* Registration Forms */}
            <div className={plan ? "lg:col-span-2" : "lg:col-span-3"}>
              <Card className="bg-white/90 backdrop-blur-sm border-2 border-orange-200 shadow-xl">
                {/* Step 1: Company Data */}
                {currentStep === 1 && (
                  <>
                    <CardHeader className="text-center">
                      <CardTitle className="text-2xl text-gray-800 mb-2 flex items-center justify-center gap-2">
                        <Building2 className="w-6 h-6 text-orange-500" />
                        Información de la Empresa
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        Registra los datos oficiales de tu empresa
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      <form className="space-y-6">
                        {/* Basic Company Info */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-orange-600 font-semibold">
                            <FileText className="w-5 h-5" />
                            <span>Datos Básicos</span>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="companyName" className="text-gray-700 font-medium">Nombre de la Empresa *</Label>
                              <Input
                                id="companyName"
                                placeholder="Ej: Mi Empresa S.A."
                                value={companyData.companyName}
                                onChange={(e) => handleCompanyChange('companyName', e.target.value)}
                                className={`mt-1 border-2 transition-all duration-200 ${
                                  errors.companyName 
                                    ? 'border-red-300 focus:border-red-400' 
                                    : 'border-gray-200 focus:border-orange-400 hover:border-orange-300'
                                }`}
                              />
                              {errors.companyName && (
                                <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                                  <span>⚠️</span> {errors.companyName}
                                </p>
                              )}
                            </div>

                            <div>
                              <Label htmlFor="rnc" className="text-gray-700 font-medium">RNC/NIT *</Label>
                              <Input
                                id="rnc"
                                placeholder="Ej: 123-45678-9"
                                value={companyData.rnc}
                                onChange={(e) => handleCompanyChange('rnc', e.target.value)}
                                className={`mt-1 border-2 transition-all duration-200 ${
                                  errors.rnc 
                                    ? 'border-red-300 focus:border-red-400' 
                                    : 'border-gray-200 focus:border-orange-400 hover:border-orange-300'
                                }`}
                              />
                              {errors.rnc && (
                                <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                                  <span>⚠️</span> {errors.rnc}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="sector" className="text-gray-700 font-medium">Sector Empresarial *</Label>
                              <Select onValueChange={(value) => handleCompanyChange('sector', value)}>
                                <SelectTrigger className={`mt-1 border-2 transition-all duration-200 ${
                                  errors.sector 
                                    ? 'border-red-300 focus:border-red-400' 
                                    : 'border-gray-200 focus:border-orange-400 hover:border-orange-300'
                                }`}>
                                  <SelectValue placeholder="🏭 Selecciona el sector" />
                                </SelectTrigger>
                                <SelectContent>
                                  {Sectors.map((sector) => (
                                    <SelectItem key={sector} value={sector.toLowerCase().replace(/\s+/g, '_')}>
                                      {sector}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              {errors.sector && (
                                <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                                  <span>⚠️</span> {errors.sector}
                                </p>
                              )}
                            </div>

                            <div>
                              <Label htmlFor="employeeCount" className="text-gray-700 font-medium">Cantidad de Empleados *</Label>
                              <Select onValueChange={(value) => handleCompanyChange('employeeCount', value)}>
                                <SelectTrigger className={`mt-1 border-2 transition-all duration-200 ${
                                  errors.employeeCount 
                                    ? 'border-red-300 focus:border-red-400' 
                                    : 'border-gray-200 focus:border-orange-400 hover:border-orange-300'
                                }`}>
                                  <SelectValue placeholder="👥 Tamaño de empresa" />
                                </SelectTrigger>
                                <SelectContent>
                                  {EmployeeCounts.map((count) => (
                                    <SelectItem key={count} value={count.toLowerCase().replace(/\s+/g, '_')}>
                                      {count}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              {errors.employeeCount && (
                                <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                                  <span>⚠️</span> {errors.employeeCount}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Contact Information */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-orange-600 font-semibold">
                            <Phone className="w-5 h-5" />
                            <span>Información de Contacto</span>
                          </div>

                          <div>
                            <Label htmlFor="address" className="text-gray-700 font-medium">Dirección *</Label>
                            <Input
                              id="address"
                              placeholder="Calle, Ciudad, País"
                              value={companyData.address}
                              onChange={(e) => handleCompanyChange('address', e.target.value)}
                              className={`mt-1 border-2 transition-all duration-200 ${
                                errors.address 
                                  ? 'border-red-300 focus:border-red-400' 
                                  : 'border-gray-200 focus:border-orange-400 hover:border-orange-300'
                              }`}
                            />
                            {errors.address && (
                              <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                                <span>⚠️</span> {errors.address}
                              </p>
                            )}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="companyPhone" className="text-gray-700 font-medium">Teléfono *</Label>
                              <Input
                                id="companyPhone"
                                placeholder="809-555-5555"
                                value={companyData.companyPhone}
                                onChange={(e) => handleCompanyChange('companyPhone', e.target.value)}
                                className={`mt-1 border-2 transition-all duration-200 ${
                                  errors.companyPhone 
                                    ? 'border-red-300 focus:border-red-400' 
                                    : 'border-gray-200 focus:border-orange-400 hover:border-orange-300'
                                }`}
                              />
                              {errors.companyPhone && (
                                <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                                  <span>⚠️</span> {errors.companyPhone}
                                </p>
                              )}
                            </div>

                            <div>
                              <Label htmlFor="companyEmail" className="text-gray-700 font-medium">Email Corporativo *</Label>
                              <Input
                                id="companyEmail"
                                type="email"
                                placeholder="info@miempresa.com"
                                value={companyData.companyEmail}
                                onChange={(e) => handleCompanyChange('companyEmail', e.target.value)}
                                className={`mt-1 border-2 transition-all duration-200 ${
                                  errors.companyEmail 
                                    ? 'border-red-300 focus:border-red-400' 
                                    : 'border-gray-200 focus:border-orange-400 hover:border-orange-300'
                                }`}
                              />
                              {errors.companyEmail && (
                                <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                                  <span>⚠️</span> {errors.companyEmail}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </form>
                    </CardContent>

                    <CardFooter className={"px-6 pb-6 border-t"}>
                      <Button 
                        onClick={handleNextStep}
                        className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <span className="flex items-center gap-2">
                          Continuar al Administrador
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </Button>
                    </CardFooter>
                  </>
                )}

                {/* Step 2: Admin Data */}
                {currentStep === 2 && (
                  <>
                    <CardHeader className="text-center">
                      <CardTitle className="text-2xl text-gray-800 mb-2 flex items-center justify-center gap-2">
                        <User className="w-6 h-6 text-orange-500" />
                        Administrador Principal
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        Crea el perfil del administrador que gestionará el sistema
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      <form onSubmit={() => {}} className="space-y-6">
                        {/* Personal Info */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-orange-600 font-semibold">
                            <User className="w-5 h-5" />
                            <span>Información Personal</span>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="firstName" className="text-gray-700 font-medium">Nombre *</Label>
                              <Input
                                id="firstName"
                                placeholder="Tu nombre"
                                value={adminData.firstName}
                                onChange={(e) => handleAdminChange('firstName', e.target.value)}
                                className={`mt-1 border-2 transition-all duration-200 ${
                                  errors.firstName 
                                    ? 'border-red-300 focus:border-red-400' 
                                    : 'border-gray-200 focus:border-orange-400 hover:border-orange-300'
                                }`}
                              />
                              {errors.firstName && (
                                <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                                  <span>⚠️</span> {errors.firstName}
                                </p>
                              )}
                            </div>

                            <div>
                              <Label htmlFor="lastName" className="text-gray-700 font-medium">Apellido *</Label>
                              <Input
                                id="lastName"
                                placeholder="Tu apellido"
                                value={adminData.lastName}
                                onChange={(e) => handleAdminChange('lastName', e.target.value)}
                                className={`mt-1 border-2 transition-all duration-200 ${
                                  errors.lastName 
                                    ? 'border-red-300 focus:border-red-400' 
                                    : 'border-gray-200 focus:border-orange-400 hover:border-orange-300'
                                }`}
                              />
                              {errors.lastName && (
                                <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                                  <span>⚠️</span> {errors.lastName}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-orange-600 font-semibold">
                            <Mail className="w-5 h-5" />
                            <span>Información de Contacto</span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="email" className="text-gray-700 font-medium">Email Personal *</Label>
                              <Input
                                id="email"
                                type="email"
                                placeholder="tu@email.com"
                                value={adminData.email}
                                onChange={(e) => handleAdminChange('email', e.target.value)}
                                className={`mt-1 border-2 transition-all duration-200 ${
                                  errors.email 
                                    ? 'border-red-300 focus:border-red-400' 
                                    : 'border-gray-200 focus:border-orange-400 hover:border-orange-300'
                                }`}
                              />
                              {errors.email && (
                                <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                                  <span>⚠️</span> {errors.email}
                                </p>
                              )}
                            </div>

                            <div>
                              <Label htmlFor="phone" className="text-gray-700 font-medium">Teléfono *</Label>
                              <Input
                                id="phone"
                                placeholder="809-555-5555"
                                value={adminData.phone}
                                onChange={(e) => handleAdminChange('phone', e.target.value)}
                                className={`mt-1 border-2 transition-all duration-200 ${
                                  errors.phone 
                                    ? 'border-red-300 focus:border-red-400' 
                                    : 'border-gray-200 focus:border-orange-400 hover:border-orange-300'
                                }`}
                              />
                              {errors.phone && (
                                <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                                  <span>⚠️</span> {errors.phone}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Security */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-orange-600 font-semibold">
                            <Shield className="w-5 h-5" />
                            <span>Seguridad</span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="password" className="text-gray-700 font-medium">Contraseña *</Label>
                              <div className="relative mt-1">
                                <Input
                                  id="password"
                                  type={showPassword ? 'text' : 'password'}
                                  placeholder="Tu contraseña segura"
                                  value={adminData.password}
                                  onChange={(e) => handleAdminChange('password', e.target.value)}
                                  className={`border-2 pr-10 transition-all duration-200 ${
                                    errors.password 
                                      ? 'border-red-300 focus:border-red-400' 
                                      : 'border-gray-200 focus:border-orange-400 hover:border-orange-300'
                                  }`}
                                />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                  onClick={() => setShowPassword(!showPassword)}
                                >
                                  {showPassword ? (
                                    <EyeOff className="h-4 w-4 text-gray-400" />
                                  ) : (
                                    <Eye className="h-4 w-4 text-gray-400" />
                                  )}
                                </Button>
                              </div>
                              {errors.password && (
                                <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                                  <span>⚠️</span> {errors.password}
                                </p>
                              )}
                            </div>

                            <div>
                              <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">Confirmar Contraseña *</Label>
                              <div className="relative mt-1">
                                <Input
                                  id="confirmPassword"
                                  type={showConfirmPassword ? 'text' : 'password'}
                                  placeholder="Confirma tu contraseña"
                                  value={adminData.confirmPassword}
                                  onChange={(e) => handleAdminChange('confirmPassword', e.target.value)}
                                  className={`border-2 pr-10 transition-all duration-200 ${
                                    errors.confirmPassword 
                                      ? 'border-red-300 focus:border-red-400' 
                                      : 'border-gray-200 focus:border-orange-400 hover:border-orange-300'
                                  }`}
                                />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                  {showConfirmPassword ? (
                                    <EyeOff className="h-4 w-4 text-gray-400" />
                                  ) : (
                                    <Eye className="h-4 w-4 text-gray-400" />
                                  )}
                                </Button>
                              </div>
                              {errors.confirmPassword && (
                                <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                                  <span>⚠️</span> {errors.confirmPassword}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Role display */}
                          
                          <div>
                            <Label className="text-gray-700 font-medium">Rol</Label>
                            <div className="mt-1 p-3 bg-orange-100 border-2 border-orange-200 rounded-lg">
                              <Badge className="bg-orange-500 text-white">
                                <Info className="w-5 h-5" />
                                Administrador Principal
                              </Badge>
                              {/* <p className="text-sm text-gray-600 mt-1">
                                Tendrás acceso completo al sistema y podrás crear otros usuarios
                              </p> */}
                            </div>
                          </div>
                        </div>
                      </form>
                    </CardContent>

                    <CardFooter className="px-6 pb-1 border-t space-y-4">
                      <div className="w-full flex gap-4">
                        <Button
                          variant="outline"
                          onClick={handlePreviousStep}
                          className="flex-1 border-2 border-gray-300 text-gray-700 hover:bg-gray-50"
                        >
                          <ArrowLeft className="w-4 h-4 mr-2" />
                          Anterior
                        </Button>

                        <Button 
                          type="submit"
                          onClick={() => {}}
                          disabled={isLoading}
                          className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                        >
                          {isLoading ? (
                            <span className="flex items-center gap-2">
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              Creando cuenta...
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              🚀 Crear Cuenta Empresarial
                            </span>
                          )}
                        </Button>
                      </div>
                
                    </CardFooter>
                      <div className="text-center text-sm text-gray-600 w-full px-6 pb-4">
                        <p className="flex items-center justify-center gap-2">
                          <Shield className="w-4 h-4 text-green-500" />
                          Al crear una cuenta, aceptas nuestros{' '}
                          <Button variant="link" className="p-0 h-auto text-orange-600 hover:text-orange-700">
                            términos y condiciones
                          </Button>
                        </p>
                      </div>
                  </>
                )}
              </Card>
            </div>
          </div>


          </div>
        </div>
      </div>
  );
}
