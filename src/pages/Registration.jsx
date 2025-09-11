import React from "react";
import { Button } from "../components/Button.jsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/Card";
import { ArrowLeft, ArrowRight, Building2, User, Shield } from "lucide-react";
import ProgressIndicator from "../components/ProgressIndicator.jsx";
import { Badge } from "../components/Badge.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import { getPlanIcon, getPlanColor } from "../utils/planUtils.js";
import { useRegistrationForm } from "../hooks/useRegistrationForm.js";
import CompanyForm from "../components/CompanyForm.jsx";
import AdminForm from "../components/AdminForm.jsx";
import PlanCardContent from "../components/PlanCardContent.jsx";

export default function Registration() {
  const navigate = useNavigate();
  const location = useLocation();
  const plan = location.state?.plan;

  const {
    currentStep,
    setCurrentStep,
    companyData,
    handleCompanyChange,
    adminData,
    handleAdminChange,
    errors,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    handleSubmit,
    validateCompanyData,
    isLoading,
    // setIsLoading,
  } = useRegistrationForm();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 relative overflow-hidden">
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-4xl mx-auto">
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
            <ProgressIndicator currentStep={currentStep} />
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
                    <PlanCardContent plan={plan} currentStep={currentStep} />
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
                      <CompanyForm
                        companyData={companyData}
                        updateCompany={handleCompanyChange}
                        errors={errors}
                      />
                    </CardContent>

                    <CardFooter className={"px-6 pb-6 border-t"}>
                      <Button
                        onClick={() => {
                          if (currentStep === 1 && validateCompanyData()) {
                            setCurrentStep(2);
                          }
                        }}
                        className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <span className="flex items-center gap-2">
                          Continuar
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
                        Crea el perfil del administrador que gestionará el
                        sistema
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      <AdminForm
                        handleSubmit={handleSubmit}
                        adminData={adminData}
                        handleAdminChange={handleAdminChange}
                        errors={errors}
                        showPassword={showPassword}
                        setShowPassword={setShowPassword}
                        showConfirmPassword={showConfirmPassword}
                        setShowConfirmPassword={setShowConfirmPassword}
                      />
                    </CardContent>

                    <CardFooter className="px-6 pb-1 border-t space-y-4">
                      <div className="w-full flex gap-4">
                        <Button
                          variant="outline"
                          onClick={() => setCurrentStep(1)}
                          className="flex-1 border-2 border-gray-300 text-gray-700 hover:bg-gray-50"
                        >
                          <ArrowLeft className="w-4 h-4 mr-2" />
                          Anterior
                        </Button>

                        <Button
                          type="submit"
                          onClick={handleSubmit}
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
                        Al crear una cuenta, aceptas nuestros{" "}
                        <Button
                          variant="link"
                          className="p-0 h-auto text-orange-600 hover:text-orange-700"
                        >
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
