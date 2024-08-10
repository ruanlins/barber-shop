import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { MenuIcon } from "lucide-react"
import { Sheet, SheetTrigger } from "./ui/sheet"
import { SidebarSheets } from "./siderbar-sheets"

export const Header = () => {
  return (
    <Card>
      <CardContent className="flex flex-grow items-center justify-between p-5">
        <Image src="/FSW Logo.svg" alt="fsw logo" width={120} height={18} />

        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SidebarSheets />
        </Sheet>
      </CardContent>
    </Card>
  )
}
