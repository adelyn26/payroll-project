import {
  Building2,
  User,
  CheckCircle,
} from "lucide-react"

export default function PlanCardContent({ plan, currentStep }) {
  return (
    <>
      <div className="space-y-2">
        <h4 className="font-semibold text-gray-800 text-sm mb-3">
          ✨ Lo que incluye:
        </h4>
        {plan.features.slice(0, 4).map((feature, index) => (
          <div key={index} className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-gray-700">{feature}</span>
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
              className={currentStep >= 1 ? "text-green-600" : "text-gray-500"}
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
                  currentStep >= 2 ? "text-orange-600" : "text-gray-400"
                }`}
              />
            </div>
            <span
              className={currentStep >= 2 ? "text-orange-600" : "text-gray-500"}
            >
              Administrador
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
