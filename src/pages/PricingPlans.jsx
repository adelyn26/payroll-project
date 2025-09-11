import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "../components/Card.jsx";
import { useNavigate } from "react-router-dom";
import { Plans } from "../mocks/plans.js";
import { Badge } from "../components/Badge.jsx";
import {
  Check,
  Star,
  Users,
  Shield,
  Zap,
  Crown,
  ArrowRight,
} from "lucide-react";
import { Button } from "../components/Button.jsx";

export default function PricingPlans() {
  const navigate = useNavigate();

  const planIcons = [Users, Zap, Crown];
  const planColors = [
    "from-blue-50 to-indigo-50 border-blue-200",
    "from-orange-50 to-red-50 border-orange-300",
    "from-purple-50 to-pink-50 border-purple-200",
  ];

  return (
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full mb-6">
            {/* <Sparkles className="w-4 h-4" /> */}
            <span className="text-sm font-medium">
              ¡Planes especiales disponibles!
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-orange-600 via-orange-500 to-red-500 bg-clip-text text-transparent mb-6 leading-tight">
            Encuentra Tu Plan
            <br />
            <span className="text-gray-800">Perfecto</span>
          </h1>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            🚀 Potencia tu negocio con nuestras soluciones diseñadas
            especialmente para ti. Desde emprendedores hasta grandes empresas,
            tenemos el plan ideal para hacer crecer tu proyecto.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {Plans.map((plan, index) => {
            const IconComponent = planIcons[index];
            const isPopular = index === 1;

            return (
              <div
                key={plan.id}
                className={`relative ${isPopular ? "scale-105 z-10" : ""}`}
              >
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                    <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1 text-sm font-semibold shadow-lg">
                      {/* <Star className="w-3 h-3 mr-1" /> */}
                      ¡Más Popular!
                    </Badge>
                  </div>
                )}

                <Card
                  className={`relative h-full bg-gradient-to-br ${planColors[index]} backdrop-blur-sm border-2 hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden`}
                >
                  <div
                    className={`absolute top-0 left-0 w-full h-1 ${
                      isPopular
                        ? "bg-gradient-to-r from-orange-500 to-red-500"
                        : "bg-gradient-to-r from-gray-300 to-gray-400"
                    }`}
                  ></div>

                  <CardHeader className="text-center pb-2 relative">
                    <div
                      className={`w-16 h-16 mx-auto mb-4 rounded-2xl ${
                        isPopular
                          ? "bg-gradient-to-br from-orange-500 to-red-500"
                          : "bg-gradient-to-br from-gray-400 to-gray-500"
                      } flex items-center justify-center shadow-lg`}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>

                    <CardTitle className="text-2xl font-bold text-gray-800 mb-2">
                      {plan.name}
                    </CardTitle>

                    <CardDescription className="text-center">
                      <div className="flex items-baseline justify-center gap-1 mb-2">
                        <span className="text-sm text-gray-500">$</span>
                        <span
                          className={`text-4xl font-bold ${
                            isPopular ? "text-orange-600" : "text-gray-700"
                          }`}
                        >
                          {plan.price}
                        </span>
                        <span className="text-gray-500">/mes</span>
                      </div>
                      <div
                        className={`text-xs font-medium px-3 py-1 rounded-full inline-block ${
                          isPopular
                            ? "bg-orange-100 text-orange-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        Facturación mensual
                      </div>
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="px-6 py-4">
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-start gap-3 group"
                        >
                          <div
                            className={`w-5 h-5 rounded-full ${
                              isPopular ? "bg-orange-100" : "bg-gray-100"
                            } flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform`}
                          >
                            <Check
                              className={`w-3 h-3 ${
                                isPopular ? "text-orange-600" : "text-gray-600"
                              }`}
                            />
                          </div>
                          <span className="text-sm text-gray-700 font-medium">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>

                  <CardFooter className="px-6 pb-6">
                    <Button
                      className={`w-full group relative overflow-hidden ${
                        isPopular
                          ? "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl"
                          : "bg-white border-2 border-gray-200 text-gray-700 hover:border-orange-300 hover:bg-orange-50"
                      } transition-all duration-300 font-semibold py-3`}
                      onClick={() =>
                        // selectPlan(plan);
                        navigate("/registration", { state: { plan } })
                      }
                    >
                      <span className="flex items-center justify-center gap-2">
                        {/* {isPopular ? "🚀 " : ""} */}
                        Seleccionar Plan
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            );
          })}
        </div>

        <div className="text-center mb-12 justify-center gap-2 flex">
          <div className="inline-flex items-center gap-6 bg-white/80 backdrop-blur-sm px-8 py-4 rounded-2xl border border-orange-200 shadow-lg">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium text-gray-700">
                SSL Seguro
              </span>
            </div>
            <div className="w-px h-6 bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-orange-500" />
              <span className="text-sm font-medium text-gray-700">
                14 días gratis
              </span>
            </div>
            <div className="w-px h-6 bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium text-gray-700">
                Cancela cuando quieras
              </span>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-orange-200 p-8 max-w-md mx-auto shadow-lg">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>

            <h3 className="text-xl font-bold text-gray-800 mb-2">
              ¿Ya tienes una cuenta registrada?
            </h3>
            <p className="text-gray-600 mb-6">
              Accede a tu cuenta y sigue disfrutando de todos los beneficios
            </p>

            <Button
              variant="outline"
              onClick={() => navigate("/login")}
              className="bg-white border-2 border-orange-300 text-orange-600 hover:bg-orange-50 hover:border-orange-400 font-semibold px-8 py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <span className="flex items-center gap-2">
                Iniciar Sesión
                <ArrowRight className="w-4 h-4" />
              </span>
            </Button>
          </div>
        </div>
      </div>
  );
}
