import { DataTable } from "@/components/ui/data-table"
import { columns, Tenant } from "./data/tenants.tsx"
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button'
import { CustomPieChart } from "@/components/ui/pie-chart.tsx";

function getData() {

  return [
    {
      id: 1,
      name: "Carlos Silva",
      cpf: "12345678901",
      size: "pequeno",
      isDelinquent: true,
      delinquencyTime: 2,
      rentAmount: 500,
    },
    {
      id: 2,
      name: "Maria Oliveira",
      cpf: "09876543210",
      size: "médio",
      isDelinquent: false,
      delinquencyTime: 0,
      rentAmount: 700,
    },
    {
      id: 3,
      name: "João Santos",
      cpf: "11223344556",
      size: "grande",
      isDelinquent: true,
      delinquencyTime: 5,
      rentAmount: 1000,
    }
  ]
}

function App() {
  const [data, setData] = useState<Tenant[]>([]);
  const [delinquencyReport, setDelinquencyReport] = useState<{ tenants: Tenant[], percentage: number }>();

  const handleDelinquencyReport = () => {
    const delinquentTenants = data.filter(tenant => tenant.isDelinquent);
    const percentage = (delinquentTenants.length / data.length) * 100;
    setDelinquencyReport({
      percentage: percentage,
      tenants: delinquentTenants,
    });
  };
  useEffect(() => {
    setData(getData());
  }, []);


  if (!data) {
    return <div>Loading...</div>;
  }

  return (<div className="container mx-auto py-10">
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    <h1 className="text-center">Controle de Inquilinos</h1>
    <Button onClick={handleDelinquencyReport}>Ver Relatório de Inadimplência</Button>
    {delinquencyReport && (
      <CustomPieChart title={"Relatório de Inadimplência"} tenants={delinquencyReport.tenants} data={[{ label: "Inadimplentes", percentage: delinquencyReport.percentage, fill: "var(--color-inadimplentes)" }, { label: "Adimplentes", percentage: 100 - delinquencyReport.percentage, fill: "var(--color-adimplentes)" },]} />
    )}
    <DataTable columns={columns} data={data} />
  </div>);
}



export default App
