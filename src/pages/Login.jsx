import React from "react";
import { Input } from "../components/Input";
import { Label } from "../components/Label";
import { Button } from "../components/Button";
import { Card, CardContent } from "../components/Card";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Shield,
  CheckCircle,
  Sparkles,
  LogIn,
  ArrowRight,
  Facebook,
  Instagram,
  Twitter,
  Globe,
} from "lucide-react";
import { Checkbox } from "../components/checkbox";
// import { useLoginForm } from "../hooks/useLoginForm";
import { useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex">
      {/* Left Panel - Welcome Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-orange-500 via-orange-600 to-red-500 relative overflow-hidden">
        {/* Geometric pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative z-10 flex flex-col justify-center px-12 py-16 text-white">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">
                ¡Bienvenido de vuelta!
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              ¡Hola de nuevo! 👋
            </h1>

            <p className="text-lg text-white/90 mb-8 leading-relaxed">
              Nos alegra verte otra vez. Accede a tu cuenta y continúa
              disfrutando de todas las increíbles características que tenemos
              preparadas para ti.
            </p>

            <div className="space-y-4 mb-12">
              <div className="flex items-center gap-3 text-white/90">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4" />
                </div>
                <span>Protección completa de tus datos personales</span>
              </div>

              <div className="flex items-center gap-3 text-white/90">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <span>Acceso instantáneo a todas tus funcionalidades</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-auto">
            <p className="text-white/80 text-sm mb-4">
              Síguenos en nuestras redes sociales
            </p>
            <div className="flex gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 p-2"
              >
                <Facebook className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 p-2"
              >
                <Instagram className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 p-2"
              >
                <Twitter className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 p-2"
              >
                <Globe className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 lg:px-16 py-12 relative">
        {/* Decorative background elements for mobile */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none lg:hidden">
          <div className="absolute top-20 right-10 w-32 h-32 bg-orange-200 rounded-full opacity-20 blur-xl"></div>
          <div className="absolute bottom-40 left-10 w-24 h-24 bg-orange-300 rounded-full opacity-15 blur-lg"></div>
        </div>

        {/* Back button */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="absolute top-8 left-8 text-orange-600 hover:text-orange-700 hover:bg-orange-50"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>

        <div className="w-full max-w-md mx-auto relative z-10">
          {/* Logo/Brand Section */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg"></div>
              <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg -ml-2 mt-2"></div>
              <div className="w-4 h-4 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg -ml-2 -mt-1"></div>
            </div>

            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 via-orange-500 to-red-500 bg-clip-text text-transparent mb-2">
              kube Dominicana
            </h2>

            <p className="text-gray-600 text-sm">
              Ingresa a tu cuenta para acceder al sistema
            </p>
          </div>

          {/* Login Form */}
          <Card className="border-2 border-orange-200 shadow-xl bg-white/95 backdrop-blur-sm">
            <CardContent className="pt-6">
              <form onSubmit={() => {}} className="space-y-5">
                <div>
                  <Label htmlFor="email" className="text-gray-700 font-medium">
                    Usuario o Email
                  </Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      //   value={formData.email}
                      //   onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`pl-10 border-2 transition-all duration-200 border-red-300 focus:border-red-400`}
                    />
                  </div>
                  {/* {errors.email && (
                    <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                      <span className="text-red-500">⚠️</span> {errors.email}
                    </p>
                  )} */}
                </div>

                <div>
                  <Label
                    htmlFor="password"
                    className="text-gray-700 font-medium"
                  >
                    Contraseña
                  </Label>
                  <div className="relative mt-1">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="password"
                      type={'password'}
                      //   type={showPassword ? 'text' : 'password'}
                      //   placeholder="Tu contraseña"
                      //   value={formData.password}
                      //   onChange={(e) => handleInputChange('password', e.target.value)}
                       className={`pl-10 border-2 transition-all duration-200 border-red-300 focus:border-red-400`}
                      //   className={`pl-10 pr-10 border-2 transition-all duration-200 ${
                      //     errors.password
                      //       ? 'border-red-300 focus:border-red-400'
                      //       : 'border-gray-200 focus:border-orange-400 hover:border-orange-300'
                      //   }`}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      //   onClick={() => setShowPassword(!showPassword)}
                    >
                      {/* {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )} */}
                    </Button>
                  </div>
                  {/* {errors.password && (
                    <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                      <span className="text-red-500">⚠️</span> {errors.password}
                    </p>
                  )} */}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      //   checked={rememberMe}
                      //   onCheckedChange={setRememberMe}
                    />
                    <Label
                      htmlFor="remember"
                      className="text-sm text-gray-600 cursor-pointer"
                    >
                      Recordarme
                    </Label>
                  </div>

                  <Button
                    variant="link"
                    className="p-0 h-auto text-orange-600 hover:text-orange-700"
                  >
                    ¿Olvidaste tu contraseña?
                  </Button>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                  //   onClick={handleSubmit}
                  //   disabled={isLoading}
                >
                  {/* {isLoading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Iniciando sesión...
                    </span>
                  ) : (
                  
                  )} */}
                    <span className="flex items-center gap-2">
                      <LogIn className="w-4 h-4" />
                      Login
                    </span>
                  
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Register Section */}
          <div className="text-center mt-6">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-orange-200 p-6 shadow-lg">
              <p className="text-gray-600 mb-3">¿No tienes una cuenta?</p>
              <Button
                variant="outline"
                onClick={() => navigate("/registration")}
                className="bg-white border-2 border-orange-300 text-orange-600 hover:bg-orange-50 hover:border-orange-400 font-semibold px-6 py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <span className="flex items-center gap-2">
                  ✨ Regístrate
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Button>
            </div>
          </div>

          {/* Security notice */}
          <div className="text-center mt-6">
            <div className="inline-flex items-center gap-2 text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded-full">
              <Shield className="w-3 h-3" />
              <span>
                Protegemos tu información con encriptación de grado empresarial
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
