import { Input } from "../components/Input";
import { Label } from "../components/Label";
import { FileText, Phone } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/Select";
import { Sectors, EmployeeCounts } from "../mocks/registrationData";

export default function CompanyForm({ companyData, updateCompany, errors }) {
  return (
    <form className="space-y-6">
      {/* Datos básicos */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-orange-600 font-semibold">
          <FileText className="w-5 h-5" />
          <span>Datos De La Empresa</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="companyName">Nombre de la Empresa *</Label>
            <Input
              id="companyName"
              placeholder="Ej: Mi Empresa S.A."
              value={companyData.companyName}
              onChange={(e) => updateCompany("companyName", e.target.value)}
              className={`mt-1 border-2 transition-all duration-200 ${
                errors.companyName
                  ? "border-red-300 focus:border-red-400"
                  : "border-gray-200 focus:border-orange-400 hover:border-orange-300"
              }`}
            />
            {errors.companyName && (
              <p className="text-sm text-red-500 gap-1">{errors.companyName}</p>
            )}
          </div>
          <div>
            <Label htmlFor="rnc">RNC/NIT *</Label>
            <Input
              id="rnc"
              placeholder="Ej: 123-45678-9"
              value={companyData.rnc}
              onChange={(e) => updateCompany("rnc", e.target.value)}
              className={`mt-1 border-2 transition-all duration-200 ${
                errors.companyName
                  ? "border-red-300 focus:border-red-400"
                  : "border-gray-200 focus:border-orange-400 hover:border-orange-300"
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
            <Label htmlFor="sector" className="text-gray-700 font-medium">
              Sector Empresarial *
            </Label>
            <Select onValueChange={(value) => updateCompany("sector", value)}>
              <SelectTrigger
                className={`mt-1 border-2 transition-all duration-200 ${
                  errors.sector
                    ? "border-red-300 focus:border-red-400"
                    : "border-gray-200 focus:border-orange-400 hover:border-orange-300"
                }`}
              >
                <SelectValue placeholder="🏭 Selecciona el sector" />
              </SelectTrigger>
              <SelectContent>
                {Sectors.map((sector) => (
                  <SelectItem
                    key={sector}
                    value={sector.toLowerCase().replace(/\s+/g, "_")}
                  >
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
            <Label
              htmlFor="employeeCount"
              className="text-gray-700 font-medium"
            >
              Cantidad de Empleados *
            </Label>
            <Select
              onValueChange={(value) => updateCompany("employeeCount", value)}
            >
              <SelectTrigger
                className={`mt-1 border-2 transition-all duration-200 ${
                  errors.employeeCount
                    ? "border-red-300 focus:border-red-400"
                    : "border-gray-200 focus:border-orange-400 hover:border-orange-300"
                }`}
              >
                <SelectValue placeholder="👥 Tamaño de empresa" />
              </SelectTrigger>
              <SelectContent>
                {EmployeeCounts.map((count) => (
                  <SelectItem
                    key={count}
                    value={count.toLowerCase().replace(/\s+/g, "_")}
                  >
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

      {/* Contacto */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-orange-600 font-semibold">
          <Phone className="w-5 h-5" />
          <span>Información de Contacto</span>
        </div>
        <div>
          <Label htmlFor="address" className="text-gray-700 font-medium">
            Dirección *
          </Label>
          <Input
            id="address"
            placeholder="Calle, Ciudad, País"
            value={companyData.address}
            onChange={(e) => updateCompany("address", e.target.value)}
            className={`mt-1 border-2 transition-all duration-200 ${
              errors.address
                ? "border-red-300 focus:border-red-400"
                : "border-gray-200 focus:border-orange-400 hover:border-orange-300"
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
            <Label htmlFor="companyPhone" className="text-gray-700 font-medium">
              Teléfono *
            </Label>
            <Input
              id="companyPhone"
              placeholder="809-555-5555"
              value={companyData.companyPhone}
              onChange={(e) =>
                updateCompany("companyPhone", e.target.value)
              }
              className={`mt-1 border-2 transition-all duration-200 ${
                errors.companyPhone
                  ? "border-red-300 focus:border-red-400"
                  : "border-gray-200 focus:border-orange-400 hover:border-orange-300"
              }`}
            />
            {errors.companyPhone && (
              <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                <span>⚠️</span> {errors.companyPhone}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="companyEmail" className="text-gray-700 font-medium">
              Email Corporativo *
            </Label>
            <Input
              id="companyEmail"
              type="email"
              placeholder="info@miempresa.com"
              value={companyData.companyEmail}
              onChange={(e) =>
                updateCompany("companyEmail", e.target.value)
              }
              className={`mt-1 border-2 transition-all duration-200 ${
                errors.companyEmail
                  ? "border-red-300 focus:border-red-400"
                  : "border-gray-200 focus:border-orange-400 hover:border-orange-300"
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
  );
}
