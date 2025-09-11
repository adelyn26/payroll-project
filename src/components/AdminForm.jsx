import { Input } from "../components/Input"
import { Label } from "../components/Label";
import { Button } from "../components/Button";
import { User, Mail, Eye, EyeOff, Shield, Info } from "lucide-react";
import { Badge } from "../components/Badge";

export default function CompanyForm({
  handleSubmit,
  adminData,
  handleAdminChange,
  errors,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
}) {
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Info */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-orange-600 font-semibold">
          <User className="w-5 h-5" />
          <span>Información Personal</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName" className="text-gray-700 font-medium">
              Nombre *
            </Label>
            <Input
              id="firstName"
              placeholder="Tu nombre"
              value={adminData.firstName}
              onChange={(e) => handleAdminChange("firstName", e.target.value)}
              className={`mt-1 border-2 transition-all duration-200 ${
                errors.firstName
                  ? "border-red-300 focus:border-red-400"
                  : "border-gray-200 focus:border-orange-400 hover:border-orange-300"
              }`}
            />
            {errors.firstName && (
              <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                <span>⚠️</span> {errors.firstName}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="lastName" className="text-gray-700 font-medium">
              Apellido *
            </Label>
            <Input
              id="lastName"
              placeholder="Tu apellido"
              value={adminData.lastName}
              onChange={(e) => handleAdminChange("lastName", e.target.value)}
              className={`mt-1 border-2 transition-all duration-200 ${
                errors.lastName
                  ? "border-red-300 focus:border-red-400"
                  : "border-gray-200 focus:border-orange-400 hover:border-orange-300"
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
            <Label htmlFor="email" className="text-gray-700 font-medium">
              Email Personal *
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={adminData.email}
              onChange={(e) => handleAdminChange("email", e.target.value)}
              className={`mt-1 border-2 transition-all duration-200 ${
                errors.email
                  ? "border-red-300 focus:border-red-400"
                  : "border-gray-200 focus:border-orange-400 hover:border-orange-300"
              }`}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                <span>⚠️</span> {errors.email}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="phone" className="text-gray-700 font-medium">
              Teléfono *
            </Label>
            <Input
              id="phone"
              placeholder="809-555-5555"
              value={adminData.phone}
              onChange={(e) => handleAdminChange("phone", e.target.value)}
              className={`mt-1 border-2 transition-all duration-200 ${
                errors.phone
                  ? "border-red-300 focus:border-red-400"
                  : "border-gray-200 focus:border-orange-400 hover:border-orange-300"
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
            <Label htmlFor="password" className="text-gray-700 font-medium">
              Contraseña *
            </Label>
            <div className="relative mt-1">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Tu contraseña segura"
                value={adminData.password}
                onChange={(e) => handleAdminChange("password", e.target.value)}
                className={`border-2 pr-10 transition-all duration-200 ${
                  errors.password
                    ? "border-red-300 focus:border-red-400"
                    : "border-gray-200 focus:border-orange-400 hover:border-orange-300"
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
            <Label
              htmlFor="confirmPassword"
              className="text-gray-700 font-medium"
            >
              Confirmar Contraseña *
            </Label>
            <div className="relative mt-1">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirma tu contraseña"
                value={adminData.confirmPassword}
                onChange={(e) =>
                  handleAdminChange("confirmPassword", e.target.value)
                }
                className={`border-2 pr-10 transition-all duration-200 ${
                  errors.confirmPassword
                    ? "border-red-300 focus:border-red-400"
                    : "border-gray-200 focus:border-orange-400 hover:border-orange-300"
                }`}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {/* {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )} */}
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
          </div>
        </div>
      </div>
    </form>
  );
}
