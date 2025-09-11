import { Building2, User } from "lucide-react";

export default function ProgressIndicator({ currentStep }) {
  return (
    <>
      <div className="flex items-center justify-center mt-6 space-x-4">
        <div className="flex items-center gap-2">
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
                ${
                  currentStep === 2 ? "bg-orange-400" : "bg-gray-300"
                } transition-all duration-300`}
        ></div>

        <div className="flex items-center gap-2">
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
    </>
  );
}
