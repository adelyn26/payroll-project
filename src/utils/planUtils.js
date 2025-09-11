import { Users, Zap, Crown, User } from "lucide-react";

export const getPlanIcon = (planId) => {
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

export const getPlanColor = (planId) => {
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
