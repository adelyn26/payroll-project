// import React, { useState } from "react";
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
import { ArrowLeft } from "lucide-react";
import { Badge } from "../components/Badge.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/Select.jsx";
import { Label } from "../components/Label.jsx";
import { useNavigate } from "react-router-dom";

export default function Registration() {
  const navigate = useNavigate();
  //   const [formData, setFormData] = useState({
  //     name: "",
  //     lastName: "",
  //     age: "",

  //     email: "",
  //     password: "",
  //     confirmPassword: "",
  //   });

  //   const [showPassword, setShowPassword] = useState(false);
  //   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  //   const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     setFormData({ ...formData, [name]: value });
  //   };

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     // Aquí puedes manejar el envío del formulario
  //     console.log(formData);
  //   };

  return (
    <div
      style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        height: "100vh",
        flex: "1 0 auto",
        justifyItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a Planes
          </Button>
          <Card>
            <CardHeader className={"text-center"}>
                <div className="flex items-center">
                      <img
                src={Logo}
                alt="Logo de Kübe"
                className="h-10 md:h-12 mb-2 w-auto"
              />
                </div>
            
              <CardTitle> Registro Administrativo</CardTitle>
              <CardDescription>
                Crea tu perfil para empezar a gestionar tus recursos humanos
              </CardDescription>
              <div className="mt-4">
                <Badge variant="secondary" className="text-sm">
                  Plan seleccionado: /mes
                </Badge>
              </div>
            </CardHeader>

            <CardContent>
              <form onSubmit={() => {}} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Input
                      id="firstName"
                      placeholder={"Nombre"}
                      //   value={}
                      //   onChange={(e) =>
                      //     handleInputChange("firstName", e.target.value)
                      //   }
                      className={""}
                    />
                  </div>
                  <div>
                    <Input
                      id="lastName"
                      placeholder={"Apellido"}
                      // value={formData.lastName}
                      // onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className={""}
                    />
                    {/* {errors.lastName && (
                    <p className="text-sm text-destructive mt-1">{errors.lastName}</p>
                  )} */}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Input
                      id="age"
                      placeholder={"Edad"}
                      //   value={}
                      //   onChange={(e) =>
                      //     handleInputChange("firstName", e.target.value)
                      //   }
                      className={""}
                    />
                  </div>
                  <div>
                    <Input
                      id="charge"
                      placeholder={"Cargo"}
                      // value={formData.lastName}
                      // onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className={""}
                    />
                    {/* {errors.lastName && (
                    <p className="text-sm text-destructive mt-1">{errors.lastName}</p>
                  )} */}
                  </div>
                </div>

                <div>
                  <Input id="email" placeholder={"Email"} />
                </div>
                <div>
                  <Input id="rol" placeholder={"Rol"} />
                </div>
                <div>
                  <Input id="password" placeholder={"Contraseña"} />
                </div>
                <div>
                  <Input
                    id="confirmPassword"
                    placeholder={"Repetir contraseña"}
                  />
                </div>
              </form>
            </CardContent>

            <CardFooter>
              <Button type="submit" className={"w-full"} onClick={() => {}}>
                Crear Cuenta
              </Button>

            </CardFooter>
             <p className="text-sm text-muted-foreground text-center mt-1">
                Al crear una cuenta, aceptas nuestros términos y condiciones
              </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
