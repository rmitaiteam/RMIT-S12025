import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PasswordInputProps {
  label: string;
}

const PasswordInput = ({ label }: PasswordInputProps) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const renderPasswordOverlay = () => {
    return password.split("").map((char, index) => {
      let color = "text-gray-400";
      if (index < confirmPassword.length) {
        color =
          char === confirmPassword[index] ? "text-green-500" : "text-red-500";
      }
      return (
        <span key={index} className={`${color} text-2xl`}>
          •
        </span>
      );
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2 relative">
        <Label htmlFor="password">{label}</Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-transparent relative z-10"
            style={{ color: "transparent" }}
          />
          <div
            className="absolute top-0 left-0 h-full w-full pointer-events-none flex items-center px-3 z-0"
            aria-hidden="true"
          >
            {renderPasswordOverlay()}
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirm-password">Re-enter Password</Label>
        <Input
          id="confirm-password"
          name="confirm-password"
          type="password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="text-2xl"
        />
      </div>
    </div>
  );
};

export default PasswordInput;
