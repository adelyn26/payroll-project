import React from "react";
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
import { Check } from "lucide-react";
import { Button } from "../components/Button.jsx";

export default function PricingPlans() {
  const navigate = useNavigate();

  return (
    
      <div className="min-h-screen bg-white flex flex-col bg-background ">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">
            Elige el Plan Perfecto para Ti
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Descubre nuestros planes diseñados para adaptarse a las necesidades
            de tu negocio. Desde startups hasta empresas, tenemos la solución
            perfecta.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {Plans.map((plan, index) => (
            <Card
              key={plan.id}
              className={`relative ${
                index === 1 ? "border-primary scale-105" : ""
              }`}
            >
              {index === 1 && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white">
                  Más Popular
                </Badge>
              )}
              <CardHeader className="text-center">
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>
                  <span className="text-3xl font-bold text-foreground">
                    ${plan.price}
                  </span>
                  <span className="text-muted-foreground">/mes</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={index === 1 ? "default" : "outline"}
                  onClick={() => navigate("/registration")}
                >
                  Seleccionar Plan
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            Todos los planes incluyen prueba gratuita de 14 días • Cancela en
            cualquier momento
          </p>
          <div className="pt-6 border-t border-border/40">
            <p className="text-sm text-muted-foreground mb-3">
              ¿Ya tienes una cuenta?
            </p>
            <Button
              variant="outline"
              onClick={() => navigate("/login")}
              className="mx-auto"
            >
              Iniciar Sesión
            </Button>
          </div>
        </div>
      </div>
    </div>

  );
}
