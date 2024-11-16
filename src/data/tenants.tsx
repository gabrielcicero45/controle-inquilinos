"use client"

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useNavigate } from "react-router-dom";
import { removeTenant } from "@/services/api";

export type Tenant = {
    name: string,
    cpf: string,
    kitnetSize: string,
    isDelinquent: boolean,
    delinquencyTime: number,
    rentAmount: number,
}
export const columns: ColumnDef<Tenant>[] = [
    {
        accessorKey: "name",
        header: "Nome",
    },
    {
        accessorKey: "cpf",
        header: "CPF",
    },
    {
        accessorKey: "kitnetSize",
        header: "Tamanho",
    },
    {
        accessorKey: "isDelinquent",
        header: "Inadimplente",
        cell: ({ row }) => {
            const isDelinquent = row.getValue("isDelinquent");
            const formatted = isDelinquent ? "Sim" : "Não";
            const textColor = isDelinquent ? "text-red-600" : "text-green-600";
        
            return <div className={`font-medium ${textColor}`}>{formatted}</div>;
          }
    },
    {
        accessorKey: "delinquencyTime",
        header: "Tempo de Atraso (meses)",
    },
    {
        accessorKey: "rentAmount",
        header: "Valor do Aluguel",
    },
    {
        id: "actions",
        cell: ({ row }) => {
          const tenantId = row.original._id;
          const navigate = useNavigate();
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={()=> navigate(`/tenant/edit/${tenantId}`)}>Editar Inquilino</DropdownMenuItem>
                <DropdownMenuItem onClick={()=> removeTenant(tenantId)}>Remover Inquilino</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
    
];
