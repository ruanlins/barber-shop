"use client"

import { SmartphoneIcon } from "lucide-react"
import { Button } from "./ui/button"
import { toast } from "sonner"

interface PhoneItemProps {
  phone: string
}

const handleCopyPhoneClick = (phone: string) => {
  navigator.clipboard.writeText(phone)
  toast.success("Telefone copiado com sucesso!")
}

export const PhoneItem = ({ phone }: PhoneItemProps) => {
  return (
    <div key={phone} className="flex justify-between">
      <div className="flex items-center gap-2">
        <SmartphoneIcon />
        <p className="gap-2 text-sm">{phone}</p>
      </div>
      <Button
        onClick={() => handleCopyPhoneClick(phone)}
        variant="outline"
        size="sm"
      >
        Copiar
      </Button>
    </div>
  )
}
