"use client"

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";

export type Tenant = {
    id: number,
    name: string,
    cpf: string,
    size: string,
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
        accessorKey: "size",
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
        accessorKey: "actions",
        header: "Acoes",
        cell: () => {
        
            return <div className={`font-medium `}><Button>editar</Button> <Button>excluir</Button></div>;
          }
    },
    
];
